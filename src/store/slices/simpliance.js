import { SET_SIMPLIANCE_MINIMUM_WAGES } from "../actions/types";

export const setSimplianceMinimumWages = (stateName, data) => (dispatch) => {
  dispatch({
    type: SET_SIMPLIANCE_MINIMUM_WAGES,
    payload: { stateName: stateName, data: data },
  });
};
