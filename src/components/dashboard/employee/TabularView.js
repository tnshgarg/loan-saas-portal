import { Card, Dialog, Elevation, Tab, Tabs } from "@blueprintjs/core";
import Select from "react-select";
import { matchSorter } from "match-sorter";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetAllEmployeesByEmployerIdQuery,
  useLazyGetAllEmployeesByEmployerIdQuery,
} from "../../../store/slices/apiSlices/employees/employeesApiSlice";
import Table from "../../common/Table";
import { EmployeeModal } from "./employeeModal/EmployeeModal";
import { tableColumns } from "./tableColumns";
import { capitalize, isObject } from "lodash";

const REGISTER_FORM_CARD_STYLING = {
  width: "80%",
  marginRight: "auto",
  marginLeft: "auto",
  overflow: "scroll",
};

const TABLE_CARD_STYLING = {
  overflow: "scroll",
  borderRadius: "0px",
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

const UNVERIFIED_OPTIONS = [
  {
    label: "Aadhar",
    value: "aadhaar",
  },
  {
    label: "Pan",
    value: "pan",
  },
  {
    label: "Bank Details",
    value: "bank",
  },
];

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

const TabularViewTab = () => {
  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

  const responseFromQuery = useGetAllEmployeesByEmployerIdQuery(employerId);
  const { data, isLoading, error } = responseFromQuery;

  const responseFromLazyQuery = useLazyGetAllEmployeesByEmployerIdQuery();
  const [
    trigger,
    { data: lazyData, isLoading: lazyIsLoading, error: lazyError },
  ] = responseFromLazyQuery;

  const [fetchedRows, setFetchedRows] = useState([]);

  const setFetchedRowsFromBody = (body) => {
    const fetchedRowsData = body.map((employee) => {
      const {
        employeeId,
        name,
        mobile,
        email,
        dob,
        title,
        aadhaar,
        pan,
        bank,
        _id,
        status,
      } = employee;
      return {
        "Employee ID": employeeId,
        Name: name,
        "Mobile Number": mobile,
        Email: email,
        "Date of Birth (dd/mm/yyyy)": dob,
        "Job Title": title,
        _id: _id,
        Status: capitalize(status),
        "Aadhaar Number": aadhaar?.number,
        "Aadhaar Status": aadhaar.verifyStatus,
        "PAN Number": pan?.number,
        "PAN Status": pan.verifyStatus,
        "Account Number": bank?.accountNumber,
        "Account Status": bank?.verifyStatus,
      };
    });
    setFetchedRows(fetchedRowsData);
  };

  useEffect(() => {
    if (data) {
      const body = data.body ?? [];
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

  const handleRowClick = (currentRow) => {
    const { _id } = currentRow;
    setIsDialogOpen(true);
    setCurrEmployeeId(_id);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    if (didDialogChange) {
      trigger(employerId);
    }
    setDidDialogChange(false);
  };

  const rowProps = (row) => {
    console.log({row})
    const isSuccess =
      row.values["Aadhaar Status"] === "SUCCESS" &&
      row.values["PAN Status"] === "SUCCESS" &&
      row.values["Account Status"] === "SUCCESS";
    return {
      style: {
        backgroundColor: isSuccess
          ? "rgb(114, 202, 155)"
          : "rgb(235, 164, 197)",
      },
    };
  };
  return (
    <Card
      style={TABLE_CARD_STYLING}
      interactive={false}
      elevation={Elevation.THREE}
    >
      <Table
        columns={columns}
        defaultColumn={defaultColumn}
        data={fetchedRows}
        handleRowClick={handleRowClick}
        showPagination={true}
        filterTypes={filterTypes}
        showEditColumn={false}
        showFilter={true}
        hoverEffect={true}
        rowProps={rowProps}
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
            setDidDialogChange={setDidDialogChange}
          />
        </Card>
      </Dialog>
    </Card>
  );
};

const TabularTabsComponent = () => {
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth === undefined || auth === {} || !auth.isLoggedIn) {
      navigate("/login");
    } else {
      // setUserName(user.signInUserSession.idToken.payload.name);
      // setUserName(auth.user.attributes.name);
    }
  }, [auth, navigate]);

  return (
    <>
      <Card
        style={REGISTER_FORM_CARD_STYLING}
        interactive={false}
        elevation={Elevation.THREE}
      >
        <TabularViewTab />
      </Card>
    </>
  );
};

export const TabularView = TabularTabsComponent;
