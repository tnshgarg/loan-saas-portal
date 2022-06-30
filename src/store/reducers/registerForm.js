import {
  SET_ADDRESS_FORM,
  SET_ESIC_STATE_FORM,
  SET_PF_FORM,
  SET_TAX_SETUP_FORM,
} from "../actions/types";
const initialState = {
  addressFormDetails: null,
  taxSetupFormDetails: null,
  pfForm: null,
  esicForm: {},
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ADDRESS_FORM:
      return {
        ...state,
        addressFormDetails: payload,
      };
    case SET_TAX_SETUP_FORM:
      return {
        ...state,
        taxSetupFormDetails: payload,
      };
    case SET_PF_FORM:
      return {
        ...state,
        pfForm: payload,
      };
    case SET_ESIC_STATE_FORM:
      return {
        ...state,
        esicForm: {
          ...state.esicForm,
          [payload.state]: payload,
        },
      };
    default:
      return state;
  }
}
