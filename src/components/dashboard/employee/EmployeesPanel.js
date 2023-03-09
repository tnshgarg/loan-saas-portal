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
import { matchSorter } from "match-sorter";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dashlet } from "../../../atomic/molecules/dashlets/dashlet";
import EmployerMetrics from "../../../atomic/organisms/employerMetrics/EmployerMetrics";
import Table from "../../../atomic/organisms/table";
import {
  useGetAllEmployeesPanelByEmployerIdQuery,
  useLazyGetAllEmployeesPanelByEmployerIdQuery,
} from "../../../store/slices/apiSlices/employees/panelApiSlice";
import { groupByKeyCount } from "../../../utils/aggregates";
import { EmployeeModal } from "./employeeModal/EmployeeModal";
import { tableColumns } from "./tableColumns";

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

const FILTER_INPUT_STYLING = {
  border: "1px solid rgba(0, 0, 0, 0.3)",
  marginTop: "5px",
  padding: "5px 5px",
};

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      style={FILTER_INPUT_STYLING}
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val) => !val;

const TabularViewTab = ({ handlers }) => {
  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

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

  useEffect(() => {
    if (data) {
      const body = data?.body ?? [];
      setFetchedRowsFromBody(body);
    }
  }, [data]);

  useEffect(() => {
    if (lazyData) {
      const body = lazyData.body ?? [];
      setFetchedRowsFromBody(body);
    }
  }, [lazyData]);

  const columns = useMemo(
    () =>
      tableColumns.map((header) => {
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
      }),
    []
  );

  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

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

  const cellProps = (cell) => {
    let bgColor = "white";
    if (cell?.value) {
      if (["SUCCESS", "ACTIVE"].includes(cell.value)) {
        bgColor = "rgb(204, 255, 216, 0.5)";
      } else if (cell.value.includes("PENDING")) {
        bgColor = "rgb(247, 252, 162, 0.5)";
      } else if (["ERROR", "INACTIVE"].includes(cell.value)) {
        bgColor = "rgb(255, 215, 213, 0.5)";
      }
    }

    return {
      style: {
        backgroundColor: bgColor,
      },
    };
  };

  const noDataComponent = () => {
    return (
      <div style={{ height: "20vh", width: "100%" }}>
        <NonIdealState
          icon={"property"}
          title={"No Employees"}
          description={<>Looks like no entries for employees</>}
          layout={"horizontal"}
        />
      </div>
    );
  };

  handlers["refresh"] = () => {
    refetch();
  };
  console.log(fetchedRows);
  return (
    <>
      {isLoading ? (
        <Spinner style={{ marginTop: "2em", marginBottom: "2em" }} size={54} />
      ) : error ? (
        <Tag icon={"error"} intent={Intent.DANGER} large minimal>
          {error}
        </Tag>
      ) : (
        <>
          <Table
            columns={[
              {
                Header: "S/N",
                id: "row",
                Cell: ({ row }) => {
                  return <div>{row.index + 1}</div>;
                },
              },
              ...columns,
            ]}
            defaultColumn={defaultColumn}
            data={fetchedRows}
            handleRowClick={handleRowClick}
            showPagination={true}
            filterTypes={filterTypes}
            showEditColumn={false}
            showFilter={true}
            hoverEffect={true}
            cellProps={cellProps}
            showDownload={false}
            handlers={handlers}
            noDataComponent={noDataComponent}
          />
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
      )}
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
      const fetchedRowsData = reformatEmployeeData(body);
      const onboardingAggregationResult = groupByKeyCount(
        fetchedRowsData,
        "Onboarding Status"
      );
      const aadhaarAggregationResult = groupByKeyCount(
        fetchedRowsData,
        "Aadhaar Status"
      );
      const panAggregationResult = groupByKeyCount(
        fetchedRowsData,
        "PAN Status"
      );
      const bankAccountAggregationResult = groupByKeyCount(
        fetchedRowsData,
        "Account Status"
      );
      const metricDataObject = {
        body: {
          employees: onboardingAggregationResult,
          aadhaar: aadhaarAggregationResult,
          pan: panAggregationResult,
          bank: bankAccountAggregationResult,
        },
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
