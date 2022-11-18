import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePagination, useTable } from "react-table";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Colors,
  ControlGroup,
  EditableText,
  HTMLSelect,
  HTMLTable,
  Icon,
  InputGroup,
  Intent,
  Navbar,
  NavbarGroup,
  Tag,
  Text,
} from "@blueprintjs/core";
import { connect } from "react-redux";

import {
  FS,
  VALIDATIONS,
} from "../../../components/dashboard/employee/onboarding/validations";
import { coalesce } from "../../../utils/array";
import {
  deleteCSVRow,
  deselectCSVRow,
  restoreCSVRow,
  selectCSVRow,
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

export function Pagination({
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
            {[3, 10, 20, 30, 40, 50].map((pageSize) => (
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
              <strong>
                <ControlGroup>
                  <Text>&nbsp;&nbsp; Page &nbsp;&nbsp; </Text>
                  <InputGroup
                    type={"text"}
                    style={{ width: "2em", height: "1.3em", display: "inline" }}
                    placeholder={pageIndex + 1}
                    onBlur={(e) => {
                      console.log(e);
                      gotoPage(parseInt(e.target.value) - 1);
                    }}
                    rightElement={<span></span>}
                  />
                  <Text>&nbsp;&nbsp; of {pageOptions.length}</Text>
                </ControlGroup>
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
  row: { index, values },
  column,
  updateMyData,
  disableEdits,
}) => {
  let isDeleted = false;
  if (values.status) isDeleted = values.status[FS.DELETED];
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
          disabled={disableEdits}
          placeholder={disableEdits ? "" : null}
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

const DeleteActionCell = ({
  row: {
    index,
    values: { status },
  },
  deleteRow,
  restoreRow,
}) => {
  const onClick = () => {
    if (status[FS.DELETED]) {
      restoreRow(index);
    } else {
      deleteRow(index);
    }
  };
  return (
    <div style={{ textAlign: "center", padding: 0, margin: 0 }}>
      <Icon
        minimal
        icon={status[FS.DELETED] ? "undo" : "trash"}
        onClick={onClick}
        color={Colors.GRAY1}
      />
    </div>
  );
};

const SelectActionCell = ({
  row: {
    index,
    values: { status },
  },
  selectRow,
  deselectRow,
}) => {
  const onChange = () => {
    if (status[FS.SELECTED]) {
      deselectRow(index);
    } else {
      selectRow(index);
    }
  };
  return (
    <div style={{ textAlign: "center", padding: 0, margin: 0 }}>
      <Checkbox
        minimal={true}
        disabled={status[FS.DELETED]}
        checked={status[FS.SELECTED]}
        onChange={onChange}
      />
    </div>
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
  disableEdits,
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
      disableEdits,
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
          width: "100%",
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
      </div>
      <div>
        <div style={{ textAlign: "right" }}>
          <div style={{ display: "inline-block" }}>
            <Pagination {...paginationProps} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const CSVUploadsStateMapper = (state, ownProps) => {
  const { tableName, module } = ownProps;
  console.log({ tableName, module });
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
  selection,
  module,
  disableEdits,
}) {
  console.log(tableName);
  const prefixColumns = [],
    suffixColumns = [];
  if (deletes) {
    suffixColumns.push({
      Header: "Delete",
      accessor: "status",
      Cell: DeleteActionCell,
    });
  }

  if (selection) {
    prefixColumns.push({
      Header: "Select",
      accessor: "status-s",
      Cell: SelectActionCell,
    });
  }

  const columnsMemo = React.useMemo(
    () => prefixColumns.concat(columns).concat(suffixColumns),
    [columns]
  );
  const dataMemo = React.useMemo(() => data, [data]);
  console.log({ dataMemo });
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  if (setter) setter(() => data);
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
    dispatch(deleteCSVRow({ tableName, rowIndex, module }));
  };

  const restoreRow = (rowIndex) => {
    dispatch(restoreCSVRow({ tableName, rowIndex, module }));
  };

  const selectRow = (rowIndex) => {
    dispatch(selectCSVRow({ tableName, rowIndex, module }));
  };

  const deselectRow = (rowIndex) => {
    dispatch(deselectCSVRow({ tableName, rowIndex, module }));
  };
  let empty = false;
  if (!data || !data.length) {
    empty = true;
  }
  return (
    <Styles>
      {empty ? (
        ""
      ) : (
        <Table
          columns={columnsMemo}
          data={dataMemo}
          hasGroups={true}
          reduxActions={{
            updateMyData,
            filterMyData,
            deleteRow,
            restoreRow,
            selectRow,
            deselectRow,
          }}
          filters={errorFilters}
          skipPageReset={skipPageReset}
          stats={stats}
          disableEdits={disableEdits}
        />
      )}
    </Styles>
  );
}

export default connect(CSVUploadsStateMapper)(BrowserEdiTable);
