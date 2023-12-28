import { UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import StatisticsCard from "../../newComponents/cards/StatisticsCard";
import BannerCard from "../../newComponents/cards/banner-card";

import { HEADER_LIST as ATTENDANCE_HEADER_LIST } from "../../components/dashboard/attendance/dataUpload/attendanceDataUploadPanelFields";
import { HEADER_LIST as EMPLOYEE_HEADER_LIST } from "../../components/dashboard/employee/onboarding/fields";

import { useDispatch, useSelector } from "react-redux";
import attendance_icon from "../../assets/icons/attendance.png";
import employee_icon from "../../assets/icons/employee_data.png";
import AttendanceUpload from "../../newComponents/AttendanceUpload";
import EmployeeUpload from "../../newComponents/EmployeeUpload";
import HomeSteps from "../../newComponents/HomeSteps";
import { useGetAllEmployeesPanelByEmployerIdQuery } from "../../store/slices/apiSlices/employees/panelApiSlice";
import { useGetAttendanceQuery } from "../../store/slices/apiSlices/employer/attendanceApiSlice";
import ComingSoon from "../ComingSoon";

const statisticsCardsData = [
  {
    icon: UserGroupIcon,
    className: "col-span-2",
    title: "On Demand Withdrawal",
    data: [
      { label: "Total Amount", value: 45700, className: "text-black" },
      { label: "Employees", value: 567, className: "text-black" },
    ],
    footer: {
      color: "text-green-500",
      value: "345",
      label: "Active Employees:",
    },
  },
  {
    icon: UserIcon,
    className: "col-span-2",
    title: "Company Name",
    data: [
      { label: "Completed Onboarding", value: 11345, className: "text-black" },
      { label: "Pending KYC", value: 5678, className: "text-black" },
    ],
    footer: {
      color: "text-green-500",
      value: "45",
      label: "KYC Done:",
    },
  },
];

function Home() {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";
  const { data: employeesData } =
    useGetAllEmployeesPanelByEmployerIdQuery(employerId);
  const today = new Date();
  const [{ year, month }, setDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });
  const { data: attendanceData } = useGetAttendanceQuery({
    id: employerId,
    year: year,
    month: month,
  });

  const dateChanged = (updatedDate) => {
    setDate(updatedDate);
  };

  useEffect(() => {
    if (employeesData?.length === 0 && attendanceData?.length === 0)
      setActiveStep(0);
    else if (employeesData?.length !== 0 && attendanceData?.length === 0)
      setActiveStep(1);
    else setActiveStep(2);
  }, [employeesData, attendanceData]);

  const stepsData = [
    {
      headerImage: employee_icon,
      header: "Welcome to Unipe",
      subHeader:
        "Kickstart your journey with us. Just a few simple steps, and your employees will be onboarded in no time.",
      stepTitle: "Step 1: Import Your Employee Data",
      stepSubtitle:
        "Start by uploading your employee data. If you're unsure, download our template to guide you",
      btnName: "Employees",
      note: "Quick Tip: Always ensure your data is up-to-date and accurate. It helps in ensuring seamless processing and payouts.",
      templateData: [EMPLOYEE_HEADER_LIST],
    },
    {
      headerImage: attendance_icon,
      header: "Ready to Offer Advance Salaries?",
      subHeader:
        "Kickstart your journey with us. Just a few simple steps, and your employees will be onboarded in no time.",
      stepTitle: "Step 2: Upload Employee Attendance Data",
      stepSubtitle:
        "By uploading the attendance data, you empower your employees to avail of their on-demand salary benefits via the Unipe App",
      btnName: "Attendance",
      note: "Reminder: Uploading accurate attendance data ensures your employees enjoy uninterrupted access to Unipe's advance salary feature.",
      templateData: [ATTENDANCE_HEADER_LIST],
    },
  ];

  const handleOpen = () => {
    setOpen(true);
  };
  const dispatch = useDispatch();

  return <ComingSoon />;

  return activeStep < 2 ? (
    <div className="mt-4 flex flex-col items-center justify-center h-[75vh]">
      <HomeSteps
        subHeader={stepsData[activeStep].subHeader}
        header={stepsData[activeStep].header}
        headerImage={stepsData[activeStep].headerImage}
        stepTitle={stepsData[activeStep].stepTitle}
        stepSubtitle={stepsData[activeStep].stepSubtitle}
        templateData={stepsData[activeStep].templateData}
        btnName={stepsData[activeStep].btnName}
        note="Quick Tip: Always ensure your data is up-to-date and accurate. It helps in ensuring seamless processing and payouts."
        setOpen={setOpen}
        open={open}
        handleOpen={handleOpen}
      />
      {activeStep === 0 && open ? (
        <EmployeeUpload
          setOpen={setOpen}
          handleOpen={handleOpen}
          open={open}
          employeesData={employeesData?.body}
        />
      ) : (
        <></>
      )}
      {activeStep === 1 && open ? (
        <AttendanceUpload
          setOpen={setOpen}
          handleOpen={handleOpen}
          open={open}
          attendanceData={attendanceData?.body}
          dateChanged={dateChanged}
          year={year}
          month={month}
        />
      ) : (
        <></>
      )}
    </div>
  ) : (
    <div className="mt-4">
      <div className="mb-6 grid gap-y-10 gap-x-6">
        <BannerCard />
      </div>
      <div className="mb-6 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-6">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-gray",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-6">
        <Card className="overflow-hidden shadow-none xl:col-span-2">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6 flex flex-col"
          >
            <div className="flex flex-row w-full justify-between items-center pt-0">
              <Typography className="mb-4 text-md">
                Recent Withdrawals
              </Typography>
            </div>
            {[1, 2, 3, 4].map((item, index) => (
              <ListItem className="bg-lightgray_01 mt-2" key={index}>
                <ListItemPrefix>
                  <Avatar
                    size="sm"
                    variant="circular"
                    alt={`Avatar ${index}`}
                    src={`https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000`}
                  />
                </ListItemPrefix>
                <div>
                  <Typography className="mb-1 text-md text-black font-medium">
                    Tania Andrew
                  </Typography>
                  <Typography className="text-xs text-gray">
                    14 Jan, 2023
                  </Typography>
                </div>
                <ListItemSuffix>
                  <Typography className="mb-1 text-md text-black font-bold">
                    5000
                  </Typography>
                </ListItemSuffix>
              </ListItem>
            ))}
          </CardHeader>
        </Card>
        <Card className="overflow-hidden shadow-none xl:col-span-2">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Repayment Summary
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            {/* <List>
          <ListItem>Inbox</ListItem>
          <ListItem>Trash</ListItem>
          <ListItem>Settings</ListItem>
        </List> */}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;