import Amplify from "aws-amplify";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Profile from "./components/dashboard/profile/Profile";
import RegisterForm from "./components/dashboard/registerForm/RegisterForm";

import { Invalid } from "./components/invalid";
import { Landing } from "./components/landing";
import { ConfirmForgotPassword } from "./components/signUpLogin/ConfirmForgotPassword";
import { ForgotPassword } from "./components/signUpLogin/ForgotPassword";
import { ConfirmSignUp, Login, SignUp } from "./components/signUpLogin/index";
import Onboard from "./components/dashboard/employee/Onboard";
import { TabularView } from "./components/dashboard/employee/TabularView";

import { history } from "./helpers/history";
import BaseLayout from "./layout/base";


const App = () => {
  useEffect(() => {
    Amplify.configure({
      Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
      }
    });
  });

  return (
    <Router history={history}>
      <BaseLayout>
        <br />
        <br />
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
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/register-form" element={<RegisterForm />} />
          <Route path="/employees/onboard" element={<Onboard />} />
          <Route path="/employees/dashboard" element={<TabularView />} />
          <Route path="*" element={<Invalid />} />
        </Routes>
      </BaseLayout>
    </Router>

  );
};

export default App;
