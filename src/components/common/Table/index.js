import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useRowSelect, useSortBy, useTable } from "react-table";
import styled from "styled-components";

//Components
import EditableCell from "./EditableCell";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UpdateAlert from "../UpdateAlert";
import withUpdateAlert from "../../../hoc/withUpdateAlert";
import UpdateAlertContext from "../../../contexts/updateAlertContext";

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
}) => {
  const [editableRowIndex, setEditableRowIndex] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [currRow, setCurrRow] = React.useState(null);

  const { value, setValue } = useContext(UpdateAlertContext);

  const cancelCallback = () => {
    setEditableRowIndex(null);
    setData([...data]);
  };

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
        setValue,
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
                          cancelCallback,
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
