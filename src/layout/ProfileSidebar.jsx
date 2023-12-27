import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  IconButton,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { newEmployeeFieldsToTabsMap } from "../components/dashboard/employee/employeeModal/employeeFieldsToTabsMap";
import {
  setOpenConfigurator,
  useMaterialTailwindController,
} from "../contexts/SidebarContext";
import PrimaryButton from "../newComponents/PrimaryButton";
import { useGetEmployeeDetailsQuery } from "../store/slices/apiSlices/employee/employeeDetailsApiSlice";

// New FieldItem component
const FieldItem = ({ label, value }) => (
  <div>
    <Typography className="text-xs text-gray mt-8 font-normal">
      {label}
    </Typography>
    <Typography className="text-sm text-black font-semibold">
      {value}
    </Typography>
  </div>
);

// New CategoryFields component
const CategoryFields = ({ category, fields, profileData }) => (
  <div>
    <Typography className="text-xs font-normal text-black mt-8">
      {category}
    </Typography>
    <div className={`grid ${fields.length > 1 ? "grid-cols-3" : ""} gap-4`}>
      {fields.map((field, index) => (
        <FieldItem
          key={index}
          label={field.label}
          value={profileData[field.key]}
        />
      ))}
    </div>
  </div>
);

// New DynamicTabBody component
const DynamicTabBody = ({ category, fields, profileData }) => {
  const responseFromQuery = useGetEmployeeDetailsQuery({
    id: profileData?._id,
    employmentId: profileData?.employmentId,
    category: category,
    // subCategory: "bank",
  });
  const { data, isLoading, error } = responseFromQuery;

  console.log("category data:", category, data?.body, fields);

  if (!Array.isArray(fields)) {
    console.error(`Invalid 'fields' data for category ${category}`);
    return null; // or provide a default behavior
  }

  return (
    <TabPanel key={category} value={category} className="p-8">
      <div className="flex flex-row w-full items-center justify-between">
        <Typography className="text-xs text-gray">{category}</Typography>
        <PrimaryButton variant={"primary"} size="sm" title={"Edit Details"} />
      </div>

      {fields.map(([key, value], index) => (
        <CategoryFields
          key={index}
          category={key}
          fields={value}
          profileData={data?.body}
        />
      ))}
    </TabPanel>
  );
};

export function ProfileSidebar({ profileData }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator } = controller;
  const { employeeName /* other variables */ } = profileData ?? {};

  const [activeTab, setActiveTab] = useState("");

  const topData = [
    { label: "Location", value: "Bangalore", icon: "fa fa-map-marker" },
    { label: "Mobile", value: "9041225676", icon: "fa fa-phone" },
    { label: "Email", value: "raunak@unipe.money", icon: "fa fa-envelope" },
  ];

  const tabsMapEntries = Object.entries(newEmployeeFieldsToTabsMap);

  console.log("tabsMapEntries", tabsMapEntries);

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-[44rem] bg-white shadow-lg transition-transform duration-300 backdrop-opacity-50 ${
        openConfigurator ? "translate-x-0" : "translate-x-[44rem]"
      }`}
    >
      <div className="flex flex-row items-start justify-between p-4 m-2 bg-gradient-to-r from-[#ebf9d9] to-[#f5fdc8] mt-4 rounded-md">
        <Avatar
          src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png"
          alt="avatar"
          size="xxl"
        />
        <div className="flex flex-col w-full pr-8">
          <div className="flex flex-row w-full items-start justify-between">
            <div className="flex flex-col ml-4 border-b py-2 w-full border-lightgray_01">
              <Typography className="text-md font-semibold ">
                {employeeName}
              </Typography>
              <Typography className="text-xs text-gray">Unipe</Typography>
            </div>
          </div>
          <div className="w-full grid grid-cols-3 gap-4 ml-4 py-2">
            {topData.map((item, index) => (
              <div className="flex flex-row items-center" key={index}>
                <i class={`${item.icon} text-gray`} aria-hidden="true"></i>
                <div className="w-full flex flex-col items-start pl-3">
                  <Typography className="text-[10px] text-gray">
                    {item.label}
                  </Typography>
                  <Typography className="text-xs text-black font-semibold">
                    {item.value}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenConfigurator(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-b border-t border-blue-gray-50 bg-transparent p-0 mt-4"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-[#016bff] shadow-none rounded-none",
          }}
        >
          {Object.entries(newEmployeeFieldsToTabsMap).map(
            ([key, value], index) => {
              return (
                <Tab
                  key={index}
                  value={key}
                  onClick={() => setActiveTab(value)}
                  className={`text-xs py-2 ${
                    activeTab === value ? `text-[#016bff]` : `text-gray`
                  }`}
                >
                  {key}
                </Tab>
              );
            }
          )}
        </TabsHeader>
        <TabsBody>
          {tabsMapEntries.map(([key, value], index) => (
            <DynamicTabBody
              key={index}
              category={value.category}
              fields={value.fields}
              profileData={profileData}
            />
          ))}
        </TabsBody>
      </Tabs>
    </aside>
  );
}

export default ProfileSidebar;
