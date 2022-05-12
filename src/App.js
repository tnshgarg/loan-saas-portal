import Amplify from "aws-amplify";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ConfirmSignUp from "./components/ConfirmSignUp";
import Register from "./components/Register";
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
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-sign-up" element={<ConfirmSignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
