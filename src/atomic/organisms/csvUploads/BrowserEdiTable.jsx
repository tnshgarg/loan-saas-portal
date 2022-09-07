import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePagination, useTable } from "react-table";
import {
  Button,
  ButtonGroup,
  Colors,
  EditableText,
  HTMLSelect,
  HTMLTable,
  Icon,
  Intent,
  Navbar,
  NavbarGroup,
  Tag,
} from "@blueprintjs/core";
import { connect } from "react-redux";

import {
  FS,
  VALIDATIONS,
} from "../../../components/dashboard/employee/onboarding/validations";
import { coalesce } from "../../../utils/array";
import {
  deleteCSVRow,
  restoreCSVRow,
  toggleFilter,
  updateCSVRow,
} from "../../../store/slices/csvUploadSlice.ts";

const intentMap = {
  [FS.WARN]: Intent.WARNING,
  [FS.ERROR]: Intent.DANGER,
};

const Styles = styled.div`
  padding: 1rem;
  width: 100%;
  overflow-x: auto;

  table {
    border: 1px solid rgb(17 20 24 / 15%);
    border-spacing: 0;

    thead > tr {
      border-bottom: 1px solid rgb(17 20 24 / 15%);
      :last-child {
        tr {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Pagination({
  pageOptions,
  pageIndex,
  gotoPage,
  canPreviousPage,
  nextPage,
  canNextPage,
  pageCount,
  previousPage,
  pageSize,
  setPageSize,
}) {
  return (
    <div className="pagination">
      <Navbar
        minimal
        style={{ color: Colors.GRAY1, boxShadow: "none", padding: 0 }}
      >
        <NavbarGroup>
          <small>Rows per Page</small>
          <HTMLSelect
            small
            minimal
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option
                key={pageSize}
                value={pageSize}
                style={{ fontSize: "0.8em" }}
              >
                {pageSize}
              </option>
            ))}
          </HTMLSelect>
        </NavbarGroup>
        <NavbarGroup>
          <Button
            minimal
            icon="double-chevron-left"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          />
          <Button
            minimal
            icon="chevron-left"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          />
          <NavbarGroup>
            <small>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </small>
          </NavbarGroup>
          <Button
            minimal
            icon="chevron-right"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          />
          <Button
            minimal
            icon="double-chevron-right"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          />
        </NavbarGroup>
        {/*  <span>*/}
        {/*  | Go to page:{" "}*/}
        {/*    <input*/}
        {/*      type="number"*/}
        {/*      defaultValue={pageIndex + 1}*/}
        {/*      onChange={(e) => {*/}
        {/*        const page = e.target.value ? Number(e.target.value) - 1 : 0;*/}
        {/*        gotoPage(page);*/}
        {/*      }}*/}
        {/*      style={{ width: "100px" }}*/}
        {/*    />*/}
        {/*</span>{" "}*/}
      </Navbar>
    </div>
  );
}

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: {
    index,
    values: {
      status: { [FS.DELETED]: isDeleted },
    },
  },
  column,
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue || "");

  let validLevel = FS.VALID;
  if (VALIDATIONS[column.validations]) {
    validLevel = VALIDATIONS[column.validations](value ?? "");
  }

  const intent = intentMap[validLevel] || Intent.NONE;
  const backgroundColor = {
    [Intent.WARNING]: "rgb(247, 252, 162, 0.5)",
    [Intent.DANGER]: "rgb(255, 215, 213, 0.5)",
  }[intent];
  const onChange = (e) => {
    setValue(e);
  };

  const onFocus = () => {
    //pass
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, column.id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div
      style={{
        backgroundColor,
        margin: "-6px -8px -6px -8px",
        padding: " 6px  8px  6px  8px",
      }}
    >
      {isDeleted ? (
        <>
          <strike style={{ backgroundColor }}>{value || "xxxx"}</strike>
        </>
      ) : (
        <EditableText
          value={value}
          intent={intent}
          onChange={onChange}
          onConfirm={onBlur}
          onEdit={onFocus}
        />
      )}
    </div>
  );
};

const DeleteActionCell = ({ value, row: { index }, deleteRow, restoreRow }) => {
  const onClick = () => {
    if (value[FS.DELETED]) {
      restoreRow(index);
    } else {
      deleteRow(index);
    }
  };
  return (
    <Icon
      minimal
      icon={value[FS.DELETED] ? "undo" : "trash"}
      onClick={onClick}
      color={Colors.GRAY1}
    />
  );
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

function Table({
  columns,
  data,
  reduxActions,
  filterMyData,
  filters,
  skipPageReset,
  fieldMap,
  stats,
}) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    setHiddenColumns,
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
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      fieldMap,
      ...reduxActions,
    },
    usePagination
  );
  const paginationProps = {
    pageOptions,
    pageIndex,
    gotoPage,
    canPreviousPage,
    nextPage,
    canNextPage,
    pageCount,
    previousPage,
    pageSize,
    setPageSize,
  };
  // Render the UI for your table
  const [visibility, setVisibility] = useState({
    hiddenHeaders: {},
    hiddenColumns: [],
  });
  const headerMap = {};
  const visibilityToolbar = columns.reduce((groups, header) => {
    if (header.columns) {
      groups.push(header);
      headerMap[header.Header] = header.columns;
    }
    return groups;
  }, []);

  // tech debt useEffect shallow compare
  useEffect(() => {
    const hiddenHeaders = {};
    let hiddenColumns = [];
    visibilityToolbar.forEach((item) => {
      hiddenHeaders[item.Header] = true;
      hiddenColumns = hiddenColumns.concat(item.columns.map((i) => i.accessor));
    });
    setVisibility({ hiddenHeaders, hiddenColumns });
  }, [JSON.stringify(visibilityToolbar)]);

  const toggleVisibility = (header) => {
    Object.keys(visibility.hiddenHeaders).forEach((k) => {
      visibility.hiddenHeaders[k] = true;
    });
    visibility.hiddenHeaders[header] = false;
    let hiddenColumns = [];
    Object.entries(visibility.hiddenHeaders).forEach(([k, v]) => {
      if (v) {
        hiddenColumns = hiddenColumns.concat(
          headerMap[k].map((i) => i.accessor)
        );
      }
    });
    setVisibility({ ...visibility, hiddenColumns });
    setHiddenColumns(hiddenColumns);
  };
  return (
    <div>
      <div style={{ textAlign: "center", paddingBottom: "1em" }}>
        {stats[FS.ERROR] ? (
          <>
            <Tag
              large
              minimal={!filters.includes(FS.ERROR)}
              interactive={true}
              intent={Intent.DANGER}
              icon={"error"}
              rightIcon={filters.includes(FS.ERROR) ? "cross" : ""}
              onClick={() => filterMyData(FS.ERROR)}
            >
              {stats[FS.ERROR]} problems need immediate attention
            </Tag>
            &nbsp;&nbsp;
          </>
        ) : (
          ""
        )}
        {stats[FS.WARN] ? (
          <>
            <Tag
              large={true}
              minimal={!filters.includes(FS.WARN)}
              interactive={true}
              intent={Intent.WARNING}
              icon={"warning-sign"}
              rightIcon={filters.includes(FS.WARN) ? "cross" : ""}
              onClick={() => filterMyData(FS.WARN)}
            >
              {stats[FS.WARN]} fields are incorrect, but can be fixed later
            </Tag>
          </>
        ) : (
          ""
        )}
      </div>
      {visibilityToolbar && visibilityToolbar.length ? (
        <>
          <ButtonGroup>
            <Button disabled minimal>
              {" "}
              Choose Columns to view{" "}
            </Button>
            {visibilityToolbar.map((item) => (
              <Button
                active={!visibility.hiddenHeaders[item.Header]}
                onClick={() => toggleVisibility(item.Header)}
              >
                {" "}
                {item.Header}{" "}
              </Button>
            ))}
          </ButtonGroup>
          <br />
          <small>&nbsp;</small>
        </>
      ) : (
        ""
      )}
      <div
        style={{
          maxHeight: "55vh",
          overflow: "auto",
          margin: "auto",
          width: "fit-content",
        }}
      >
        <HTMLTable
          bordered={true}
          condensed={true}
          striped={true}
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          {/*<pre>*/}
          {/*  <code>{JSON.stringify(state, null, 2)}</code>*/}
          {/*</pre>*/}
        </HTMLTable>
        <div>
          <div style={{ textAlign: "right" }}>
            <div style={{ display: "inline-block" }}>
              <Pagination {...paginationProps} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { tableName, module } = ownProps;
  const {
    csvUploads: {
      [module]: {
        [tableName]: {
          errorFilters = [],
          filteredData = [],
          data = [],
          fields = [],
          stats = {},
        } = {},
      } = {},
    },
  } = state;
  return {
    data: coalesce([filteredData, data, []]),
    columns: fields,
    stats: stats,
    errorFilters: errorFilters,
  };
};

function BrowserEdiTable({
  data,
  columns,
  tableName,
  dispatch,
  setter,
  stats,
  errorFilters,
  deletes,
  module,
}) {
  const additionalColumns = [];
  if (deletes) {
    additionalColumns.push({
      Header: "Delete",
      accessor: "status",
      Cell: DeleteActionCell,
    });
  }
  const columnsMemo = React.useMemo(
    () => columns.concat(additionalColumns),
    [columns]
  );
  const dataMemo = React.useMemo(() => data, [data]);
  console.log({ dataMemo });
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  setter(() => data);
  React.useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    dispatch(updateCSVRow({ tableName, rowIndex, columnId, value, module }));
  };

  const filterMyData = (errorFilter) => {
    dispatch(toggleFilter({ tableName, errorFilter, module }));
  };

  const deleteRow = (rowIndex) => {
    dispatch(deleteCSVRow({ tableName, rowIndex }));
  };

  const restoreRow = (rowIndex) => {
    dispatch(restoreCSVRow({ tableName, rowIndex }));
  };

  return (
    <Styles>
      <Table
        columns={columnsMemo}
        data={dataMemo}
        hasGroups={true}
        reduxActions={{ updateMyData, filterMyData, deleteRow, restoreRow }}
        filters={errorFilters}
        skipPageReset={skipPageReset}
        stats={stats}
      />
    </Styles>
  );
}

export default connect(mapStateToProps)(BrowserEdiTable);
