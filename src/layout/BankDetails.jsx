import React from "react";
import FieldItem from "./FieldItem";

const BankDetails = ({ fields, bodyData }) => {
  if (!bodyData) {
    // Handle the case where bodyData is undefined
    return <div>No data available</div>;
  }

  const fieldsArray = Object.entries(fields);

  return (
    <div className="grid grid-cols-3">
      {fieldsArray.map((field, index) => (
        <FieldItem
          key={index}
          label={field[1]}
          value={bodyData[field[0]] || "N/A"}
        />
      ))}
    </div>
  );
};

export default BankDetails;
