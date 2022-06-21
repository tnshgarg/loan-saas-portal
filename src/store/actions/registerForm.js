import {
  SET_ADDRESS_FORM,
  SET_ESIC_STATE_FORM,
  SET_PF_FORM,
  SET_TAX_SETUP_FORM,
} from "./types";

export const setAddressForm =
  (company, brand, address, state, pincode) => (dispatch) => {
    const addressFormDetails = {
      company: company,
      brand: brand,
      address: address,
      state: state,
      pincode: pincode,
    };
    dispatch({
      type: SET_ADDRESS_FORM,
      payload: addressFormDetails,
    });
  };

export const setTaxSetupForm = (pan, tan, gstin) => (dispatch) => {
  const taxSetupFormDetails = {
    pan: pan,
    tan: tan,
    gstin: gstin,
  };
  dispatch({
    type: SET_TAX_SETUP_FORM,
    payload: taxSetupFormDetails,
  });
};

export const setPfForm = (pf_username, pf_password) => (dispatch) => {
  const pfFormDetails = {
    pf_username: pf_username,
    pf_password: pf_password,
  };
  dispatch({
    type: SET_PF_FORM,
    payload: pfFormDetails,
  });
};

export const setEsicStateForm =
  (isOther, state, employerCode, password) => (dispatch) => {
    const esicForm = {
      isOther: isOther,
      state: state,
      employerCode: employerCode,
      password: password,
    };
    dispatch({
      type: SET_ESIC_STATE_FORM,
      payload: esicForm,
    });
  };
