import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { Alert, Collapse } from "@mui/material";
import { Button, Card, Divider, Elevation, H3, Icon, Intent, NonIdealState } from "@blueprintjs/core";
import styles from "../styles/onboard.module.css";
import * as Papa from "papaparse";
import { CSVLink } from "react-csv";
import { headers } from "../headerData";
import { HEADER_GROUPS, transformHeadersToFields } from "./fields";
import { initCSVUpload } from "../../../../store/slices/csvUploadSlice.ts";
import BrowserEdiTable from "./BrowserEdiTable";

const CARD_STYLING = {
  marginLeft: "2.7em",
  marginRight: "2.7em"
};

const HEADER_CLASS = `${styles.column} ${styles.header}`;
const ACTIONS_CLASS = `${styles.column} ${styles.actions}`;
const MAX_SIZE = 1024 * 1024 * 5;

const mapOnboardPropsToState = (state) => {
  return {
    employerId: state.auth.user?.attributes.sub || ""
  };
};

function _Onboard(props) {
  const { employerId, dispatch } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (employerId === "") {
      navigate("/login");
    }
  }, [employerId, navigate]);

  // CSV FILE UPLOAD
  const [file, setFile] = useState({ object: null, validations: [] });
  const [fileSize, setFileSize] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
  const REGION = process.env.REACT_APP_S3_REGION;

  const credentials = {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
  };
  //Hacky
  const getter = {}
  const setDataGetter = (data) => {
    getter['data'] = data;
  }
  const handleFileUpload = async () => {
    const tableData = getter['data']();
    const tableCSV = Papa.unparse(tableData);
    const csvFile = new Blob([tableCSV], {type: 'text/csv'});
    const timestamp = new Date().getTime();

    console.log({timestamp, employerId, file})

    const params = {
      Body: csvFile,
      Bucket: S3_BUCKET,
      Key: `${employerId}/${timestamp}-${file.object.name}`
    };

    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({ region: REGION, credentials: credentials }),
        params,
        partSize: 1024 * 1024 * 5,
        leavePartsOnError: false
      });

      if (fileSize > MAX_SIZE) {
        alert("File is too large. Please upload the file in parts.");
      } else {
        await parallelUploads3.done();
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

  const handleFileError = (ctx) => {
    console.log({ handleFileError: ctx });
  };

  const handleFileImport = ({ data, errors, meta }) => {
    if (errors.length) {
      handleFileError({ data, errors, meta });
      return;
    }
    console.log("dispatched", dispatch);
    dispatch(
      initCSVUpload({
        data: transformHeadersToFields(data),
        fileName: file.object.name,
        fields: HEADER_GROUPS
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

  useEffect(() => {
    console.log("file effect triggered", file.object);
    if (file.object) {
      console.log("file is set");
      Papa.parse(file.object, {
        header: true,
        complete: handleFileImport,
        error: handleFileError
      });
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
              <Button icon="cloud-download">Download Template</Button>
            </CSVLink>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Button
              icon="add-to-folder"
              intent={Intent.PRIMARY}
              onClick={(e) => hiddenFileInput.current.click(e)}
            >
              Import Data
            </Button>

            <div style={{ display: "none" }}>
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                accept=".csv"
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
          {file.object
            ? `File ${file.object.name} Uploaded Successfully`
            : null}
        </Alert>
      </Collapse>

      {file.object ? (
        <>
          <BrowserEdiTable setter={setDataGetter} tableName={file.object?.name} />
          <Button
            disabled={disabled}
            onClick={(e) => {
              !file.object ? alert("Please select a file to upload") : uploadCSV(e);
            }}
            loading={loading}
          >
            Upload
          </Button>
        </>
      ) : (
        <NonIdealState
          icon={"folder-open"}
          title={"No File Open"}
          description={<>No CSV file has been selected, please import data using <strong>Import Data</strong> on top
            right.</>}
          layout={"horizontal"}
        />
      )}
    </Card>
  );
}

export const Onboard = connect(mapOnboardPropsToState)(_Onboard);
