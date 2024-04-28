import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  employeeData: {},
  employeeEdits: {},
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployeeDataReducer: (state, action) => {
      state.employeeData = action.payload;
    },
    updateEmployeeDataReducer: (state, action) => {
      const { uniqueId, columnToChange, valueToChangeWith } = action.payload;
      state.employeeData[uniqueId][columnToChange] = valueToChangeWith;
      state.employeeEdits[uniqueId][columnToChange] = valueToChangeWith;
    },
  },
});

export const { setEmployeeDataReducer, updateEmployeeDataReducer } =
  employeeSlice.actions;

export const setEmployeeData = (employeeData) => (dispatch) => {
  dispatch(setEmployeeDataReducer(employeeData));
};

export const updateEmployeeDataAndSetEdits =
  (uniqueId, columnToChange, valueToChangeWith) => (dispatch) => {
    const updatedEmployeeDetails = {
      uniqueId: uniqueId,
      columnToChange: columnToChange,
      valueToChangeWith: valueToChangeWith,
    };
    dispatch(updateEmployeeDataReducer(updatedEmployeeDetails));
  };

export default employeeSlice.reducer;
