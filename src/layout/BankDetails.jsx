import React, { useEffect } from "react";
import { useLazyGetEmployeeDetailsQuery } from "../store/slices/apiSlices/employee/employeeDetailsApiSlice";
import FieldItem from "./FieldItem";

const BankDetails = ({ fields, employeeId }) => {
  const fieldsArray = Object.entries(fields);

  const [getEmployeeDetails, { data, loading, error }] =
    useLazyGetEmployeeDetailsQuery();

  useEffect(() => {
    getEmployeeDetails({
      id: employeeId,
      category: "bankDetails",
    });
  }, [employeeId, getEmployeeDetails]);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Check if data.body is defined before parsing
  const parsedData = data?.body ? data?.body : {};

  return (
    <div className="grid grid-cols-3">
      {Array.isArray(fieldsArray) &&
        fieldsArray.map((field, index) => (
          <FieldItem
            key={index}
            label={field[1]}
            value={parsedData?.[field[0]]}
          />
        ))}
    </div>
  );
};

export default BankDetails;
