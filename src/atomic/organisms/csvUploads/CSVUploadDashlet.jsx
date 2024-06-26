import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Collapse, Intent, NonIdealState, Tag } from "@blueprintjs/core";
import * as Papa from "papaparse";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { read, utils } from "xlsx";
import { FS } from "../../../components/dashboard/employee/onboarding/validations";
import { VerifyAndUploadEmployees } from "../../../components/dashboard/employee/onboarding/verifyAndUploadEmployees";
import DateDropdown from "../../../components/dashboard/payouts/info/DateDropdown";
import { useToastContext } from "../../../contexts/ToastContext";
import {
  clearActiveFileName,
  initBrowserTable,
  setActiveFileName,
} from "../../../store/slices/browserTableSlice.ts";
import { CSVFileInput } from "../../atoms/forms/CSVFileInput";
import { TemplateDownloadButton } from "../../atoms/forms/TemplateDownloadButton";
import { Spacer } from "../../atoms/layouts/alignment";
import { Dashlet } from "../../molecules/dashlets/dashlet";
import BrowserTable from "../browserTable";
import { UploadHistoryPanel } from "./UploadHistoryPanel";

export const MAX_SIZE = 1024 * 1024 * 5;

const mapOnboardPropsToState = (state, ownProps) => {
  const { module } = ownProps;
  console.log({
    csvUploads: state?.["csvUploads"]?.[module]?.["activeFileName"],
  });
  const savedFileName =
    state?.["csvUploads"]?.[module]?.["activeFileName"] ?? "";
  return {
    employerId: state.auth.user?.attributes.sub || "",
    isReadOnly:
      state.auth.user?.attributes["custom:read_only"] === "true" || false,
    savedFileName,
  };
};

