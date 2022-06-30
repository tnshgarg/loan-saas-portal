import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import registerForm from "./registerForm";
import employee from "./employee";

export default combineReducers({
  auth,
  message,
  registerForm,
  employee,
});
