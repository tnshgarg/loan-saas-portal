import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

//Components
import Table from "../../../../common/Table";

import EditableDropdown from "./components/EditableDropdown";
import { postRegisterFormData } from "../../../../../services/user.services";
import { getDocumentFromEsicForm } from "../../../../../utils/getDocumentFromState";
import { setEsicStateForm } from "../../../../../store/actions/registerForm";
import { NO_CHANGE_ERROR } from "../../../../../utils/messageStrings";

export default function EsicTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: "State",
        accessor: "state",
        Cell: (props) => <EditableDropdown {...props} />,
      },
      {
        Header: "Establishment Code",
        accessor: "employerCode",
        disableSortBy: true,
      },
      {
        Header: "Password",
        accessor: "password",
        disableSortBy: true,
      },
      {
        Header: "Is Other",
        accessor: "isOther",
      },
    ],
    []
  );
  const dispatch = useDispatch();
  
  const esicForm = useSelector((state) => state.registerForm.esicForm);

  const { jwtToken } =
    useSelector((state) => state.auth.user?.signInUserSession.idToken) ?? "";

  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

  const [data, setData] = React.useState(Object.values(esicForm));
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  const alert = useAlert();

  const initialForm = {
    state: "Andaman and Nicobar",
    isOther: false,
    password: "",
    employerCode: "",
  };

  const inputTypes = {
    employerCode: "text",
    password: "password",
  };

  console.log(data);
  const updateData = (rowIndex, columnId, value) => {
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  React.useEffect(() => {
    setData([...Object.values(esicForm)]);
  }, [esicForm]);

  const handleSubmit = (updatedRow, row, storeData, setEditableRowIndex) => {
    setSkipPageReset(true);
    if (!updatedRow.state || !updatedRow.employerCode || !updatedRow.password) {
      alert.error("Please fill in all the fields");
      return;
    }
    setEditableRowIndex(null);
    let currRow = storeData[updatedRow.state];
    const isNew = row?.original?.isNew;
    const isEqual =
      updatedRow.state === currRow?.state &&
      updatedRow.employerCode === currRow?.employerCode &&
      updatedRow.password === currRow?.password;
    if (!isEqual || isNew) {
      updateData(row.index, "isDisabled", true);
      updateData(row.index, "isNew", false);
      postRegisterFormData(
        jwtToken,
        getDocumentFromEsicForm(
          employerId,
          updatedRow.isOther,
          updatedRow.state,
          updatedRow.employerCode,
          updatedRow.password
        )
      )
        .then((response) => {
          dispatch(
            setEsicStateForm(
              updatedRow.isOther,
              updatedRow.state,
              updatedRow.employerCode,
              updatedRow.password
            )
          );
          const message = response.data.body.message;
          alert.success(message);
        })
        .catch((error) => {
          console.log(error);
          const message = error.response?.data?.message ?? "Some error occured";
          alert.error(message);
        });
    } else {
      alert.error(NO_CHANGE_ERROR);
    }
  };

  const addCallback = () => {
    const newData = [{ ...initialForm, isNew: true, isDisabled: false }].concat(
      data
    );
    setData(newData);
  };

  return (
    <>
      <Table
        columns={columns}
        data={data}
        storeData={esicForm}
        setData={setData}
        handleSubmit={handleSubmit}
        skipPageReset={skipPageReset}
        addCallback={addCallback}
        updateData={updateData}
        initialState={{ hiddenColumns: ["isOther"] }}
        inputTypes={inputTypes}
      />
    </>
  );
}
