import axios from "axios";
import { TABULAR_CRUD_API_URL } from "../helpers/apiUrls";

export const postEmployeeData = (authToken, employeeData) => {
  const options = {
    headers: { Authorization: authToken },
  };
  const body = employeeData;

  return axios.post(TABULAR_CRUD_API_URL, body, options);
};
