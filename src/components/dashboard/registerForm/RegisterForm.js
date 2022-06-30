import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Elevation } from "@blueprintjs/core";
import Navbar from "../Navbar";
import { Tabs, Tab } from "@blueprintjs/core";
import { AddressForm, AutomationForm, TaxSetupForm } from "./index";

const REGISTER_FORM_CARD_STYLING = {
  width: "80%",
  marginRight: "auto",
  marginLeft: "auto",
};

const RegisterFormContent = () => {
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(auth);
    if (auth === undefined || auth === {} || !auth.isLoggedIn) {
      navigate("/login");
    } else {
      // setUserName(user.signInUserSession.idToken.payload.name);
      // setUserName(auth.user.attributes.name);
    }
  }, [auth, navigate]);

  return (
    <>
      <Card
        style={REGISTER_FORM_CARD_STYLING}
        interactive={true}
        elevation={Elevation.THREE}
      >
        <Tabs id="registerForm" defaultSelectedTabId="1">
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
