import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Card, Elevation } from "@blueprintjs/core";
import Navbar from "../navbarMainComponent/Navbar";
import { Tabs, Tab } from "@blueprintjs/core";
import {
  AddressForm,
  AutomationForm,
  TaxSetupForm,
} from "./registerFormTabs/index";
import { setRegisterFormTabValue } from "../../../store/actions/registerForm";

const REGISTER_FORM_CARD_STYLING = {
  width: "70%",
  marginRight: "auto",
  marginLeft: "auto",
};

const RegisterFormContent = () => {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(setRegisterFormTabValue(newValue));
  };

  const auth = useSelector((state) => state.auth);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(auth);
    if (auth === undefined || auth === {}) {
      navigate("/login");
    } else if (!auth.isLoggedIn) {
      navigate("/login");
    } else {
      // setUserName(user.signInUserSession.idToken.payload.name);
      setUserName(auth.user.attributes.name);
    }
  }, [auth, navigate]);

  return (
    <>
      <h5 style={{ color: "black" }}>
        Hello {userName}, let's get to know your company.
      </h5>
      <br />
      <Card
        style={REGISTER_FORM_CARD_STYLING}
        interactive={true}
        elevation={Elevation.THREE}
      >
        <Tabs
          id="registerForm"
          onChange={handleChange}
          defaultSelectedTabId="1"
        >
          <Tab id="1" title="1. Address " panel={<AddressForm />} />
          <Tab id="2" title="2. Tax Setup" panel={<TaxSetupForm />} />
          <Tab id="3" title="3. Automation" panel={<AutomationForm />} />
        </Tabs>
      </Card>
    </>
  );
};

const RegisterForm = () => {
  return <Navbar child={<RegisterFormContent />} />;
};

export default RegisterForm;
