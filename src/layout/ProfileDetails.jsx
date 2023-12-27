import React from "react";
import FieldItem from "./FieldItem";

const ProfileDetails = ({ fields, bodyData }) => {
  const fieldsArray = Object.entries(fields);

  // Check if bodyData is defined before parsing
  const parsedData = bodyData ? JSON.parse(bodyData) : {};

  return (
    <div className="grid grid-cols-3">
      {fieldsArray.map((field, index) => (
        <FieldItem
          key={index}
          label={field[1]}
          value={parsedData?.[0]?.[field[0]]}
        />
      ))}
    </div>
  );
};

export default ProfileDetails;
