import axios from "axios";
import {
  REGISTER_FORM_GET_URL,
  REGISTER_FORM_POST_URL,
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
