import { createSlice } from "@reduxjs/toolkit";
import { getMessageFromError } from "../../utils/getMessageFromError";
import AuthService from "../../services/auth.service";
import { clearMessage, setMessage } from "./messageSlice";

const AUTH_STORAGE_KEY = "cognitoSession";

function getLocalAuth() {
  let localAuth = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) ?? "{}");
  if (Date.now() > localAuth.user?.expiry) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return {};
  }
  return localAuth;
}

const initialState = {
  isLoggedIn: false,
  user: null,
  ...getLocalAuth(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.isLoggedIn = !!action.payload;
      state.user = action.payload ? action.payload.user : null;
      if (state.user) {
        state.user.expiry =
          state.user?.signInUserSession.idToken.payload.exp * 1000;
        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({
            ...state,
          })
        );
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
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
    employee_count,
    designation
  ) =>
  (dispatch) => {
    return AuthService.signUp(
      username,
      password,
      email,
      phone_number,
      name,
      company_name,
      employee_count,
      designation
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
  AuthService.logout().then(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    dispatch(setLoggedInUser(null));
    dispatch(clearMessage());
  });
};

export const forgotPassword = (username) => (dispatch) => {
  return AuthService.forgotPassword(username).then(
    () => {
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
