import axios from "axios";
import {
  ADDRESS_FORM_URL,
  CREDENTIALS_FORM_URL,
  REGISTER_FORM_GET_URL,
  REGISTER_FORM_POST_URL,
  TAX_FORM_URL,
} from "../utils/apiUrls";

export const getRegisterFormData = (authToken, employerId) => {
  const options = {
    headers: { Authorization: authToken },
    params: {
      employer_id: employerId,
    },
  };

  return axios.get(REGISTER_FORM_GET_URL, options);
};

export const postRegisterFormData = (authToken, document) => {
  const options = {
    headers: { Authorization: authToken },
  };
  const body = {
    document: document,
  };

  return axios.post(REGISTER_FORM_POST_URL, body, options);
};

export const getAddressForm = (authToken, employerId) => {
  const options = {
    headers: { Authorization: authToken },
    params: {
      id: employerId,
    },
  };
  return axios.get(ADDRESS_FORM_URL, options);
};

export const postAddressForm = (authToken, body) => {
  const options = {
    headers: { Authorization: authToken },
  };

  return axios.post(ADDRESS_FORM_URL, body, options);
};

export const getTaxForm = (authToken, employerId) => {
  const options = {
    headers: { Authorization: authToken },
    params: {
      id: employerId,
    },
  };
  return axios.get(TAX_FORM_URL, options);
};

export const postTaxForm = (authToken, body) => {
  const options = {
    headers: { Authorization: authToken },
  };

  return axios.post(TAX_FORM_URL, body, options);
};

export const getCredentialsForm = (authToken, portal, employerId) => {
  const options = {
    headers: { Authorization: authToken },
    params: {
      id: employerId,
      portal: portal
    },
  };
  return axios.get(CREDENTIALS_FORM_URL, options);
};

export const postCredentialsForm = (authToken, body) => {
  const options = {
    headers: { Authorization: authToken },
  };

  return axios.post(CREDENTIALS_FORM_URL, body, options);
};
