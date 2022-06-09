import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { FileDrop } from "react-file-drop";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { Alert, Collapse, CircularProgress } from "@mui/material";
import Navbar from "../navbarMainComponent/Navbar";
import { headers } from "./headerData";
import "./styles.css";

const CSVUpload = () => {
  // AUTH LAYER
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [userName, setUserName] = useState("");

  // useEffect(() => {
  //   console.log(auth);
  //   if (auth === undefined || auth === {}) {
  //     navigate("/login");
  //   } else if (!auth.isLoggedIn) {
  //     navigate("/login");
  //   } else {
  //     // setUserName(user.signInUserSession.idToken.payload.name);
  //     setUserName(auth.user.attributes.name);
  //   }
  // }, [auth, navigate]);

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
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  };

  const handleFileUpload = async (e) => {
    const params = {
      Body: file,
      Bucket: S3_BUCKET,
      Key: `test/data/${file.name}`,
    };

    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({ region: REGION, credentials: credentials }),
        params: params,
        partSize: 1024 * 1024 * 5,
        leavePartsOnError: false,
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
    <div className="container">
      <Navbar />
      <Collapse sx={{ marginTop: "-7vh" }} in={uploadStatus}>
        <Alert
          onClose={() => {
            setUploadStatus(!uploadStatus);
          }}
          severity="success"
        >
          {file ? `File ${file.name} Uploaded Successfully` : null}
        </Alert>
      </Collapse>
      <h1 className="uploadHeading">Upload Employee Details</h1>
      <div className="">
        <form>
          <input
            type="file"
            className="inputFile"
            id="file1"
            accept=".csv"
            onChange={handleChange}
          />
        </form>
      </div>
      <label>or</label>
      <div className="dropArea">
        <FileDrop
          onDrop={(files) => {
            setFile(files[0]);
            setFileSize(files[0].size);
          }}
        >
          <label style={{ fontSize: 24 }}>
            {file ? file.name : "Drop CSV file here"}
          </label>
        </FileDrop>
      </div>
      <div className="buttonDiv">
        <button
          className="button"
          disabled={disabled}
          onClick={(e) => {
            !file ? alert("Please select a file to upload") : handleOnSubmit(e);
          }}
        >
          {loading ? <CircularProgress size={16} /> : "Upload"}
        </button>

        <CSVLink
          data={headers}
          filename={"Employee_Details_Format.csv"}
          style={{ textDecoration: "none" }}
        >
          <button className="Downloadbutton">Download Format</button>
        </CSVLink>
      </div>
    </div>
  );
};

export default CSVUpload;
