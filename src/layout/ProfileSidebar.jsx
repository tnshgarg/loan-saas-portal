import React from "react";
import { XMarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Switch,
  Typography,
  Chip,
  Avatar,
  Tabs,
  TabsHeader,
  Tab,
  TabPanel,
  TabsBody,
} from "@material-tailwind/react";
import _ from "lodash";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavColor,
  setSidenavType,
  setFixedNavbar,
} from "../contexts/SidebarContext";
import {
  employeeFieldsToTabsMap,
  newEmployeeFieldsToTabsMap,
} from "../components/dashboard/employee/employeeModal/employeeFieldsToTabsMap";
import PrimaryButton from "../newComponents/PrimaryButton";

function formatNumber(number, decPlaces) {
  decPlaces = Math.pow(10, decPlaces);

  const abbrev = ["K", "M", "B", "T"];

  for (let i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3);

    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;

      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      number += abbrev[i];

      break;
    }
  }

  return number;
}

export function ProfileSidebar({
  profileData,
  currEmployeeId,
  currEmploymentId,
}) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator, sidenavColor, sidenavType, fixedNavbar } =
    controller;

  const {
    employmentId,
    employeeName,
    ewa,
    mobile,
    ewaStatus,
    email,
    dob,
    designation,
    principalEmployer,
    empStatus,
  } = profileData ?? {};

  console.log({ profileData });

  const sidenavColors = {
    blue: "from-blue-400 to-blue-600",
    "blue-gray": "from-blue-gray-800 to-blue-gray-900",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
  };

  const [activeTab, setActiveTab] = React.useState("html");

  const topData = [
    { label: "Location", value: "Bangalore", icon: "fa fa-map-marker" },
    { label: "Mobile", value: "9041225676", icon: "fa fa-phone" },
    { label: "Email", value: "raunak@unipe.money", icon: "fa fa-envelope" },
  ];

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
          {Object.entries(newEmployeeFieldsToTabsMap).map(
            ([key, value], index) => {
              const {
                category,
                fields,
                requiredFields,
                fieldPatterns,
                readOnlyFields,
                hasSubTabs,
              } = value;

              const fieldsInverted = _.invert(fields);

              return (
                <TabPanel key={index} value={key} className="p-8">
                  <div className="flex flex-row w-full items-center justify-between">
                    <Typography className="text-xs text-gray">{key}</Typography>
                    <PrimaryButton
                      variant={"primary"}
                      size="sm"
                      title={"Edit Details"}
                    />
                  </div>

                  <div
                    className={`grid ${
                      hasSubTabs ? "grid-cols-1" : "grid-cols-3 "
                    }gap-4`}
                  >
                    {hasSubTabs
                      ? Object.entries(fields).map(
                          ([key, fieldsList], index) => {
                            return (
                              <div key={index}>
                                <Typography className="text-xs font-normal text-black mt-8">
                                  {key}
                                </Typography>
                                <div className="grid grid-cols-3 gap-4">
                                  {Object.entries(fieldsList).map(
                                    ([key, value], index) => {
                                      console.log({ key });
                                      console.log({ value });
                                      return (
                                        <div key={index}>
                                          <Typography className="text-xs text-gray mt-8 font-normal">
                                            {key}
                                          </Typography>
                                          <Typography className="text-sm text-black font-semibold">
                                            {profileData[value]}
                                          </Typography>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            );
                          }
                        )
                      : Object.entries(fieldsInverted).map(
                          ([key, value], index) => {
                            return (
                              <div key={index}>
                                <Typography className="text-xs text-gray mt-8 font-normal">
                                  {key}
                                </Typography>
                                <Typography className="text-sm text-black font-semibold">
                                  {profileData[value]}
                                </Typography>
                              </div>
                            );
                          }
                        )}
                  </div>
                </TabPanel>
              );
            }
          )}
        </TabsBody>
      </Tabs>
    </aside>
  );
}

export default ProfileSidebar;
