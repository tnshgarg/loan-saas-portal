import Amplify from "aws-amplify";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
// import Navbar from "./components/dashboard/Navbar";
import Profile from "./components/dashboard/Profile";
import ConfirmSignUp from "./components/signUpLogin/ConfirmSignUp";
import Login from "./components/signUpLogin/Login";
import SignUp from "./components/signUpLogin/SignUp";
import { history } from "./helpers/history";

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
    <Router history={history}>
      <br></br>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/confirm-sign-up" element={<ConfirmSignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/test-screen" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
