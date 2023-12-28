import React, { useEffect } from "react";
import { useGetEmployeeDetailsQuery } from "../store/slices/apiSlices/employee/employeeDetailsApiSlice";
import FieldItem from "./FieldItem";

const ProfileDetails = ({ fields, employeeId }) => {
  const fieldsArray = Object.entries(fields);

  const { data, isLoading, error, refetch } = useGetEmployeeDetailsQuery({
    id: employeeId,
    category: "profile", // Assuming "profile" is the category for profile details
  });

  useEffect(() => {
    refetch(); // You can use refetch whenever you want to refresh the data
  }, [employeeId, refetch]);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Check if data.body is defined before parsing
  const parsedData = data?.body ? JSON.parse(data?.body) : {};

  console.log({ fieldsArray });
  console.log({ parsedData });

  return (
    <div className="grid grid-cols-3">
      {Array.isArray(fieldsArray) &&
        fieldsArray.map((field, index) => (
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
