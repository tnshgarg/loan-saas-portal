import {
  ArrowUpTrayIcon,
  ListBulletIcon,
  UserGroupIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setOpenConfigurator,
  useMaterialTailwindController,
} from "../../contexts/SidebarContext.js";
import ProfileSidebar from "../../layout/ProfileSidebar.jsx";
import TableLayout from "../../layout/TableLayout.jsx";
import BulkUpload from "../../newComponents/BulkUpload.jsx";
import EmployeeUpload from "../../newComponents/EmployeeUpload.jsx";
import FilterModal from "../../newComponents/FilterModal.jsx";
import PrimaryButton from "../../newComponents/PrimaryButton.jsx";
import StatisticsCard from "../../newComponents/cards/StatisticsCard.jsx";
import { useGetAllEmployeesPanelByEmployerIdQuery } from "../../store/slices/apiSlices/employees/panelApiSlice.js";
import { groupByKeyCount } from "../../utils/aggregates.js";

const checkOverallStatus = (aadhaar, pan, bank) => {
  return aadhaar?.verifyStatus === "SUCCESS" &&
    pan?.verifyStatus === "SUCCESS" &&
    bank?.verifyStatus === "SUCCESS"
    ? "SUCCESS"
    : "PENDING";
};

const reformatEmployeeData = (employeeData) => {
  return employeeData?.map((employee) => {
    const {
      employerEmployeeId,
      employeeName,
      mobile,
      email,
      dob,
      designation,
      aadhaar,
      pan,
      bank,
      _id,
      employmentId,
      active,
      principalEmployer,
    } = employee ?? {};
    return {
      "Employee ID": employerEmployeeId,
      Name: employeeName,
      "Mobile Number": mobile,
      "Onboarding Status": checkOverallStatus(aadhaar, pan, bank),
      Email: email,
      "Date of Birth (dd/mm/yyyy)": dob,
      "Job Title": designation,
      _id: _id,
      employmentId: employmentId,
      "Employment Status": active ? "ACTIVE" : "INACTIVE",
      "Aadhaar Number": aadhaar?.number,
      "Aadhaar Status": aadhaar?.verifyStatus ?? "PENDING",
      "PAN Number": pan?.number,
      "PAN Status": pan?.verifyStatus ?? "PENDING",
      "Account Number": bank?.accountNumber,
      "IFSC Code": bank?.ifsc,
      "Account Status": bank?.verifyStatus ?? "PENDING",
      "Principal Employer": principalEmployer,
    };
  });
};

