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

import { useSelector } from "react-redux";
import { stepsData } from "../../data/steps-data";
import AttendanceUpload from "../../newComponents/AttendanceUpload";
import EmployeeUpload from "../../newComponents/EmployeeUpload";
import HomeSteps from "../../newComponents/HomeSteps";
import { useGetAllEmployeesEmploymentByEmployerIdQuery } from "../../store/slices/apiSlices/employees/employmentApiSlice";
import { useGetAllEmployeesPanelByEmployerIdQuery } from "../../store/slices/apiSlices/employees/panelApiSlice";
import { useGetAttendanceQuery } from "../../store/slices/apiSlices/employer/attendanceApiSlice";
import {
  useGetDisbursementsQuery,
  useGetRepaymentsQuery,
} from "../../store/slices/apiSlices/employer/ewaApiSlice";

function Home() {
  const today = new Date();

  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

  // State Variables
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [statisticsData, setStatisticsData] = useState([]);
  const [{ year, month }, setDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });

  // Queries
  const { data: attendanceData } = useGetAttendanceQuery({
    id: employerId,
    year: year,
    month: month,
  });
  const { data: disbursementsData, isSuccess: isDisbursementDataFetched } =
    useGetDisbursementsQuery({
      id: employerId,
      year: year,
      month: month,
    });
  const { data: repaymentsData, isSuccess: isRepaymentsDataFetched } =
    useGetRepaymentsQuery({
      id: employerId,
      year: year,
      month: month,
    });
  const { data: employeesData, isSuccess: isEmployeesDataFetched } =
    useGetAllEmployeesPanelByEmployerIdQuery(employerId);
  const { data: employmentsData, isSuccess: isEmploymentsDataFetched } =
    useGetAllEmployeesEmploymentByEmployerIdQuery(employerId);

  // Custom Functions
  const dateChanged = (updatedDate) => {
    setDate(updatedDate);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // useEffects
  useEffect(() => {
    let disbursementTotal = 0;
    if (
      isEmploymentsDataFetched &&
      isDisbursementDataFetched &&
      isEmployeesDataFetched
    ) {
      disbursementsData.body.forEach((disbursement) => {
        disbursementTotal += disbursement?.loanAmount || 0;
      });
      setStatisticsData([
        {
          icon: UserGroupIcon,
          className: "col-span-2",
          title: "On Demand Withdrawal",
          data: [
            {
              label: "Total Amount",
              value: disbursementTotal,
              className: "text-black",
            },
            {
              label: "Employees",
              value: employmentsData.body.length,
              className: "text-black",
            },
          ],
          footer: {
            color: "text-green-500",
            value: employeesData.meta.activeEmployees,
            label: "Active Employees",
          },
        },
        {
          icon: UserIcon,
          className: "col-span-2",
          title: "Company Name",
          data: [
            {
              label: "Completed Onboarding",
              value: employmentsData?.meta?.onboardedUsers,
              className: "text-black",
            },
            {
              label: "Pending KYC",
              value: employeesData?.meta?.kycPending,
              className: "text-black",
            },
          ],
          footer: {
            color: "text-green-500",
            value: employeesData?.meta?.kycDone,
            label: "KYC Done",
          },
        },
      ]);
    }
  }, [
    isEmploymentsDataFetched,
    isDisbursementDataFetched,
    isEmployeesDataFetched,
    isRepaymentsDataFetched,
  ]);

  useEffect(() => {
    if (employeesData?.length === 0 && attendanceData?.length === 0)
      setActiveStep(0);
    else if (employeesData?.length !== 0 && attendanceData?.length === 0)
      setActiveStep(1);
    else setActiveStep(2);
  }, [employeesData, attendanceData]);

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
        {statisticsData.map(({ icon, title, footer, ...rest }) => (
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
            className="m-0 items-center justify-between px-6 pt-4 pb-3 flex flex-col"
          >
            <div className="flex flex-row w-full justify-between items-center pt-0">
              <Typography variant="h6" color="blue-gray">
                Recent Withdrawals
              </Typography>
            </div>
            {isDisbursementDataFetched && disbursementsData.body.length > 0 ? (
              disbursementsData.body.slice(0, 5).map((item, index) => (
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
                      {item.name}
                    </Typography>
                    <Typography className="text-xs text-gray">
                      {new Date(item.availedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  </div>
                  <ListItemSuffix>
                    <Typography className="mb-1 text-md text-black font-bold">
                      {item.loanAmount}
                    </Typography>
                  </ListItemSuffix>
                </ListItem>
              ))
            ) : (
              <div className="text-center pb-4 text-blue-gray-400 pt-3">
                No Withdrawals found for this month
              </div>
            )}
          </CardHeader>
        </Card>
        <Card className="overflow-hidden shadow-none xl:col-span-2">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between px-6 pt-4 pb-3"
          >
            <div>
              <Typography variant="h6" color="blue-gray">
                Repayment Summary
              </Typography>
            </div>
          </CardHeader>
          <CardBody className=" pt-0 pb-2 px-5">
            {isRepaymentsDataFetched && repaymentsData.body.length > 0 ? (
              repaymentsData.body.slice(0, 5).map((item, index) => (
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
                      {item.name}
                    </Typography>
                    <Typography className="text-xs text-gray">
                      {new Date(item.availedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  </div>
                  <ListItemSuffix>
                    <Typography className="mb-1 text-md text-black font-bold">
                      ₹{item.loanAmount}
                    </Typography>
                  </ListItemSuffix>
                </ListItem>
              ))
            ) : (
              <div className="text-blue-gray-400 text-center">
                No Repayments found for this month
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
