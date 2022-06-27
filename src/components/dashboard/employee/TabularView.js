import {
  Button,
  Card,
  Dialog,
  EditableText,
  Elevation,
  Spinner,
  Tab,
  Tabs,
} from "@blueprintjs/core";
import axios from "axios";
import { matchSorter } from "match-sorter";
import { useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFilters, usePagination, useSortBy, useTable } from "react-table";
import styled from "styled-components";
import {
  setEmployeeData,
  updateEmployeeDataAndSetEdits,
} from "../../../store/actions/employee";
import Navbar from "../Navbar";
import { EmployeeModalForm } from "./EmployeeModalForm";
import { tableColumns } from "./tableColumns";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
  .pagination {
    padding: 0.5rem;
  }
`;

const REGISTER_FORM_CARD_STYLING = {
  marginLeft: "auto",
  marginRight: "auto",
  overflow: "scroll",
  width: "75rem",
};

const TABLE_CARD_STYLING = {
  overflow: "scroll",
};

const MODAL_STYLING = {
  // height: "25rem",
  marginTop: "7.5rem",
  marginBottom: "5rem",
  width: "50rem",
};

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
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

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row,
  column: { id },
  isTableEditable, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);
  const [isUpdated, setIsUpdate] = useState(false);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setValue(e);
  };

  // We'll only update the external data when the input is blurred
  const onConfirm = (e) => {
    if (e !== initialValue) {
      setIsUpdate(true);
      const uniqueId = row.original["_id"];
      const columnToChange = id;
      const valueToChangeWith = e;
      dispatch(
        updateEmployeeDataAndSetEdits(
          uniqueId,
          columnToChange,
          valueToChangeWith
        )
      );
    }
  };

  // If the initialValue is changed external, sync it up with our state
  // useEffect(() => {
  //   setValue(initialValue);
  // }, [initialValue]);

  return (
    <div style={{ backgroundColor: isUpdated ? "#ffe5b4" : "" }}>
      <EditableText
        value={value}
        onChange={onChange}
        onConfirm={onConfirm}
        disabled={!isTableEditable}
      />
    </div>
  );
};

const TabularViewTab = () => {
  const auth = useSelector((state) => state.auth);
  const fetchedRows = useSelector(
    (state) => Object.values(state.employee?.employeeData),
    shallowEqual
  );

  // const fetchedRows = useMemo(() => [], []);

  const dispatch = useDispatch();

  const columns = useMemo(
    () =>
      tableColumns.map((header) => {
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
      Cell: EditableCell,
    }),
    []
  );

  useEffect(() => {
    const fetchData = () => {
      const options = {
        headers: {
          Authorization: auth.user
            ? auth.user.signInUserSession.idToken.jwtToken
            : null,
        },
        params: {
          fields: tableColumns.toString(),
        },
      };
      axios
        .get(
          "https://riz6m4w4r9.execute-api.ap-south-1.amazonaws.com/cognito_auth/employer/account/tabular-crud",
          options
        )
        .then((res) => {
          console.log(res);
          const tempData = res.data["body"];
          const employeeData = Object.assign(
            {},
            ...tempData.map((x) => ({ [x._id]: x }))
          );
          dispatch(setEmployeeData(employeeData));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  const publishChange = (updatedRow) => {
    const options = {
      headers: {
        Authorization: auth.user
          ? auth.user.signInUserSession.idToken.jwtToken
          : null,
      },
    };
    const body = updatedRow;
    return axios.put(
      "https://riz6m4w4r9.execute-api.ap-south-1.amazonaws.com/cognito_auth/employer/account/tabular-crud",
      body,
      options
    );
  };

  const [isTableEditable, setIsTableEditable] = useState(false);

  const handleTableEditButton = () => {
    setIsTableEditable(!isTableEditable);
  };

  const [dialogContent, setDialogContent] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);

  const fetchDataForSingleEmployee = (uniqueId) => {
    const options = {
      headers: {
        Authorization: auth.user
          ? auth.user.signInUserSession.idToken.jwtToken
          : null,
      },
      params: {
        uniqueId: uniqueId,
      },
    };
    axios
      .get(
        "https://riz6m4w4r9.execute-api.ap-south-1.amazonaws.com/cognito_auth/employer/account/tabular-crud",
        options
      )
      .then((res) => {
        console.log(res);
        const tempData = res.data["body"];
        const employeeData = tempData[0];
        setDialogContent(employeeData);
        setShowSpinner(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRowClick = (currentRow) => {
    const { _id: uniqueId } = currentRow;
    setIsDialogOpen(true);
    fetchDataForSingleEmployee(uniqueId);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setShowSpinner(true);
    setDialogContent({});
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: fetchedRows,
      initialState: { pageIndex: 0, pageSize: 5 },
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      isTableEditable,
    },

    useFilters, // useFilters!
    useSortBy,
    usePagination
  );

  // Render the UI for your table
  return (
    <Card
      style={TABLE_CARD_STYLING}
      interactive={true}
      elevation={Elevation.THREE}
    >
      <Button intent="primary" onClick={handleTableEditButton}>
        {isTableEditable ? "Update Table" : "Edit Table"}
      </Button>
      <Styles>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => {
                    handleRowClick(row.original);
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            {"  "} | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>

        <Dialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          title="Employee Details"
          style={MODAL_STYLING}
        >
          <Card interactive={true} elevation={Elevation.THREE}>
            {showSpinner ? (
              <Spinner />
            ) : (
              <EmployeeModalForm formDataInitial={dialogContent} />
            )}
          </Card>
        </Dialog>
      </Styles>
    </Card>
  );
};

const TabularTabsComponent = () => {
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(auth);
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
        interactive={true}
        elevation={Elevation.THREE}
      >
        <Tabs id="tabularView" defaultSelectedTabId="1">
          <Tab id="1" title="Checks Failed " panel={<TabularViewTab />} />
          <Tab id="2" title="Checks Passed" panel={<TabularViewTab />} />
        </Tabs>
      </Card>
    </>
  );
};

export const TabularView = () => {
  return <Navbar child={<TabularTabsComponent />} />;
};
