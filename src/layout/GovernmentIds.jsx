import React from "react";
import FieldItem from "./FieldItem";

const GovernmentIds = ({ fields, bodyData }) => {
  return (
    <div>
      {fields.map((field, index) => (
        <FieldItem
          key={index}
          label={field.label}
          value={bodyData[field.key]}
        />
      ))}
    </div>
  );
};

export default GovernmentIds;
