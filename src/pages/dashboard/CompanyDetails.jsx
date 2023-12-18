import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";

const CompanyDetails = () => {
  const tabs = [
    "Company Details",
    "Tax Setup",
    "Compliance Automation",
    "Payout Integration",
  ];
  const [activeTab, setActiveTab] = useState("Company Details");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderTabs = () => (
    <div className="col-span-1 border-r border-lightGray">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center p-4 hover:bg-[#F7F7F7] cursor-pointer border-b border-lightGray ${
            activeTab === tab ? "text-secondary" : "text-black"
          }`}
          onClick={() => handleTabClick(tab)}
        >
          <Typography className="text-sm font-medium">{tab}</Typography>
        </div>
      ))}
    </div>
  );

  const renderDetailsGrid = () => (
    <div className="col-span-3 p-4 grid grid-cols-4 gap-2">
      {[1, 2, 3, 4, 5].map((_, index) => (
        <div className="flex flex-col h-12" key={index}>
          <Typography className="text-[10px] text-gray font-medium">
            Label
          </Typography>
          <Typography className="text-[14px] text-black font-medium">
            Value
          </Typography>
        </div>
      ))}
    </div>
  );

  return (
    <div className="mt-4">
      <div className="bg-white w-full rounded-md grid grid-cols-4">
        {renderTabs()}
        {renderDetailsGrid()}
      </div>
    </div>
  );
};

export default CompanyDetails;
