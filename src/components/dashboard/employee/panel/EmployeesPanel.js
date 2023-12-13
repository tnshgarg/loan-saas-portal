import {
  Card,
  Dialog,
  Elevation,
  Intent,
  Spinner,
  Tag,
} from "@blueprintjs/core";
import { isObject } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dashlet } from "../../../../atomic/molecules/dashlets/dashlet";
import BrowserTable from "../../../../atomic/organisms/browserTable";
import {
  SerialNumberCell,
  StatusCell,
} from "../../../../atomic/organisms/browserTable/cells";
import EmployerMetrics from "../../../../atomic/organisms/employerMetrics/EmployerMetrics";
import {
  allEmployeesPanelDetails,
  useGetAllEmployeesPanelByEmployerIdQuery,
  useLazyGetAllEmployeesPanelByEmployerIdQuery,
} from "../../../../store/slices/apiSlices/employees/panelApiSlice";
import { initBrowserTable } from "../../../../store/slices/browserTableSlice.ts";
import { groupByKeyCount } from "../../../../utils/aggregates";
import { EmployeeModal } from "../employeeModal/EmployeeModal";
import { tableColumns } from "./tableColumns";

import { Button, Typography } from "@material-tailwind/react";
import StatisticsCard from "../../../../newComponents/cards/StatisticsCard";
import {
  ArrowUpTrayIcon,
  BanknotesIcon,
  ListBulletIcon,
  UserGroupIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import PrimaryButton from "../../../../newComponents/PrimaryButton";
import TextInput from "../../../../newComponents/TextInput";
import EmployeeTable from "../../../../newComponents/EmployeeTable";
import SearchInput from "../../../../newComponents/SearchInput.jsx";
import { CsvUploadDialog } from "../../../../newComponents/CsvUploadDialog.jsx";
import {
  HEADER_GROUPS,
  HEADER_LIST,
  transformHeadersToFields,
} from "../onboarding/fields.jsx";
import employee_icon from "../../../../assets/icons/employee_data.png";
import EmployeeUpload from "../../../../newComponents/EmployeeUpload.jsx";
import FilterModal from "../../../../newComponents/FilterModal.jsx";
import TableLayout from "../../../../layout/TableLayout.jsx";

const checkOverallStatus = (aadhaar, pan, bank) => {
  return aadhaar?.verifyStatus === "SUCCESS" &&
    pan?.verifyStatus === "SUCCESS" &&
    bank?.verifyStatus === "SUCCESS"
    ? "SUCCESS"
    : "PENDING";
};

const reformatEmployeeData = (employeeData) => {
  return employeeData.map((employee) => {
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

const MODAL_STYLING = {
  marginTop: "7.5rem",
  marginBottom: "5rem",
  width: "55rem",
};

const TabularViewTab = ({ handlers }) => {
  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";
  const dispatch = useDispatch();
  const responseFromQuery =
    useGetAllEmployeesPanelByEmployerIdQuery(employerId);
  const { data, isLoading, error, refetch } = responseFromQuery;
  console.log({ data, isLoading, error, refetch });
  const responseFromLazyQuery = useLazyGetAllEmployeesPanelByEmployerIdQuery();
  const [
    trigger,
    { data: lazyData, isLoading: lazyIsLoading, error: lazyError },
  ] = responseFromLazyQuery;

  const [fetchedRows, setFetchedRows] = useState([]);

  const setFetchedRowsFromBody = (body) => {
    const fetchedRowsData = reformatEmployeeData(body);
    setFetchedRows(fetchedRowsData);
  };

  const columns = tableColumns.map((header) => {
    if (isObject(header)) {
      return {
        Header: header.Header,
        columns: header.columns,
      };
    }
    return {
      Header: header,
      accessor: header,
    };
  });

  useEffect(() => {
    if (data) {
      const body = data?.body ?? [];
      setFetchedRowsFromBody(body);
      dispatch(
        initBrowserTable({
          data: reformatEmployeeData(body),
          fields: columns,
          fileName: "employees-tabular-view",
          module: "employees-panel",
        })
      );
    }
  }, [data]);

  useEffect(() => {
    if (lazyData) {
      const body = lazyData.body ?? [];
      setFetchedRowsFromBody(body);
      dispatch(
        initBrowserTable({
          data: reformatEmployeeData(body),
          fields: columns,
          fileName: "employees-tabular-view",
          module: "employees-panel",
        })
      );
    }
  }, [lazyData]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [didDialogChange, setDidDialogChange] = useState(false);

  const [currEmployeeId, setCurrEmployeeId] = useState(null);
  const [currEmploymentId, setCurrEmploymentId] = useState(null);

  const handleRowClick = (currentRow) => {
    const { original: { _id, employmentId } = {} } = currentRow;
    setIsDialogOpen(true);
    setCurrEmployeeId(_id);
    setCurrEmploymentId(employmentId);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    if (didDialogChange) {
      trigger(employerId);
    }
    setDidDialogChange(false);
  };

  handlers["refresh"] = () => {
    refetch();
  };
  console.log(fetchedRows);
  let component = "";
  if (isLoading || lazyIsLoading) {
    component = (
      <Spinner style={{ marginTop: "2em", marginBottom: "2em" }} size={54} />
    );
  } else if (error || lazyError) {
    component = (
      <Tag icon={"error"} intent={Intent.DANGER} large minimal>
        {error || lazyError}
      </Tag>
    );
  } else {
    component = (
      <BrowserTable
        key="employees-tabular-view"
        module="employees-panel"
        tableName="employees-tabular-view"
        disableEdits={true}
        onRowClick={handleRowClick}
        customCells={{
          "S/N": SerialNumberCell,
          "Aadhaar Status": StatusCell,
          "PAN Status": StatusCell,
          "Account Status": StatusCell,
          "Onboarding Status": StatusCell,
          "Employment Status": StatusCell,
        }}
      />
    );
  }

  return (
    <>
      {component}
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        title="Employee Details"
        style={MODAL_STYLING}
      >
        <Card interactive={true} elevation={Elevation.THREE}>
          <EmployeeModal
            currEmployeeId={currEmployeeId}
            currEmploymentId={currEmploymentId}
            setDidDialogChange={setDidDialogChange}
          />
        </Card>
      </Dialog>
    </>
  );
};

const TabularTabsComponent = () => {
  const auth = useSelector((state) => state.auth);
  const [pendingAadhaar, setPendingAadhaar] = useState(0);
  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

  const navigate = useNavigate();

  const responseFromQuery =
    useGetAllEmployeesPanelByEmployerIdQuery(employerId);
  const { data } = responseFromQuery;

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
      item.aadhaar.verifyStatus == "SUCCESS" &&
      item.pan.verifyStatus == "SUCCESS" &&
      item.bank.verifyStatus == "SUCCESS"
  )?.length;

  const enrolledEmployees = data?.body?.filter(
    (item) => item.employmentId.length > 0
  )?.length;

  const aadhaarPending = data?.body?.filter(
    (item) => item.aadhaar.verifyStatus != "SUCCESS"
  )?.length;
  const panPending = data?.body?.filter(
    (item) => item.pan.verifyStatus != "SUCCESS"
  )?.length;
  const bankPending = data?.body?.filter(
    (item) => item.aadhaar.verifyStatus != "SUCCESS"
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
        label:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
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
    { label: "Emp ID", value: "employerEmployeeId" },
    { label: "Name", value: "employeeName" },
    { label: "EWA", value: "ewa" },
    { label: "Mobile", value: "mobile" },
    { label: "EWA Status", value: "ewaStatus" },
    { label: "Email", value: "email" },
    { label: "DOB", value: "dob" },
    { label: "Designation", value: "designation" },
    { label: "Employeer", value: "principalEmployer" },
    { label: "Emp Status", value: "active" },
    { label: "", value: "options" },
  ];

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
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = (e) => {
    setOpen(true);
  };
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filter, setFilter] = useState(null);

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
            onClick={handleOpen}
            className={"ml-0"}
            leftIcon={UserPlusIcon}
          />
          <PrimaryButton
            title={"Bulk Update via Upload "}
            color="primary"
            size={"sm"}
            className={"ml-0"}
            leftIcon={ListBulletIcon}
          />
        </div>
      </div>

      <TableLayout
        mainData={data?.body}
        rowData={filteredData}
        setRowData={setFilteredData}
        tableHeaders={TABLE_HEADERS}
      />
      {/* <div className="w-full flex-row flex items-center justify-between">
        <TextInput />
        <PrimaryButton title={"Filter"} />
        <PrimaryButton title={"Download"} />
      </div> */}

      {/* <EmployerMetrics
        data={metricsData}
        primaryKey={"SUCCESS"}
        config={metricsConfig}
      /> */}
      {/* <Dashlet
        icon={"people"}
        title={"Employee Records"}
        actions={
          <>
            <Button icon={"refresh"} onClick={createHandler("refresh")}>
              Refresh
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              icon={"saved"}
              intent={Intent.SUCCESS}
              onClick={createHandler("download-excel")}
            >
              Download Excel
            </Button>
          </>
        }
      >
        <TabularViewTab handlers={handlers} />
      </Dashlet> */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        onApplyFilter={applyFilter}
        properties={availableProperties}
      />
      <EmployeeUpload
        setOpen={setOpen}
        handleOpen={handleOpen}
        open={open}
        employeesData={data?.body}
      />
    </div>
  );
};

export const EmployeesPanel = TabularTabsComponent;
