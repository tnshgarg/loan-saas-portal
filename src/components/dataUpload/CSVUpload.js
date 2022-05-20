import React, { useState } from "react";
import "./styles.css";
import { CSVLink } from "react-csv";
import AWS from "aws-sdk";

const CSVUpload = () => {
  const [file, setFile] = useState();

  const headers = [
    [
      "Employee ID",
      "Name",
      "Mobile Number",
      "Email",
      "Gender (M/F/T)",
      "Nationality",
      "Date of Joining  (dd/mm/yyyy)",
      "Aadhar Number",
      "PAN Card Number",
      "Beneficiary Name",
      "Bank Account Number",
      "Bank IFSC Code",
      "Date of Birth  (dd/mm/yyyy)",
      "Location  (State)",
      "Location  (District)",
      "Business Unit (BU) (Leave Blank if not applicable)",
      "Job Title",
      "Annual CTC",
      "Provident Fund (PF) ?  (Y/N)",
      "PF UAN (Enter if available or else leave blank)",
      "ESIC Number (Enter if available or else leave blank)",
      "Taxable salary paid in current F.Y. till now (Optional)",
      "Exemptions in current F.Y. till now (Optional)",
      "TDS deducted in current F.Y. till now (Optional)",
      "Employer Establishment Code (Username for ESIC Login)",
      "ESIC Number (aka IP Number) already registered (Yes/No)",
      "ESIC Number (aka IP Number) - (Incase of new employee generation leave it blank)",
      "Father's Name / Husband Name",
      "Relation with Employee",
      "Marital Status (Married,Un-married,Widow/Widower,Divorcee)",
      "Present Address",
      "District",
      "State",
      "Pincode",
      "Permanent Address",
      "District",
      "State",
      "Pincode",
      "Name of Family Member",
      "Date of birth of Family Member",
      "Relationship with Employee of the Family Member",
      "Employer Code Number",
      "Name of Employer",
      "Address of Employer",
      "State",
      "District",
      "Pin Code",
      "Employer Email ID",
      "Employer Phone Number",
      "Employer Mobile Number",
      "Name of Nominee (As per Aadhar card name of the nominee)",
      "Relationship with Insured Person",
      "Address of Nominee",
      "State of Nominee",
      "District of Nominee",
      "Pincode of Nominee",
      "Is Nominee a Family Member",
      "Mobile Number of Nominee",
      "Aadhar Number of Nominee",
    ],
  ];

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="">
      <div>
        <h1>Upload Employee Details</h1>
      </div>
      <div className="mb-3 w-96 ">
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
      {/* <label className="mb-2">Or</label> */}
      {/* <div>
        <FileUploader
            handleChange={(file) => {
                setFile(file);
            }}
            classes="h-12"
            label="Upload a file"
            name="file"
            type={["csv"]}
            maxSize={1}
        />
    </div> */}
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
          filename={"Employee Details Format.csv"}
          style={{ textDecoration: "none" }}
        >
          <button type="button" className=" button">
            Download Format
          </button>
        </CSVLink>
      </div>
    </div>
  );
};

export default CSVUpload;
