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
import BankDetails from "./BankDetails";
import EmploymentDetails from "./EmploymentDetails";
import GovernmentIds from "./GovernmentIds";
import ProfileDetails from "./ProfileDetails";
import WithdrawalTimeline from "./WithdrawalTimeline";

export function ProfileSidebar({ profileData }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator } = controller;
  const { employeeName } = profileData ?? {};
  const [activeTab, setActiveTab] = useState("");

  console.log({ profileData });

  const topData = [
    { label: "Location", value: "Bangalore", icon: "fa fa-map-marker" },
    { label: "Mobile", value: "9041225676", icon: "fa fa-phone" },
    { label: "Email", value: "raunak@unipe.money", icon: "fa fa-envelope" },
  ];

  const categoryComponentMap = {
    profile: ProfileDetails,
    employment: EmploymentDetails,
    governmentIds: GovernmentIds,
    bankDetails: BankDetails,
    withdrawalTimeline: WithdrawalTimeline,
  };

  const tabsMapEntries = Object.entries(newEmployeeFieldsToTabsMap);

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
              <Typography className="text-md font-semibold">
                {employeeName}
              </Typography>
              <Typography className="text-xs text-gray">Unipe</Typography>
            </div>
          </div>
          <div className="w-full grid grid-cols-3 gap-4 ml-4 py-2">
            {topData.map((item, index) => (
              <div className="flex flex-row items-center" key={index}>
                <i className={`${item.icon} text-gray`} aria-hidden="true"></i>
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
          {tabsMapEntries.map(([key, value], index) => (
            <Tab
              key={index}
              value={key}
              onClick={() => setActiveTab(key)}
              className={`text-xs py-2 ${
                activeTab === value ? `text-[#016bff]` : `text-gray`
              }`}
            >
              {key}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {tabsMapEntries.map(([label, { category, fields }], index) => {
            const Component = categoryComponentMap[category];
            return (
              <TabPanel key={index} value={label} className="p-8">
                <div className="flex flex-row w-full items-center justify-between">
                  <Typography className="text-xs text-gray font-medium">
                    {label}
                  </Typography>
                  {/* <PrimaryButton color={"primary"} size="sm" title={"Edit Details"} /> */}
                </div>

                {Component && (
                  <Component
                    fields={fields}
                    employeeId={profileData?._id}
                    employmentId={profileData?.employmentId}
                  />
                )}
              </TabPanel>
            );
          })}
        </TabsBody>
      </Tabs>
    </aside>
  );
}

export default ProfileSidebar;
