import { TabPanel, Typography } from "@material-tailwind/react";
import React from "react";
import BankDetails from "./BankDetails";
import EmploymentDetails from "./EmploymentDetails";
import ProfileDetails from "./ProfileDetails";
import WithdrawalTimeline from "./WithdrawalTimeline";

const DynamicTabBody = ({ label, category, fields, profileData }) => {
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
        <ProfileDetails fields={fields} employeeId={profileData?._id} />
      )}
      {category === "employment" && (
        <EmploymentDetails fields={fields} employeeId={profileData?._id} />
      )}
      {/* {category === "governmentIds" && (
        <GovernmentIds fields={fields} employeeId={profileData?._id} />
      )} */}
      {category === "bankDetails" && (
        <BankDetails fields={fields} employeeId={profileData?._id} />
      )}
      {category === "withdrawalTimeline" && (
        <WithdrawalTimeline employeeId={profileData?._id} />
      )}
    </TabPanel>
  );
};

export default DynamicTabBody;
