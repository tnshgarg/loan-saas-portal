import { SET_SIMPLIANCE_MINIMUM_WAGES } from "./types";

export const setSimplianceMinimumWages = (stateName, data) => (dispatch) => {
  dispatch({
    type: SET_SIMPLIANCE_MINIMUM_WAGES,
    payload: { stateName: stateName, data: data },
  });
};
