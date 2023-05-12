import {
  HTMLTable,
  NonIdealState,
} from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import { usePagination, useTable } from "react-table";


import PerfectScrollbar from "react-perfect-scrollbar";

import { EditableCell } from "./cells"
import { Pagination } from "./pagination"
import { ColumnFilter } from "./filter";
import { ErrorFiltersToolbar } from "./errorFilterToolbar";
import { HeaderGroupsToolbar } from "./headerGroupsToolbar";

const DEFAULT_HANDLER = () => { }


// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};


export function Table({
  columns,
  data,
  hasData,
  tableActions,
  errorFilters,
  dataFilters,
  skipPageReset,
  fieldMap,
  stats,
  disableEdits,
  onRowClick,
}) {
  // Use the state and functions returned from useTable to build your UI
  console.log("TableData", data)
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
      ...tableActions,
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
  let rowCursor = { "cursor": "crosshair" }
  if (onRowClick) {
    rowCursor = { cursor: "pointer" }
  }
  onRowClick = onRowClick || DEFAULT_HANDLER;
  // Render the UI for your table
  const [visibility, setVisibility] = useState({
    hiddenHeaders: {},
    hiddenColumns: [],
  });
  const headerMap = {};
  const headerGroupSelectors = columns.reduce((groups, header) => {
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
    headerGroupSelectors.forEach((item) => {
      hiddenHeaders[item.Header] = true;
      hiddenColumns = hiddenColumns.concat(item.columns.map((i) => i.accessor));
    });
    hiddenHeaders["All"] = false;
    setVisibility({ hiddenHeaders, hiddenColumns });
  }, [JSON.stringify(headerGroupSelectors)]);

  const toggleVisibility = (header) => {
    Object.keys(visibility.hiddenHeaders).forEach((k) => {
      visibility.hiddenHeaders[k] = true;
    });
    visibility.hiddenHeaders[header] = false;
    let hiddenColumns = [];
    if (header !== "All") {
      Object.entries(visibility.hiddenHeaders).forEach(([k, v]) => {
        if (v && k !== "All") {
          hiddenColumns = hiddenColumns.concat(
            headerMap[k].map((i) => i.accessor)
          );
        }
      });
    }

    setVisibility({ ...visibility, hiddenColumns });
    setHiddenColumns(hiddenColumns);
  };
  console.log({ page })

  let emptyDescription = "";
  if (hasData) {
    emptyDescription = (
      <div>
        Table Has no entries
        <br />or<br />
        current filters have no data.
        <a style={{ "display": "inline" }} onClick={() => tableActions.clearFilters()}>  Try Clearing Filters ?</a>
      </div>
      )
  } else {
    emptyDescription = (
      "No data present on server, try refreshing"
    )
  }
  return (
    <div>
      <ErrorFiltersToolbar stats={stats} tableActions={tableActions} filters={errorFilters || []} />
      <HeaderGroupsToolbar headerGroups={headerGroupSelectors} visibility={visibility} onToggle={toggleVisibility} />
      <PerfectScrollbar>
        <HTMLTable
          bordered={true}
          condensed={true}
          striped={true}
          {...getTableProps()}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} >
                    <div style={{ position: "relative", paddingRight: "2em" }}>
                      {column.render("Header")}
                      <ColumnFilter
                        header={column.Header}
                        filters={dataFilters[column.id]}
                        onFilter={(filterState) => tableActions.updateDataFilters(column.id, filterState)}
                      />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} style={rowCursor} onClick={() => onRowClick(row)}>
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
      </PerfectScrollbar>
      {!page.length ? (
        <NonIdealState
          icon={hasData ? "th-filtered" : "th-disconnect"}
          title={"No Rows to Show"}
          description={emptyDescription}
          layout={"vertical"}
        />
      )
        : (
          <div>
            <div style={{ textAlign: "right" }}>
              <div style={{ display: "inline-block" }}>
                <Pagination {...paginationProps} />
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}