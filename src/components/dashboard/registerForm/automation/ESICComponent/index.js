import React from "react";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";

//Components
import Table from "../../../../common/Table";

import EditableDropdown from "./EditableDropdown";
import {
  NO_CHANGE_ERROR,
  VALUES_UPDATED,
} from "../../../../../utils/messageStrings";
import {
  useGetEmployerCredentialsByIdQuery,
  useUpdateEmployerCredentialsMutation,
} from "../../../../../store/slices/apiSlices/employer/credentialsApiSlice";

export default function ESICComponent() {
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

  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

  const responseFromQuery = useGetEmployerCredentialsByIdQuery({
    employerId,
    portal: "esic",
  });
  const { data: responseData } = responseFromQuery;

  const [updateEmployerCredentials] = useUpdateEmployerCredentialsMutation();
  const [esicForm, setEsicForm] = React.useState({});
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
    employerCode: {
      type: "text",
      pattern: "[0-9]+",
    },
    password: {
      type: "password",
    },
  };

  React.useEffect(() => {
    setData([...Object.values(esicForm)]);
  }, [esicForm]);

  React.useEffect(() => {
    generateEsicFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  const generateEsicFormData = () => {
    console.log(responseData);
    if (!responseData) return;
    const { body } = responseData;
    let esicData = {};
    body?.forEach((value, index) => {
      esicData = {
        ...esicData,
        [value.state]: {
          ...value,
          isOther: value.other,
          employerCode: value.username,
        },
      };
    });
    setEsicForm(esicData);
  };

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

  const handleSubmit = (
    updatedRow,
    row,
    storeData,
    setEditableRowIndex,
    callback
  ) => {
    setSkipPageReset(true);
    if (!updatedRow.state || !updatedRow.employerCode || !updatedRow.password) {
      alert.error("Please fill in all the fields");
      return;
    }
    var checkNumber = new RegExp(/^[0-9]+$/);
    if (!checkNumber.test(updatedRow.employerCode)) {
      alert.error("Please input valid Employer Code");
      callback && callback();
      return;
    }
    let currRow = storeData[updatedRow.state];
    const isNew = row?.original?.isNew;
    setEditableRowIndex(null);
    const isEqual =
      updatedRow.state === currRow?.state &&
      updatedRow.employerCode === currRow?.employerCode &&
      updatedRow.password === currRow?.password;
    if (!isEqual || isNew) {
      updateData(row.index, "isDisabled", true);
      updateData(row.index, "isNew", false);
      updateEmployerCredentials({
        id: employerId,
        other: updatedRow.isOther,
        state: updatedRow.state,
        username: updatedRow.employerCode,
        password: updatedRow.password,
        portal: "esic",
      })
        .then(() => {
          callback && callback();
          alert.success(VALUES_UPDATED);
        })
        .catch((error) => {
          console.log(error);
          const message = error.response?.data?.message ?? "Some error occured";
          alert.error(message);
        });
    } else {
      callback && callback();
      setEditableRowIndex(null);
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
        addLabel={'Add Another State'}
        showAddBtn={true}
      />
    </>
  );
}
