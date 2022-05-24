import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { CSVLink } from "react-csv";
import AWS from "aws-sdk";
import { Alert, Collapse } from "@mui/material";
import Navbar from "../navbarMainContent/Navbar";
import { headers } from "./headerData";
import { FileDrop } from "react-file-drop";

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
  const [uploadStatus, setUploadStatus] = useState(false);

  const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
  const REGION = process.env.REACT_APP_S3_REGION;

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  });

  const targetBucket = new AWS.S3({
    params: {
      Bucket: S3_BUCKET,
    },
    region: REGION,
  });

  const handleFileUpload = (e) => {
    const params = {
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    targetBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        if (Math.round((evt.loaded / evt.total) * 100) === 100) {
          setUploadStatus(true);
        }
      })
      .send((err) => {
        if (err) alert("An error occurred while uploading the file. Please try uploading again.");
      });
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
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
          {file? `File ${file.name} Uploaded Successfully` : null}
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
        <FileDrop onDrop={(files) => setFile(files[0])}>
          <label style={{ fontSize: 24 }}>
            {file ? file.name : "Drop CSV file here"}
          </label>
        </FileDrop>
      </div>
      <div className="buttonDiv">
        <button
          className="button"
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          Upload
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
