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
  Intent,
  Navbar,
  NavbarGroup,
} from "@blueprintjs/core";
import { connect } from "react-redux";
import { updateCSVRow } from "../../../../store/slices/csvUploadSlice.ts";
import { FS, VALIDATIONS } from "./validations";

const intentMap = {
  [FS.WARN]: Intent.WARNING,
  [FS.ERROR]: Intent.DANGER,
};

const Styles = styled.div`
  padding: 1rem;
  width: 100%;
  overflow-x: scroll;

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
      <Navbar minimal style={{ color: Colors.LIGHT_GRAY1, boxShadow: "none" }}>
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
                style={{ fontSize: "0.7em" }}
              >
                {pageSize}
              </option>
            ))}
          </HTMLSelect>
        </NavbarGroup>
        <NavbarGroup>
          <small>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </small>
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
  row: { index },
  column,
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  let validLevel = FS.VALID;
  if (VALIDATIONS[column.validations]) {
    validLevel = VALIDATIONS[column.validations](value);
  }

  const intent = intentMap[validLevel] || Intent.NONE;
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
    <EditableText
      value={value}
      intent={intent}
      onChange={onChange}
      onConfirm={onBlur}
      onEdit={onFocus}
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
  updateMyData,
  skipPageReset,
  fieldMap,
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
      updateMyData,
      fieldMap,
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
  console.log({ columns });
  const headerMap = {};
  const visibilityToolbar = columns.reduce((groups, header) => {
    if (header.columns) {
      groups.push(header);
      headerMap[header.Header] = header.columns;
    }
    return groups;
  }, []);

  useEffect(() => {
    const hiddenHeaders = {};
    let hiddenColumns = [];
    visibilityToolbar.forEach((item) => {
      hiddenHeaders[item.Header] = true;
      console.log({
        headerItem: item,
        cct: item.columns.map((i) => i.accessor),
      });
      hiddenColumns = hiddenColumns.concat(item.columns.map((i) => i.accessor));
    });
    setVisibility({ hiddenHeaders, hiddenColumns });
  }, [visibilityToolbar]);

  const toggleVisibility = (header) => {
    Object.keys(visibility.hiddenHeaders).forEach((k) => {
      visibility.hiddenHeaders[k] = true;
    });
    visibility.hiddenHeaders[header] = !visibility.hiddenHeaders[header];
    let hiddenColumns = [];
    Object.entries(visibility.hiddenHeaders).forEach(([k, v]) => {
      if (v) {
        hiddenColumns = hiddenColumns.concat(
          headerMap[k].map((i) => i.accessor)
        );
      }
    });
    setVisibility({ ...visibility, hiddenColumns });
  };
  useEffect(() => {
    setHiddenColumns(visibility.hiddenColumns);
  }, [visibility]);
  return (
    <div>
      {visibilityToolbar ? (
        <>
          Choose Columns to view:{" "}
          <ButtonGroup>
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
        </>
      ) : (
        ""
      )}
      <div style={{ maxHeight: "55vh", width: "100%", overflow: "scroll" }}>
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
      <div style={{ textAlign: "right" }}>
        <div style={{ display: "inline-block" }}>
          <Pagination {...paginationProps} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { tableName } = ownProps;
  console.log(state, ownProps);
  return {
    data: state.csvUploads.data[tableName] || [],
    columns: state.csvUploads.fields[tableName] || [],
  };
};

function BrowserEdiTable({ data, columns, tableName, dispatch, setter }) {
  const columnsMemo = React.useMemo(() => columns, [columns]);
  const dataMemo = React.useMemo(() => data, [data]);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  setter(() => data);
  React.useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  console.log({ columnsMemo, dataMemo });
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    dispatch(updateCSVRow({ tableName, rowIndex, columnId, value }));
  };
  console.log({ columns });
  return (
    <Styles>
      <Table
        columns={columnsMemo}
        data={dataMemo}
        hasGroups={true}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </Styles>
  );
}

export default connect(mapStateToProps)(BrowserEdiTable);
