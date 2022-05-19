import {
  SET_ADDRESS_FORM,
  SET_ESIC_STATE_FORM,
  SET_PF_FORM,
  SET_REGISTER_FORM_TAB_VALUE,
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

export const setTaxSetupForm =
  (company_pan, company_tan, company_gstin) => (dispatch) => {
    const taxSetupFormDetails = {
      company_pan: company_pan,
      company_tan: company_tan,
      company_gstin: company_gstin,
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
  (esic_state, esic_other_state, esic_employer_code, esic_password) =>
  (dispatch) => {
    const esicFormDetails = {
      esic_state: esic_state,
      esic_other_state: esic_other_state,
      esic_employer_code: esic_employer_code,
      esic_password: esic_password,
    };
    dispatch({
      type: SET_ESIC_STATE_FORM,
      payload: esicFormDetails,
    });
  };

export const setRegisterFormTabValue = (tabValue) => (dispatch) => {
  const tabValueDetails = {
    tabValue: tabValue,
  };
  dispatch({
    type: SET_REGISTER_FORM_TAB_VALUE,
    payload: tabValueDetails,
  });
};
