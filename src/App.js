import Amplify from "aws-amplify";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Profile from "./components/dashboard/profile/Profile";
import RegisterForm from "./components/dashboard/registerForm/RegisterForm";
import { Invalid } from "./components/invalid";
import { Landing } from "./components/landing";
import { ConfirmForgotPassword } from "./components/signUpLogin/ConfirmForgotPassword";
import { ForgotPassword } from "./components/signUpLogin/ForgotPassword";
import { ConfirmSignUp, Login, SignUp } from "./components/signUpLogin/index";
import CSVUpload from "./components/dashboard/dataUpload/CSVUpload";
import TableView from "./components/dashboard/tabularView/viewTables";
import { history } from "./helpers/history";
import BaseLayout from "./layout/base";

const App = () => {
  useEffect(() => {
    Amplify.configure({
      Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      },
    });
  });

  return (
    <BaseLayout>
      <Router history={history}>
        <br></br>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/confirm-sign-up" element={<ConfirmSignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/confirm-forgot-password"
            element={<ConfirmForgotPassword />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register-form" element={<RegisterForm />} />
          <Route path="/upload" element={<CSVUpload />} />
          <Route path="/view" element={<TableView />} />
          <Route path="*" element={<Invalid />} />
        </Routes>
      </Router>
    </BaseLayout>
  );
};

export default App;
