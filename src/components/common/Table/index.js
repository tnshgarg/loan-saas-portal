import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  useRowSelect,
  useSortBy,
  useTable,
  useFilters,
  usePagination,
} from "react-table";
import styled, { css } from "styled-components";

//Components
import EditableCell from "./EditableCell";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UpdateAlert from "../UpdateAlert";
import withUpdateAlert from "../../../hoc/withUpdateAlert";
import UpdateAlertContext from "../../../contexts/updateAlertContext";
import { Icon } from "@blueprintjs/core";

const Table = ({
  columns,
  data,
  handleSubmit,
  updateData,
  skipPageReset,
  defaultColumn,
  addCallback,
  initialState,
  storeData,
  inputTypes,
  setData,
  showPagination,
  handleRowClick,
  filterTypes,
  showEditColumn = true,
  showFilter = false,
  addLabel,
  showAddBtn,
  hoverEffect,
  cellProps = () => ({}),
}) => {
  const [editableRowIndex, setEditableRowIndex] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [currRow, setCurrRow] = React.useState(null);

  const { value, setValue } = useContext(UpdateAlertContext);

  const cancelCallback = (storeData) => {
    setEditableRowIndex(null);
    setData([...data]);
    setData([...Object.values(storeData)]);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
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
      initialState,
      autoResetPage: !skipPageReset,
      handleSubmit,
      updateData,
      editableRowIndex,
      setEditableRowIndex,
      setIsOpen,
      setValue,
      storeData,
      inputTypes,
      filterTypes,
      className: "-striped -highlight",
    },
    showFilter && useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => {
        return [...columns].concat(
          showEditColumn
            ? {
                accessor: "edit",
                id: "edit",
                Header: "Action",
                disableSortBy: true,

                Cell: ({
                  row,
                  column,
                  setEditableRowIndex,
                  setIsOpen,
                  editableRowIndex,
                  storeData,
                  setValue,
                }) => (
                  <Button
                    disabled={
                      editableRowIndex === null
                        ? false
                        : editableRowIndex !== row.index
                    }
                    onClick={() => {
                      const currentIndex = row.index;
                      if (editableRowIndex !== currentIndex) {
                        setEditableRowIndex(currentIndex);
                      } else {
                        setCurrRow(row);
                        const updatedRow = row.values;
                        if (!value.isOpen) {
                          const initialValues = storeData[updatedRow.state];
                          const newValues = { ...updatedRow };
                          delete newValues.isOther;
                          setValue({
                            ...value,
                            isOpen: !value.isOpen,
                            newValues: newValues,
                            initialValues: initialValues,
                            cancelCallback: () => cancelCallback(storeData),
                            onConfirm: () =>
                              handleSubmit(
                                updatedRow,
                                row,
                                storeData,
                                setEditableRowIndex,
                                () => setValue({ ...value, isOpen: false })
                              ),
                          });
                          return;
                        }
                        handleSubmit(
                          updatedRow,
                          row,
                          storeData,
                          setEditableRowIndex,
                          () => setValue({ ...value, isOpen: false })
                        );
                      }
                    }}
                  >
                    {editableRowIndex !== row.index ? "Edit" : "Save"}
                  </Button>
                ),
              }
            : []
        );
      });
    }
  );

  const addhandler = () => {
    setEditableRowIndex(0);
    addCallback();
  };

  return (
    <>
      {showAddBtn && (
        <Button
          onClick={addhandler}
          variant="outlined"
          disabled={editableRowIndex !== null}
          startIcon={<AddCircleIcon />}
        >
          {addLabel ?? "Add"}
        </Button>
      )}
      <Styles hoverEffect={hoverEffect}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <span className="heading">{column.render("Header")}</span>
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
            {(showPagination ? page : rows).map((row, i) => {
              prepareRow(row);
              return (
                <>
                  <tr
                    {...row.getRowProps()}
                    onClick={() => {
                      handleRowClick(row.original);
                    }}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps(cellProps(cell))}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        {showPagination && (
          <div className="pagination">
            <span className="per_page">Rows per page</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <span
              style={{
                marginLeft: "1%",
                marginRight: "0.5%",
                marginTop: "0.2%",
              }}
            >
              Page{" "}
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
            <div className="nav_container">
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                <Icon className="nav_icons" icon="double-chevron-left" />
              </button>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <Icon className="nav_icons" icon="chevron-left" />
              </button>
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                <Icon className="nav_icons" icon="chevron-right" />
              </button>
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <Icon className="nav_icons" icon="double-chevron-right" />
              </button>
            </div>
            <span
              style={{
                marginLeft: "0.5%",
                marginRight: "0.5%",
              }}
            >
              Go to page:
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: "50px" }}
              />
            </span>
          </div>
        )}
        <UpdateAlert />
      </Styles>
    </>
  );
};

export default withUpdateAlert(Table);

Table.defaultProps = {
  defaultColumn: {
    Cell: EditableCell,
  },
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  skipPageReset: PropTypes.bool.isRequired,
};

const Styles = styled.div`
  padding: 1rem;
  height: 400px;
  table {
    width: 100%;
    border-spacing: 0;
    position: relative;
    border-collapse: collapse;
    tbody {
      height: calc(100vh - 400px);
      // display: block;
      overflow: scroll;
    }
    thead, tbody tr {
      // display: table;
    }
    tr {
      cursor: pointer;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th {
      color: rgba(0, 0, 0, 0.87);
      font-weight: 500;
      background: white;
      position: sticky;
      top: -24px;
      box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
      .heading {
        white-space: normal !important;
        // text-overflow: ellipsis;
        overflow: visible;
        width: 78%;
        display: inline-block;
      }
    }
    th,
    td {
      white-space: normal !important;
      overflow: visible;
      margin: 0;
      padding: 0.5rem;
      p {
        margin-bottom: 0px;
      }
      :last-child {
        border-right: 0;
      }
      input {
        width: 100%;
      }
      .other-form-input {
        margin-top: 15px;
      }
    }
  }
  .pagination {
    color: rgba(0, 0, 0, 0.54) !important;
    justify-content: flex-end;
    padding: 1rem 0.5rem;
    align-items: center;
    .per_page {
      margin: 0px 4px;
    }
    select {
      cursor: pointer;
      height: 24px;
      max-width: 100%;
      user-select: none;
      padding-left: 8px;
      padding-right: 5px;
      box-sizing: content-box;
      font-size: inherit;
      color: inherit;
      border: none;
      background-color: transparent;
      direction: ltr;
      flex-shrink: 0;
    }
    .nav_container {
      margin: 0px 10px;
    }
    .down_icon {
      padding-right: 5px;
    }
    button {
      outline: none;
      border: 0px;
      .nav_icons {
        padding: 0px 5px;
      }
    }
    input {
      border: 1px solid rgba(0, 0, 0, 0.3);
      margin-left: 5px;
      padding: 2px 5px;
      text-align: center;
    }
  }
`;
