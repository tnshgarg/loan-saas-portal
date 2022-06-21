import {
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
} from "../actions/types";
const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
