import { SET_EMPLOYEE_DATA, UPDATE_EMPLOYEE_DATA } from "../actions/types";

const initialState = {
  employeeData: {},
  employeeEdits: {},
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_EMPLOYEE_DATA:
      return {
        ...state,
        employeeData: payload,
      };
    case UPDATE_EMPLOYEE_DATA:
      return {
        ...state,
        employeeData: {
          ...state.employeeData,
          [payload.uniqueId]: {
            ...state.employeeData[payload.uniqueId],
            [payload.columnToChange]: payload.valueToChangeWith,
          },
        },
        employeeEdits: {
          ...state.employeeEdits,
          [payload.uniqueId]: {
            ...state.employeeEdits[payload.uniqueId],
            [payload.columnToChange]: payload.valueToChangeWith,
          },
        },
      };
    default:
      return state;
  }
}
