import { getMessageFromError } from "../../helpers/getMessageFromError";
import AuthService from "../../services/auth.service";
import {
  CLEAR_MESSAGE,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_MESSAGE,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
} from "./types";

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
        dispatch({
          type: SIGNUP_SUCCESS,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.user.username,
        });
        return Promise.resolve();
      },
      (error) => {
        dispatch({
          type: SIGNUP_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: getMessageFromError(error),
        });
        return Promise.reject();
      }
    );
  };

export const confirmSignUp = (username, code) => (dispatch) => {
  return AuthService.confirmSignUp(username, code).then(
    (response) => {
      dispatch({
        type: SIGNUP_SUCCESS,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: response,
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: SIGNUP_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: getMessageFromError(error),
      });
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
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
      return Promise.resolve(loginData);
    },
    (error) => {
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: getMessageFromError(error),
      });
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  // AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: CLEAR_MESSAGE,
  });
};

export const forgotPassword = (username) => (dispatch) => {
  return AuthService.forgotPassword(username).then(
    (response) => {
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: username,
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: getMessageFromError(error),
      });
      return Promise.reject();
    }
  );
};

export const confirmForgotPassword =
  (username, code, password) => (dispatch) => {
    return AuthService.confirmForgotPassword(username, code, password).then(
      (response) => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response,
        });
        return Promise.resolve();
      },
      (error) => {
        dispatch({
          type: FORGOT_PASSWORD_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: getMessageFromError(error),
        });
        return Promise.reject();
      }
    );
  };
