import { Auth } from "aws-amplify";

const signUp = (
  username,
  password,
  email,
  phone_number,
  name,
  company_name,
  no_of_employees,
  title
) => {
  return Auth.signUp({
    username: username,
    password,
    attributes: {
      email,
      phone_number: phone_number,
      name: name,
      "custom:company_name": company_name,
      "custom:no_of_employees": no_of_employees,
      "custom:title": title,
    },
  });
};

const confirmSignUp = (username, code) => {
  return Auth.confirmSignUp(username, code);
};

const login = (username, password) => {
  return Auth.signIn({
    username: username,
    password,
  });
};

const forgotPassword = (username) => {
  return Auth.forgotPassword(username);
};

const confirmForgotPassword = (username, code, password) => {
  return Auth.forgotPasswordSubmit(username, code, password);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  signUp,
  confirmSignUp,
  login,
  forgotPassword,
  confirmForgotPassword,
};
