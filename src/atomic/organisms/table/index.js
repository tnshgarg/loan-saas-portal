import PropTypes from "prop-types";
import React, { useContext } from "react";
import {
  useFilters,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import styled from "styled-components";

//Components
import { Button, Intent } from "@blueprintjs/core";
import TableFilter from "react-table-filter";
import "react-table-filter/lib/styles.css";
import UpdateAlert from "../../../components/common/UpdateAlert";
import UpdateAlertContext from "../../../contexts/updateAlertContext";
import withUpdateAlert from "../../../hoc/withUpdateAlert";
import { getExcel } from "../../../utils/excelHandling";
import { Pagination } from "../csvUploads/BrowserEdiTable";
import EditableCell from "./EditableCell";

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
  showDownload = false,
  cellProps = () => ({}),
  handlers,
  noDataComponent,
}) => {
  const [editableRowIndex, setEditableRowIndex] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [currRow, setCurrRow] = React.useState(null);
  const [filteredData, setFilteredData] = React.useState([]);
  const filterRef = React.useRef(null);

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
      data: filteredData,
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

  React.useEffect(() => {
    showFilter && filterRef?.current?.reset(data, true);
    setFilteredData(data);
  }, [data]);

  const updateFilterHandler = (newData, filterConfiguration) => {
    console.log({ filterConfiguration });
    setFilteredData(newData);
  };

  const addhandler = () => {
    setEditableRowIndex(0);
    addCallback();
  };

  if (handlers) {
    handlers["download-excel"] = () => {
      getExcel(
        headerGroups,
        rows.map((row) => row.original)
      );
    };
  }

  const HeaderRowWrapper = React.useCallback(
    ({ children, ...rest }) => {
      return showFilter ? (
        <TableFilter
          {...rest}
          style={{ color: "black" }}
          rows={data}
          onFilterUpdate={updateFilterHandler}
          ref={filterRef}
        >
          {children}
        </TableFilter>
      ) : (
        <tr {...rest}>{children}</tr>
      );
    },
    [showFilter]
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
  return (
    <>
      {showAddBtn && (
        <Button
          onClick={addhandler}
          minimal
          disabled={editableRowIndex !== null}
          icon={"add"}
        >
          {addLabel ?? "Add"}
        </Button>
      )}
      <Styles hoverEffect={hoverEffect}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <HeaderRowWrapper {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} filterkey={column.id}>
                    <span className="heading">{column.render("Header")}</span>
                  </th>
                ))}
              </HeaderRowWrapper>
            ))}
          </thead>

          {!(showPagination ? page : rows).length &&
            noDataComponent &&
            noDataComponent()}

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
                    id={row.getRowProps().key}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          id={cell.getCellProps().key}
                          {...cell.getCellProps(cellProps(cell))}
                        >
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
          <div className={"pagination"}>
            <div style={{ textAlign: "right" }}>
              <div style={{ display: "inline-block" }}>
                <Pagination {...paginationProps} />
              </div>
            </div>
          </div>
        )}
        {showDownload && (
          <Button
            intent={Intent.SUCCESS}
            text="Download Excel"
            onClick={getExcel}
          />
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
  noDataComponent: () => {},
};

const Styles = styled.div`
  padding: 1rem;
  overflow: auto;
  thead {
    position: sticky;
    top: 0px;
  }
  table {
    width: 100%;
    border-spacing: 0;
    position: relative;
    overflow: auto;
    height: 100%;
    display: block;
    border-collapse: collapse;
    height: 55vh;
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
      box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
      .heading {
        white-space: nowrap !important;
        overflow: visible;
        width: 78%;
        display: inline-block;
      }
    }
    th,
    td {
      white-space: normal !important;
      margin: 0;
      padding: 0.5rem 2rem;
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
    text-align: right;
    color: rgba(0, 0, 0, 0.54) !important;
    padding: 1em 0.5em;
  }
`;
