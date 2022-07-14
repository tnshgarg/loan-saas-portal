import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { Alert, CircularProgress, Collapse } from "@mui/material";
import { Button, Card, Elevation, FileInput } from "@blueprintjs/core";
import { headers } from "./headerData";

const CARD_STYLING = {
  textAlign: "center",
  marginLeft: "auto",
  marginRight: "auto",
  width: "50%",
};

const SUB_HEADING_STYLING = {
  marginTop: "1%",
  marginBottom: "2%",
};

const CSVUpload = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

  useEffect(() => {
    console.log(auth);
    if (auth === undefined || auth === {} || !auth.isLoggedIn) {
      navigate("/login");
    }
  }, [auth, navigate]);

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
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  };

  const handleFileUpload = async (e) => {
    const timestamp = new Date().toISOString();

    const params = {
      Body: file.object,
      Bucket: S3_BUCKET,
      Key: `employers/${employerId}/${timestamp}/${file.object.name}`,
    };

    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({ region: REGION, credentials: credentials }),
        params: params,
        partSize: 1024 * 1024 * 5,
        leavePartsOnError: false
      });

      if (fileSize > maxSize) {
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
  const hiddenFileInput = React.useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    setFileSize(e.target.files[0].size);
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    setLoading(true);
    handleFileUpload(e);
  };

  return (
    <Card style={CARD_STYLING} interactive={true} elevation={Elevation.THREE}>
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
      <h3>Upload Employee Details</h3>
      <br />
      <CSVLink data={headers} filename={"Employee_Details_Format.csv"}>
        <Button>Download Format</Button>
      </CSVLink>

      <br />
      <br />

      <h5 style={SUB_HEADING_STYLING}>Choose Employee Details CSV</h5>
      <FileInput text="Choose file..." onInputChange={handleChange} />

      <br />
      <br />

      <Button
        disabled={disabled}
        onClick={(e) => {
          !file.object
            ? alert("Please select a file to upload")
            : handleOnSubmit(e);
        }}
      >
        {loading ? <CircularProgress size={16} /> : "Upload"}
      </Button>
    </Card>
  );
};

const Onboard = () => {
  return <CSVUpload />;
};

export default Onboard;
