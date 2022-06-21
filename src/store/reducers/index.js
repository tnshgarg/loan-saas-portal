import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import registerForm from "./registerForm";
export default combineReducers({
  auth,
  message,
  registerForm,
});
