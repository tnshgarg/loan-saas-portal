import React, { useEffect } from "react";
import { useGetEmployeeDetailsQuery } from "../store/slices/apiSlices/employee/employeeDetailsApiSlice";
import FieldItem from "./FieldItem";

const ProfileDetails = ({ fields, employeeId }) => {
  const fieldsArray = Object.entries(fields);

  const { data, isLoading, error, refetch } = useGetEmployeeDetailsQuery({
    id: employeeId,
    category: "profile",
  });

  console.log("ProfileDetails", data?.body);

  useEffect(() => {
    refetch();
  }, [employeeId, refetch]);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error: {error.message}</div>;

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

export default ProfileDetails;
