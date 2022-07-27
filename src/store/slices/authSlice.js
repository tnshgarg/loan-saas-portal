import { createSlice } from "@reduxjs/toolkit";
import { getMessageFromError } from "../../utils/getMessageFromError";
import AuthService from "../../services/auth.service";
import { clearMessage, setMessage } from "./messageSlice";
const initialState = {
  isLoggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.isLoggedIn = action.payload ? true : false;
      state.user = action.payload ? action.payload.user : null;
    },
  },
});

export const { setLoggedInUser } = authSlice.actions;

export const registerUser =
  (
    username,
    password,
    email,
    phone_number,
    name,
    company_name,
    no_of_employees,
    title
  ) =>
  (dispatch) => {
    return AuthService.signUp(
      username,
      password,
      email,
      phone_number,
      name,
      company_name,
      no_of_employees,
      title
    ).then(
      (response) => {
        dispatch(setLoggedInUser(null));
        dispatch(setMessage(response.user.username));
        return Promise.resolve();
      },
      (error) => {
        dispatch(setLoggedInUser(null));
        dispatch(setMessage(getMessageFromError(error)));
        return Promise.reject();
      }
    );
  };

export const confirmSignUp = (username, code) => (dispatch) => {
  return AuthService.confirmSignUp(username, code).then(
    (response) => {
      dispatch(setLoggedInUser(null));
      dispatch(setMessage(response));
      return Promise.resolve();
    },
    (error) => {
      dispatch(setLoggedInUser(null));
      dispatch(setMessage(getMessageFromError(error)));
      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      const loginData = {
        authToken: data.signInUserSession.idToken.jwtToken,
        employerId: data.attributes.sub,
      };
      dispatch(setLoggedInUser({ user: data }));
      return Promise.resolve(loginData);
    },
    (error) => {
      dispatch(setLoggedInUser(null));
      dispatch(setMessage(getMessageFromError(error)));
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch(setLoggedInUser(null));
  dispatch(clearMessage());
};

export const forgotPassword = (username) => (dispatch) => {
  return AuthService.forgotPassword(username).then(
    (response) => {
      dispatch(setLoggedInUser(null));
      dispatch(setMessage(username));
      return Promise.resolve();
    },
    (error) => {
      dispatch(setLoggedInUser(null));
      dispatch(setMessage(getMessageFromError(error)));
      return Promise.reject();
    }
  );
};

export const confirmForgotPassword =
  (username, code, password) => (dispatch) => {
    return AuthService.confirmForgotPassword(username, code, password).then(
      (response) => {
        dispatch(setLoggedInUser(null));
        dispatch(setMessage(getMessageFromError(response)));
        return Promise.resolve();
      },
      (error) => {
        dispatch(setLoggedInUser(null));
        dispatch(setMessage(getMessageFromError(error)));
        return Promise.reject();
      }
    );
  };

export default authSlice.reducer;
