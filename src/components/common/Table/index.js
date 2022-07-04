import React from "react";
import PropTypes from "prop-types";
import { useRowSelect, useSortBy, useTable } from "react-table";
import { Alert, Intent } from "@blueprintjs/core";
import styled from "styled-components";

//Components
import EditableCell from "./components/EditableCell";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
}) => {
  const [editableRowIndex, setEditableRowIndex] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [currRow, setCurrRow] = React.useState(null);

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable(
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
        storeData,
        inputTypes,
      },
      useSortBy,
      useRowSelect,
      (hooks) => {
        hooks.allColumns.push((columns) => {
          return [
            ...columns,
            {
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
                      const isNew = row?.original?.isNew;
                      const stateExist = Object.keys(storeData).findIndex(
                        (state) => updatedRow.state === state
                      );
                      if (isNew && stateExist > -1 && !isOpen) {
                        setIsOpen(true);
                        return;
                      }
                      handleSubmit(
                        updatedRow,
                        row,
                        storeData,
                        setEditableRowIndex,
                      );
                    }
                  }}
                >
                  {editableRowIndex !== row.index ? "Edit" : "Save"}
                </Button>
              ),
            },
          ];
        });
      }
    );

  const addhandler = () => {
    setEditableRowIndex(0);
    addCallback();
  };

  const toggleAlert = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        onClick={addhandler}
        variant="outlined"
        disabled={editableRowIndex !== null}
        startIcon={<AddCircleIcon />}
      >
        Add another State
      </Button>
      <Styles>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
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
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <>
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        <Alert
          cancelButtonText="Cancel"
          confirmButtonText={`Confirm`}
          icon="trash"
          intent={Intent.WARNING}
          isOpen={isOpen}
          onCancel={toggleAlert}
          onConfirm={() =>
            handleSubmit(
              currRow.values,
              currRow,
              storeData,
              setEditableRowIndex,
              () => setIsOpen(false)
            )
          }
        >
          <p>
            Are you sure you want to update <b>{currRow?.values?.state}</b>
          </p>
        </Alert>
      </Styles>
    </>
  );
};

export default Table;

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

  table {
    width: 100%;
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
      input {
        width: 100%;
      }
      .other-form-input {
        margin-top: 15px;
      }
    }
  }
  .pagination {
    padding: 0.5rem;
  }
`;