const TabularTabsComponent = () => {
  const auth = useSelector((state) => state.auth);
  const [pendingAadhaar, setPendingAadhaar] = useState(0);
  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

  const navigate = useNavigate();

  const responseFromQuery =
    useGetAllEmployeesPanelByEmployerIdQuery(employerId);
  const { data, isFetching, isLoading } = responseFromQuery;
  console.log("employee data:", data?.body);
  const [filteredData, setFilteredData] = useState(data?.body);

  const getPendingAadhaar = () => {
    data?.body?.forEach(({ aadhaar }, index) => {
      if (aadhaar?.verifyStatus) setPendingAadhaar((prev) => prev + 1);
    });
  };

  const activeEmployees = data?.body?.filter(
    (item) => item.active == true
  )?.length;

  const kycDone = data?.body?.filter(
    (item) =>
      item.aadhaar?.verifyStatus == "SUCCESS" &&
      item.pan?.verifyStatus == "SUCCESS" &&
      item.bank?.verifyStatus == "SUCCESS"
  )?.length;

  const enrolledEmployees = data?.body?.filter(
    (item) => item.employmentId.length > 0
  )?.length;

  const aadhaarPending = data?.body?.filter(
    (item) => item.aadhaar?.verifyStatus != "SUCCESS"
  )?.length;
  const panPending = data?.body?.filter(
    (item) => item.pan?.verifyStatus != "SUCCESS"
  )?.length;
  const bankPending = data?.body?.filter(
    (item) => item.aadhaar?.verifyStatus != "SUCCESS"
  )?.length;

  const statisticsCardsData = [
    {
      icon: UserGroupIcon,
      className: "col-span-1",
      title: "Onboarding Status",
      data: [
        {
          label: "All Employees",
          value: data?.body?.length,
          className: "text-primary",
        },
      ],
      footer: {
        color: "text-green-500",
        value: activeEmployees,
        label: "Active Employees:",
      },
    },
    {
      icon: UserIcon,
      className: "col-span-1",
      title: "Employment Status",
      data: [
        {
          label: "Enrolled Employees",
          value: enrolledEmployees,
          className: "text-primary",
        },
      ],
      footer: {
        color: "text-green-500",
        value: kycDone,
        label: "KYC Done:",
      },
    },
    {
      icon: UserIcon,
      className: "col-span-2",
      title: "Pending Employees",
      data: [
        {
          label: "Aadhaar Pending",
          value: aadhaarPending,
          className: "text-danger",
        },
        { label: "Pan Pending", value: panPending, className: "text-danger" },
        { label: "Bank Pending", value: bankPending, className: "text-danger" },
      ],
      footer: {
        color: "text-green-500",
        value: "",
        label: "KYC is mandatory by RBI guidelines.",
        //TODO: Change text
      },
    },
  ];
  // "Emp ID",
  // "Name",
  // "EWA",
  // "Mobile",
  // "EWA Status",
  // "Email",
  // "DOB",
  // "Designation",
  // "Employeer",
  // "Emp Status",
  // "",
  const TABLE_HEADERS = [
    { label: "Emp ID", value: "employerEmployeeId", sortable: true },
    { label: "Name", value: "employeeName" },
    { label: "EWA", value: "ewa", sortable: true },
    { label: "Mobile", value: "mobile" },
    { label: "EWA Status", value: "ewaStatus", sortable: true },
    { label: "Email", value: "email" },
    { label: "DOB", value: "dob" },
    { label: "Designation", value: "designation" },
    { label: "Employeer", value: "principalEmployer" },
    { label: "Emp Status", value: "active" },
    // { label: "", value: "options" },
  ];

  const modified = reformatEmployeeData(data?.body);
  console.log("modified", modified);

  const [metricsData, setMetricsData] = useState({});
  useEffect(() => {
    if (data) {
      const body = data?.body ?? [];
      const employeeData = reformatEmployeeData(body);
      const onboardingAggregationResult = groupByKeyCount(
        employeeData,
        "Onboarding Status"
      );
      const aadhaarAggregationResult = groupByKeyCount(
        employeeData,
        "Aadhaar Status"
      );
      const panAggregationResult = groupByKeyCount(employeeData, "PAN Status");
      const bankAccountAggregationResult = groupByKeyCount(
        employeeData,
        "Account Status"
      );
      const employmentAggregationResult = groupByKeyCount(
        employeeData,
        "Employment Status"
      );
      const metricDataObject = {
        onboarding: onboardingAggregationResult,
        aadhaar: aadhaarAggregationResult,
        pan: panAggregationResult,
        bank: bankAccountAggregationResult,
        employment: employmentAggregationResult,
      };
      setMetricsData(metricDataObject);
    }
  }, [data]);

  const metricsConfig = {
    labels: {
      employees: "Onboarding Status",
      aadhaar: "Aadhaar KYC",
      pan: "PAN KYC",
      bank: "Bank KYC",
    },
    secondaryConfig: {
      Error: {
        intent: "DANGER",
        icon: "error",
      },
    },
  };

  useEffect(() => {
    if (auth === undefined || auth === {} || !auth.isLoggedIn) {
      navigate("auth/login", { replace: true });
    } else {
      // setUserName(user.signInUserSession.idToken.payload.name);
      // setUserName(auth.user.attributes.name);
    }
  }, [auth, navigate]);

  console.log({ metricsData });

  const handlers = {};
  const createHandler = (e) => {
    return () => {
      if (handlers[e]) handlers[e]();
    };
  };
  const [onboardOpen, setOnboardOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const [controller, dispatch] = useMaterialTailwindController();

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const applyFilter = (filterCriteria) => {
    // Handle the filter criteria, for now, just log it
    console.log("Filter Applied:", filterCriteria);
    setFilter(filterCriteria);
    // Add your logic to filter the data based on the criteria
    // For example, update the filteredData state in your component
  };

  const availableProperties = [
    "EWA Balance",
    "Other Property1",
    "Other Property2",
  ];

  return (
    <div className="mt-4">
      <div className="mb-6 grid gap-y-10 gap-x-4 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(
          ({ icon, title, footer, className, ...rest }) => (
            <StatisticsCard
              className={className}
              key={title}
              {...rest}
              title={title}
              icon={React.createElement(icon, {
                className: "w-6 h-6 text-gray",
              })}
              footer={
                <Typography className="text-md text-black">
                  {footer.label}
                  <strong className={footer.color}> {footer.value}</strong>
                </Typography>
              }
            />
          )
        )}
      </div>
      <div className="w-full flex-row flex items-center justify-between">
        <Typography className="text-md">All Employees</Typography>
        <div className="flex-row flex items-center justify-between">
          <PrimaryButton
            title={"Upload attendance data"}
            color="primary"
            size={"sm"}
            className={"ml-0"}
            leftIcon={ArrowUpTrayIcon}
          />
          <PrimaryButton
            title={"Onboard Employees"}
            color="primary"
            size={"sm"}
            onClick={() => setOnboardOpen(true)}
            className={"ml-0"}
            leftIcon={UserPlusIcon}
          />
          <PrimaryButton
            title={"Bulk Update via Upload "}
            color="primary"
            size={"sm"}
            className={"ml-0"}
            leftIcon={ListBulletIcon}
            onClick={() => setBulkOpen(true)}
          />
        </div>
      </div>

      <TableLayout
        mainData={data?.body}
        rowData={filteredData}
        setRowData={setFilteredData}
        tableHeaders={TABLE_HEADERS}
        renderActionItems={(item, index) => (
          <Menu>
            <MenuHandler>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </MenuHandler>
            <MenuList>
              <MenuItem>Turn Off EWA Access</MenuItem>
              <MenuItem
                onClick={() => {
                  // console.log(index);
                  setOpenConfigurator(dispatch, true);
                  setActiveIndex(index);
                }}
              >
                Go To Profile
              </MenuItem>
              <MenuItem>Delete</MenuItem>
            </MenuList>
          </Menu>
        )}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        onApplyFilter={applyFilter}
        properties={availableProperties}
      />
      <EmployeeUpload
        setOpen={setOnboardOpen}
        handleOpen={() => setOnboardOpen(true)}
        open={onboardOpen}
        employeesData={data?.body}
      />
      <BulkUpload
        setOpen={setBulkOpen}
        handleOpen={() => setBulkOpen(true)}
        open={bulkOpen}
        employeesData={data?.body}
      />
      <ProfileSidebar profileData={filteredData?.[activeIndex] ?? {}} />
    </div>
  );
};

export const EmployeesPanel = TabularTabsComponent;
