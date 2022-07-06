import {
  getAddressForm,
  getCredentialsForm,
  getTaxForm,
} from "../../services/user.services";
import { getMessageFromError } from "../../utils/getMessageFromError";
import {
  SET_ADDRESS_FORM,
  SET_ESIC_STATE_FORM,
  SET_MESSAGE,
  SET_PF_FORM,
  SET_TAX_SETUP_FORM,
} from "./types";

export const getAddressFormAction = () => (dispatch, getState) => {
  const authToken = getState().auth.user?.signInUserSession.idToken.jwtToken;
  const employerId = getState().auth.user?.attributes.sub;
  return getAddressForm(authToken, employerId).then((response) => {
    const addressForm = response.data.body;

    const { company, brand, street, state, pin } = addressForm ?? "";

    dispatch(setAddressForm(company, brand, street, state, pin));
  });
};

export const setAddressForm =
  (company, brand, street, state, pin) => (dispatch) => {
    const addressFormDetails = {
      company: company,
      brand: brand,
      street: street,
      state: state,
      pin: pin,
    };
    dispatch({
      type: SET_ADDRESS_FORM,
      payload: addressFormDetails,
    });
  };

export const getTaxFormAction = () => (dispatch, getState) => {
  const authToken = getState().auth.user?.signInUserSession.idToken.jwtToken;
  const employerId = getState().auth.user?.attributes.sub;
  return getTaxForm(authToken, employerId).then((response) => {
    const taxForm = response.data.body;

    const { pan, tan, gstin } = taxForm ?? "";

    dispatch(setTaxSetupForm(pan, tan, gstin));
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

export const getCredentialsFormAction = (portal) => (dispatch, getState) => {
  const authToken = getState().auth.user?.signInUserSession.idToken.jwtToken;
  const employerId = getState().auth.user?.attributes.sub;
  return getCredentialsForm(authToken, portal, employerId).then((response) => {
    const credentialsForm = response.data.body;
    if (portal === "esic") {
      credentialsForm?.map(
        (value) => {
          const { other, username, password, state } = value ?? "";
          return dispatch(setEsicStateForm(other, state, username, password));
        }
      );

    } else if (portal === "epfo") {
      const { username, password } = credentialsForm ?? "";
      dispatch(setPfForm(username, password));
    }
  });
};

export const setPfForm = (username, password) => (dispatch) => {
  const pfForm = {
    username: username,
    password: password,
  };
  dispatch({
    type: SET_PF_FORM,
    payload: pfForm,
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
