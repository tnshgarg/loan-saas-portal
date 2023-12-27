import React from "react";
import FieldItem from "./FieldItem";

const EmploymentDetails = ({ fields, bodyData }) => {
  const fieldsArray = Object.entries(fields);
  console.log("EmploymentDetails", fields, bodyData);
  // Check if bodyData is defined before parsing
  const parsedData = bodyData ? JSON.parse(bodyData) : {};

  return (
    <div className="grid grid-cols-3">
      {fieldsArray.map((field, index) => (
        <FieldItem
          key={index}
          label={field[1]}
          value={parsedData[0][field[0]]}
        />
      ))}
    </div>
  );
};

export default EmploymentDetails;
