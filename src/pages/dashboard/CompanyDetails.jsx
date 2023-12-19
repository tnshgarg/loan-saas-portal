import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import RegisterForm from "../../components/dashboard/registerForm/RegisterForm";
import { useGetEmployerAddressByIdQuery } from "../../store/slices/apiSlices/employer/addressApiSlice";

const CompanyDetails = () => {
  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

  const responseFromQuery = useGetEmployerAddressByIdQuery(employerId);
  const { data: companyData, isLoading, error } = responseFromQuery;
  const {
    body: {
      pin: pinInitial,
      state: stateInitial,
      street: streetInitial,
      company: companyInitial,
      brand: brandInitial,
    } = {},
  } = companyData ?? {};
  console.log("companyData", companyData);

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
      {companyData?.body ? (
        Object.entries(companyData.body).map(([label, value], index) => (
          <div className="flex flex-col h-12" key={index}>
            <Typography className="text-[10px] text-gray font-medium">
              {label}
            </Typography>
            <Typography className="text-[14px] text-black font-medium">
              {value}
            </Typography>
          </div>
        ))
      ) : (
        <Typography className="text-[14px] text-black font-medium">
          Loading...
        </Typography>
      )}
    </div>
  );
  return (
    <div className="mt-4">
      <div className="bg-white w-full rounded-md grid grid-cols-4">
        {renderTabs()}
        {renderDetailsGrid()}
      </div>
      <RegisterForm />
    </div>
  );
};

export default CompanyDetails;
