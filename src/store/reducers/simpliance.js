import { SET_SIMPLIANCE_MINIMUM_WAGES } from "../actions/types";

const initialState = {
  minWages: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SIMPLIANCE_MINIMUM_WAGES:
      return {
        ...state,
        minWages: {
          ...state.minWages,
          [payload.stateName]: payload.data,
        },
      };
    default:
      return state;
  }
}
