import { useEffect, useState } from "react";
import { read, utils } from "xlsx";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { Alert, Collapse } from "@mui/material";
import { Intent, NonIdealState } from "@blueprintjs/core";
import * as Papa from "papaparse";
import { useToastContext } from "../../../contexts/ToastContext";
import { initCSVUpload } from "../../../store/slices/csvUploadSlice.ts";
import { Dashlet } from "../../molecules/dashlets/dashlet";
import { TemplateDownloadButton } from "../../atoms/forms/TemplateDownloadButton";
import { CSVFileInput } from "../../atoms/forms/CSVFileInput";
import { VerifyAndUploadEmployees } from "../../../components/dashboard/employee/onboarding/verifyAndUploadEmployees";
import BrowserEdiTable from "./BrowserEdiTable";

export const MAX_SIZE = 1024 * 1024 * 5;

const mapOnboardPropsToState = (state) => {
  return {
    employerId: state.auth.user?.attributes.sub || "",
  };
};

function _CSVUploadDashlet({
  title,
  label,
  headers,
  fields,
  employerId,
  dispatch,
  preProcessing,
  onToastDismiss,
}) {
  const navigate = useNavigate();

  const { handleProgressToast, setConfig } = useToastContext();

  useEffect(() => {
    if (employerId === "") {
      navigate("/login");
    }
  }, [employerId, navigate]);

  // CSV FILE UPLOAD
  const [file, setFile] = useState({ object: null, validations: [] });
  const [fileSize, setFileSize] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
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
    const tableCSV = Papa.unparse(tableData);
    const csvFile = new Blob([tableCSV], { type: "text/csv" });
    const timestamp = new Date().getTime();

    const params = {
      Body: csvFile,
      Bucket: S3_BUCKET,
      Key: `${employerId}/${timestamp}_${file.object.name.replace(/\W/g, "_")}`,
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
        setFile({ object: null, validations: [] });
        setAlertMessage(
          `File ${file.object.name} has been added to the queue successfully`
        );
        handleProgressToast(file?.object?.name, 900000);
        setUploadStatus(true);
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
    if (file.object) {
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
  }, [file.object]);

  return (
    <>
      <Dashlet
        icon={"cloud-upload"}
        title={`${title} Details`}
        actions={
          <>
            <TemplateDownloadButton fileName={title} headers={headers} />
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
                  fileName={file.object.name}
                  disableButton={cloudUploadDisabled}
                  onClick={(e) => {
                    !file.object
                      ? alert("Please select a file to upload")
                      : uploadCSV(e);
                  }}
                />
              </>
            ) : (
              ""
            )}
          </>
        }
      >
        <Collapse in={uploadStatus}>
          <Alert
            onClose={() => {
              setUploadStatus(!uploadStatus);
            }}
            severity="success"
          >
            {alertMessage}
          </Alert>
        </Collapse>

        {file.object ? (
          <>
            <BrowserEdiTable
              setter={setDataGetter}
              tableName={file.object?.name}
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
