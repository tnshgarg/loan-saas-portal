import { TabPanel, Typography } from "@material-tailwind/react";
import React from "react";
import { useGetEmployeeDetailsQuery } from "../store/slices/apiSlices/employee/employeeDetailsApiSlice";
import BankDetails from "./BankDetails";
import ProfileDetails from "./ProfileDetails";
import WithdrawalTimeline from "./WithdrawalTimeline";

const DynamicTabBody = ({ label, category, fields, profileData }) => {
  const responseFromQuery = useGetEmployeeDetailsQuery({
    id: profileData?._id,
    employmentId: profileData?.employmentId,
    category: category,
  });

  const { data, isLoading, error } = responseFromQuery;

  if (isLoading) return <div>Loading</div>;

  console.log("Dynamic Tab Body", category, data?.body);

  return (
    <TabPanel key={label} value={label} className="p-8">
      <div className="flex flex-row w-full items-center justify-between">
        <Typography className="text-xs text-gray font-medium">
          {label}
        </Typography>
        {/* <PrimaryButton color={"primary"} size="sm" title={"Edit Details"} /> */}
      </div>

      {/* Render tabs based on the type of data.body */}
      {category === "profile" && (
        <ProfileDetails fields={fields} bodyData={data?.body} />
      )}
      {/* {category === "employment" && (
        <EmploymentDetails fields={fields} bodyData={data?.body} />
      )} */}
      {/* {category === "governmentIds" && (
        <GovernmentIds fields={fields} bodyData={data?.body} />
      )} */}
      {category === "bankDetails" && (
        <BankDetails fields={fields} bodyData={data?.body} />
      )}
      {category === "withdrawalTimeline" && <WithdrawalTimeline />}
    </TabPanel>
  );
};

export default DynamicTabBody;
