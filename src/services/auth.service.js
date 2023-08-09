import { Auth } from "aws-amplify";

const signUp = (
  username,
  password,
  email,
  phone_number,
  name,
  company_name,
  company_type,
  employee_count,
  designation,
  sales_id
) => {
  if (!phone_number.startsWith("+91")) phone_number = "+91" + phone_number;
  return Auth.signUp({
    username: username,
    password,
    attributes: {
      email,
      phone_number: phone_number,
      name: name,
      "custom:company_name": company_name,
      "custom:company_type": company_type,
      "custom:employee_count": employee_count,
      "custom:designation": designation,
      "custom:sales_id": sales_id,
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

const logout = () => {
  return Auth.signOut();
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  signUp,
  confirmSignUp,
  login,
  forgotPassword,
  confirmForgotPassword,
  logout,
};
