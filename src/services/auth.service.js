import { Auth } from "aws-amplify";

const register = (
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

const confirmSignUp = (email, code) => {
  return Auth.confirmSignUp(email, code);
};

const login = (username, password) => {
  return Auth.signIn({
    username: username,
    password,
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  confirmSignUp,
  login,
  logout,
};
