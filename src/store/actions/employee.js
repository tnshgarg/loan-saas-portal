import { SET_EMPLOYEE_DATA, UPDATE_EMPLOYEE_DATA } from "./types";

export const setEmployeeData = (employeeData) => (dispatch) => {
  dispatch({
    type: SET_EMPLOYEE_DATA,
    payload: employeeData,
  });
};

export const updateEmployeeDataAndSetEdits =
  (uniqueId, columnToChange, valueToChangeWith) => (dispatch) => {
    const updatedEmployeeDetails = {
      uniqueId: uniqueId,
      columnToChange: columnToChange,
      valueToChangeWith: valueToChangeWith,
    };
    dispatch({
      type: UPDATE_EMPLOYEE_DATA,
      payload: updatedEmployeeDetails,
    });
  };
