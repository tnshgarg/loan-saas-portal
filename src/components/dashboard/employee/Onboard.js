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
  width: "50%"
};

const SUB_HEADING_STYLING = {
  marginTop: "1%",
  marginBottom: "2%"
};

const CSVUpload = () => {
  // AUTH LAYER
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    console.log(auth);
    if (auth === undefined || auth === {}) {
      navigate("/login");
    } else if (!auth.isLoggedIn) {
      navigate("/login");
    } else {
      // setUserName(user.signInUserSession.idToken.payload.name);
      setUserName(auth.user.attributes.name);
    }
  }, [auth, navigate]);

  // CSV FILE UPLOAD
  const [file, setFile] = useState();
  const [fileSize, setFileSize] = useState(0);
  const maxSize = 1024 * 1024 * 2; // 2MB
  const [uploadStatus, setUploadStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
  const REGION = process.env.REACT_APP_S3_REGION;

  const credentials = {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
  };

  const handleFileUpload = async (e) => {
    const params = {
      Body: file,
      Bucket: S3_BUCKET,
      Key: `test/data/${file.name}`
    };

    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({ region: REGION, credentials: credentials }),
        params: params,
        partSize: 1024 * 1024 * 5,
        leavePartsOnError: false
      });

      if (fileSize > maxSize) {
        throw new Error("FileTooLarge");
      } else {
        await parallelUploads3.done();
        setDisabled(false);
        setLoading(false);
        setUploadStatus(true);
      }
    } catch (err) {
      console.log(err);
      if (err.message === "FileTooLarge") {
        alert("File is too large. Please upload the file in parts.");
      } else {
        alert(
          "An error occurred while uploading the file. Please try uploading again."
        );
      }
      setDisabled(false);
      setLoading(false);
    }
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
          {file ? `File ${file.name} Uploaded Successfully` : null}
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
          !file ? alert("Please select a file to upload") : handleOnSubmit(e);
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
