import React, { useEffect } from "react";
import { useLazyGetEmployeeDetailsQuery } from "../store/slices/apiSlices/employee/employeeDetailsApiSlice";
import FieldItem from "./FieldItem";

const GovernmentIds = ({ fields, employeeId }) => {
  const aadhaarFieldsArray = Object.entries(fields.Aadhaar);
  const panFieldsArray = Object.entries(fields.PAN);

  const [
    getPanDetails,
    { data: panData, loading: panLoading, error: panError },
  ] = useLazyGetEmployeeDetailsQuery();

  const [
    getAadhaarDetails,
    { data: aadhaarData, loading: aadhaarLoading, error: aadhaarError },
  ] = useLazyGetEmployeeDetailsQuery();

  useEffect(() => {
    getPanDetails({
      id: employeeId,
      category: "governmentIds",
      subCategory: "pan",
    });

    getAadhaarDetails({
      id: employeeId,
      category: "governmentIds",
      subCategory: "aadhaar",
    });
  }, [employeeId, getPanDetails, getAadhaarDetails]);

  if (panLoading || aadhaarLoading) return <div>Loading</div>;
  if (panError || aadhaarError) {
    return <div>Error: {panError?.message || aadhaarError?.message}</div>;
  }

  // Check if data.body is defined before parsing
  const panDataParsed = panData?.body ? panData.body : {};
  const aadhaarDataParsed = aadhaarData?.body ? aadhaarData.body : {};

  return (
    <div>
      {/* Render Pan details */}
      <div className="grid grid-cols-3">
        {Array.isArray(panFieldsArray) &&
          panFieldsArray.map((field, index) => (
            <FieldItem
              key={index}
              label={field[1]}
              value={panDataParsed?.[field[0]]}
            />
          ))}
      </div>

      {/* Render Aadhaar details */}
      <div className="grid grid-cols-3">
        {Array.isArray(aadhaarFieldsArray) &&
          aadhaarFieldsArray.map((field, index) => (
            <FieldItem
              key={index}
              label={field[1]}
              value={aadhaarDataParsed?.[field[0]]}
            />
          ))}
      </div>
    </div>
  );
};

export default GovernmentIds;
