import {
  Button,
  Card,
  Dialog,
  Elevation,
  Intent,
  NonIdealState,
  Spinner,
  Tag,
} from "@blueprintjs/core";
import { isObject } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dashlet } from "../../../../atomic/molecules/dashlets/dashlet";
import BrowserTable from "../../../../atomic/organisms/browserTable";
import EmployerMetrics from "../../../../atomic/organisms/employerMetrics/EmployerMetrics";
import { initCSVUpload } from "../../../../store/slices/csvUploadSlice.ts";
import {
  useGetAllEmployeesPanelByEmployerIdQuery,
  useLazyGetAllEmployeesPanelByEmployerIdQuery,
} from "../../../../store/slices/apiSlices/employees/panelApiSlice";
import { groupByKeyCount } from "../../../../utils/aggregates";
import { EmployeeModal } from "../employeeModal/EmployeeModal";
import { tableColumns } from "./tableColumns";
import { SerialNumberCell, StatusCell } from "../../../../atomic/organisms/browserTable/cells";

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
    } = employee;
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
  })

  useEffect(() => {
    if (data) {
      const body = data?.body ?? [];
      setFetchedRowsFromBody(body);
      dispatch(initCSVUpload({
        data: reformatEmployeeData(body),
        fields: columns,
        fileName: "employees-tabular-view",
        module: "employees-panel",
      }))
    }
  }, [data]);

  useEffect(() => {
    if (lazyData) {
      const body = lazyData.body ?? [];
      setFetchedRowsFromBody(body);
      dispatch(initCSVUpload({
        data: reformatEmployeeData(body),
        fields: columns,
        fileName: "employees-tabular-view",
        module: "employees-panel",
      }))
    }
  }, [lazyData]);


  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [didDialogChange, setDidDialogChange] = useState(false);

  const [currEmployeeId, setCurrEmployeeId] = useState(null);
  const [currEmploymentId, setCurrEmploymentId] = useState(null);

  const handleRowClick = (currentRow) => {
    const { _id, employmentId } = currentRow;
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
  let component = ""
  if (isLoading || lazyIsLoading) {
    component = (<Spinner style={{ marginTop: "2em", marginBottom: "2em" }} size={54} />)
  } else if (error || lazyError) {
    component = (<Tag icon={"error"} intent={Intent.DANGER} large minimal>
      {error || lazyError}
    </Tag>)
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
    )
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
  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

  const navigate = useNavigate();

  const responseFromQuery =
    useGetAllEmployeesPanelByEmployerIdQuery(employerId);
  const { data } = responseFromQuery;
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
      const panAggregationResult = groupByKeyCount(
        employeeData,
        "PAN Status"
      );
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
        employment: employmentAggregationResult
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
      navigate("/login");
    } else {
      // setUserName(user.signInUserSession.idToken.payload.name);
      // setUserName(auth.user.attributes.name);
    }
  }, [auth, navigate]);

  const handlers = {};
  const createHandler = (e) => {
    return () => {
      if (handlers[e]) handlers[e]();
    };
  };
  return (
    <>
      <EmployerMetrics
        data={metricsData}
        primaryKey={"SUCCESS"}
        config={metricsConfig}
      />
      <Dashlet
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
      </Dashlet>
    </>
  );
};

export const EmployeesPanel = TabularTabsComponent;
