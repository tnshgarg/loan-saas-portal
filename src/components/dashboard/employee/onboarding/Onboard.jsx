import { useEffect, useRef, useState } from "react";
import { read, utils } from "xlsx";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { Alert, Collapse } from "@mui/material";
import {
  Button,
  Card,
  Divider,
  Elevation,
  H3,
  Icon,
  Intent,
  NonIdealState,
} from "@blueprintjs/core";
import styles from "../styles/onboard.module.css";
import * as Papa from "papaparse";
import { CSVLink } from "react-csv";
import { headers } from "../headerData";
import { HEADER_GROUPS, transformHeadersToFields } from "./fields";
import { initCSVUpload } from "../../../../store/slices/csvUploadSlice.ts";
import BrowserEdiTable from "./BrowserEdiTable";
import { allEmployeesBasicDetails } from "../../../../store/slices/apiSlices/employees/employeesApiSlice";
import { useToastContext } from "../../../../contexts/ToastContext";

const CARD_STYLING = {
  marginLeft: "2.7em",
  marginRight: "2.7em",
};

const HEADER_CLASS = `${styles.column} ${styles.header}`;
const ACTIONS_CLASS = `${styles.column} ${styles.actions}`;
const MAX_SIZE = 1024 * 1024 * 5;

const mapOnboardPropsToState = (state) => {
  return {
    employerId: state.auth.user?.attributes.sub || "",
  };
};

function _Onboard(props) {
  const { employerId, dispatch } = props;
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
  const [disabled, setDisabled] = useState(false);

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

    console.log({ timestamp, employerId, file });
    const params = {
      Body: csvFile,
      Bucket: S3_BUCKET,
      Key: `${employerId}/${timestamp}_${file.object.name.replace(
        "/W/g",
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
      setDisabled(false);
      setLoading(false);
    }
  };

  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);

  const handleFileImport = (data) => {
    console.log("dispatched", dispatch, data, "data");
    dispatch(
      initCSVUpload({
        data: transformHeadersToFields(data),
        fileName: file.object.name,
        fields: HEADER_GROUPS,
      })
    );
  };

  const handleChange = (e) => {
    const [file] = e.target.files;
    setFileSize(file.size);
    setFile({ object: file, validations: [] });
  };

  const uploadCSV = (e) => {
    e.preventDefault();
    setDisabled(true);
    setLoading(true);
    handleFileUpload(e);
  };

  const onToastDismiss = () => {
    dispatch(
      allEmployeesBasicDetails.util.invalidateTags(["AllEmployeesBasicDetails"])
    );
  };

  useEffect(() => {
    console.log("file effect triggered", file.object);
    if (file.object) {
      console.log("file is set");
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result, {
          type: 'string',
          raw: true
        });
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          console.log(rows);
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
    <Card style={CARD_STYLING} elevation={Elevation.THREE}>
      <div className={styles.row}>
        <div className={HEADER_CLASS}>
          <H3>
            {" "}
            <Icon icon={"cloud-upload"} size={"1em"} /> Upload Employee Details
          </H3>
        </div>
        <div className={ACTIONS_CLASS}>
          <div className={styles.alignRight}>
            <CSVLink
              data={headers}
              filename={`Employee_Details_Template_${new Date()
                .toISOString()
                .replaceAll(/-|\./g, "_")}.csv`}
            >
              <Button icon="cloud-download">Download Template File</Button>
            </CSVLink>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Button
              icon="add-to-folder"
              intent={Intent.PRIMARY}
              onClick={(e) => hiddenFileInput.current.click(e)}
            >
              Upload File
            </Button>

            <div style={{ display: "none" }}>
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
            </div>
          </div>
        </div>
      </div>
      <Divider />
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
          <Button
            disabled={disabled}
            onClick={(e) => {
              !file.object
                ? alert("Please select a file to upload")
                : uploadCSV(e);
            }}
            loading={loading}
          >
            Upload
          </Button>
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
    </Card>
  );
}

export const Onboard = connect(mapOnboardPropsToState)(_Onboard);