function _CSVUploadDashlet({
  title,
  templateData,
  templateDownloadProps,
  fields,
  employerId,
  dispatch,
  preProcessing,
  onToastDismiss,
  module,
  savedFileName,
  dateDropDown,
  isReadOnly,
}) {
  const navigate = useNavigate();
  templateDownloadProps = templateDownloadProps ?? {};
  const { handleProgressToast, setConfig } = useToastContext();

  useEffect(() => {
    if (employerId === "") {
      navigate("auth/login", { replace: true });
    }
  }, [employerId, navigate]);

  // CSV FILE UPLOAD
  const [file, setFile] = useState({ object: null, validations: [] });
  const [fileSize, setFileSize] = useState(0);
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    intent: "SUCCESS",
    icon: "tick",
  });
  const [uploadStatus, setUploadStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cloudUploadDisabled, setCloudUploadDisabled] = useState(false);

  const S3_BUCKET = `${process.env.REACT_APP_STAGE}-unipe-employer-raw`;
  const REGION = process.env.REACT_APP_S3_REGION;

  const credentials = {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  };

  const [csvUploadButtonIntent, setCsvUploadButtonIntent] = useState(
    Intent.PRIMARY
  );

  //Hacky
  const getter = {};
  const setDataGetter = (data) => {
    getter["data"] = data;
  };

  const setActiveCSVName = (fileName) => {
    dispatch(setActiveFileName({ fileName, module }));
  };
  const clearActiveCSVName = () => {
    dispatch(clearActiveFileName({ module }));
  };

  const handleFileUpload = async () => {
    const tableData = getter["data"]();
    let erroredData = tableData.filter((row) => row.status[FS.ERROR] >= 1);

    const tableCSV = Papa.unparse(
      tableData
        .filter((row) => !row.status[FS.DELETED])
        .map((row) => {
          let csvRow = Object.assign({}, row);
          delete csvRow.status;
          delete csvRow.rowNumber;
          return csvRow;
        })
    );
    console.log({ tableCSV });
    const csvFile = new Blob([tableCSV], { type: "text/csv" });
    const timestamp = new Date().getTime();

    const params = {
      Body: csvFile,
      Bucket: S3_BUCKET,
      Key: `${employerId}/${module}/${timestamp}_${file.object.name.replace(
        /\W/g,
        "_"
      )}`,
    };

    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({ region: REGION, credentials: credentials }),
        params,
        partSize: 1024 * 1024 * 5,
        leavePartsOnError: false,
      });

      if (fileSize > MAX_SIZE) {
        alert("File is too large. Please upload the file in parts.");
      } else {
        await parallelUploads3.done();
        if (erroredData.length) {
          setAlertMessage({
            message: `File ${file.object.name} has been added to the queue successfully but please fix the following errors`,
            intent: "SUCCESS",
            icon: "tick",
          });
          setUploadStatus(true);
          dispatch(
            initBrowserTable({
              data: erroredData,
              fileName: file.object.name,
              fields,
              module,
            })
          );
        } else {
          setUploadStatus(true);
          setFile({ object: null, validations: [] });
        }
        setAlertMessage({
          message: `File ${file.object.name} has been added to the queue successfully`,
          intent: "SUCCESS",
          icon: "tick",
        });
        clearActiveCSVName(file.object.name);
        setUploadStatus(true);
        handleProgressToast(file?.object?.name, 900000);
      }
    } catch (err) {
      console.log(err);
      alert(
        "An error occurred while uploading the file. Please try uploading again."
      );
    } finally {
      setCloudUploadDisabled(false);
      setLoading(false);
    }
  };

  const handleFileImport = (data) => {
    dispatch(
      initBrowserTable({
        data: preProcessing(data),
        fileName: file.object.name,
        fields,
        module: module,
      })
    );
    setActiveCSVName(file.object.name);
  };

  const handleChange = (e) => {
    const [file] = e.target.files;
    setFileSize(file.size);
    setFile({ object: file, validations: [] });
  };

  const uploadCSV = (e) => {
    setCloudUploadDisabled(true);
    setLoading(true);
    handleFileUpload(e);
  };

  useEffect(() => {
    if (savedFileName) {
      setFile({ object: { name: savedFileName }, validations: [] });
    }
  }, [savedFileName]);

  useEffect(() => {
    if (file?.object?.name && file?.object?.size) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result, {
          type: "string",
          raw: true,
        });
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          handleFileImport(rows);
        }
      };
      reader.readAsArrayBuffer(file.object);
      setConfig((prevState) => ({
        ...prevState,
        onDismiss: onToastDismiss,
      }));
      setCsvUploadButtonIntent(Intent.NONE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file.object, onToastDismiss, savedFileName, setConfig]);

  return (
    <>
      <Dashlet
        icon={"cloud-upload"}
        title={title}
        actions={
          <>
            {dateDropDown?.exists && (
              <>
                <DateDropdown onChange={dateDropDown.onChange} />
                <Spacer />
              </>
            )}

            <TemplateDownloadButton
              fileName={title}
              templateData={templateData}
              {...templateDownloadProps}
            />
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <CSVFileInput
              icon="add-to-folder"
              intent={csvUploadButtonIntent}
              onChange={handleChange}
              isReadOnly={isReadOnly}
            />
            {file.object ? (
              <>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <VerifyAndUploadEmployees
                  fileName={file?.object?.name}
                  module={module}
                  disableButton={cloudUploadDisabled}
                  loading={loading}
                  onClick={(e) => {
                    !file.object
                      ? alert("Please select a file to upload")
                      : uploadCSV(e);
                  }}
                  buttonText={`Add ${title}`}
                  tableName={file?.object?.name}
                />
              </>
            ) : (
              ""
            )}
          </>
        }
      >
        <Collapse isOpen={uploadStatus}>
          <Tag
            removeable
            minimal
            fill
            icon={alertMessage?.icon ?? "endorsed"}
            onRemove={() => {
              setUploadStatus(!uploadStatus);
            }}
            intent={Intent[alertMessage?.intent ?? "SUCCESS"]}
          >
            {alertMessage?.message}
          </Tag>
        </Collapse>

        {file.object || savedFileName ? (
          <>
            <BrowserTable
              key={savedFileName ?? file.object.name}
              setter={setDataGetter}
              deletes={true}
              tableName={file?.object?.name}
              module={module}
            />
          </>
        ) : !uploadStatus ? (
          <NonIdealState
            icon={"folder-open"}
            title={"No File Open"}
            description={
              <>
                No CSV file has been selected, please import data using{" "}
                <strong>Upload File</strong> on top right.
              </>
            }
            layout={"horizontal"}
          />
        ) : (
          ""
        )}
      </Dashlet>
      <UploadHistoryPanel employerId={employerId} module={module} />
    </>
  );
}

export const CSVUploadDashlet = connect(mapOnboardPropsToState)(
  _CSVUploadDashlet
);
