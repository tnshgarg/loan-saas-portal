import { useEffect, useState } from "react";
import { read, utils } from "xlsx";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { Collapse, Intent, NonIdealState, Tag } from "@blueprintjs/core";
import * as Papa from "papaparse";
import { useToastContext } from "../../../contexts/ToastContext";
import { initCSVUpload } from "../../../store/slices/csvUploadSlice.ts";
import { Dashlet } from "../../molecules/dashlets/dashlet";
import { TemplateDownloadButton } from "../../atoms/forms/TemplateDownloadButton";
import { CSVFileInput } from "../../atoms/forms/CSVFileInput";
import { VerifyAndUploadEmployees } from "../../../components/dashboard/employee/onboarding/verifyAndUploadEmployees";
import BrowserEdiTable from "./BrowserEdiTable";
import { FS } from "../../../components/dashboard/employee/onboarding/validations";

export const MAX_SIZE = 1024 * 1024 * 5;

const mapOnboardPropsToState = (state, ownProps) => {
  const { module } = ownProps;
  console.log({ csvUploads: state.csvUploads[module] });
  const savedFileName = state?.csvUploads[module]
    ? Object.keys(state.csvUploads[module])[0]
    : "";
  return {
    employerId: state.auth.user?.attributes.sub || "",
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
}) {
  const navigate = useNavigate();
  templateDownloadProps = templateDownloadProps ?? {};
  const { handleProgressToast, setConfig } = useToastContext();

  useEffect(() => {
    if (employerId === "") {
      navigate("/login");
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

  const S3_BUCKET = `employer-${process.env.REACT_APP_STAGE}-raw`;
  const REGION = process.env.REACT_APP_S3_REGION;

  const credentials = {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  };

  //Hacky
  const getter = {};
  const setDataGetter = (data) => {
    getter["data"] = data;
  };

  const handleFileUpload = async () => {
    const tableData = getter["data"]();
    let erroredData = tableData.filter((row) => row.status[FS.ERROR] >= 1);

    const tableCSV = Papa.unparse(
      tableData.map((row) => {
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
            initCSVUpload({
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
      initCSVUpload({
        data: preProcessing(data),
        fileName: file.object.name,
        fields,
        module: module,
      })
    );
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
    }
  }, [file.object, onToastDismiss, savedFileName, setConfig]);

  return (
    <>
      <Dashlet
        icon={"cloud-upload"}
        title={title}
        actions={
          <>
            <TemplateDownloadButton
              fileName={title}
              templateData={templateData}
              {...templateDownloadProps}
            />
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <CSVFileInput
              icon="add-to-folder"
              intent={Intent.PRIMARY}
              onChange={handleChange}
            />
            {file.object ? (
              <>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <VerifyAndUploadEmployees
                  fileName={file?.object?.name}
                  module={module}
                  disableButton={cloudUploadDisabled}
                  onClick={(e) => {
                    !file.object
                      ? alert("Please select a file to upload")
                      : uploadCSV(e);
                  }}
                  buttonText={`Add ${title}`}
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
            <BrowserEdiTable
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
    </>
  );
}

export const CSVUploadDashlet = connect(mapOnboardPropsToState)(
  _CSVUploadDashlet
);
