import { Card, Elevation, Tab, Tabs } from "@blueprintjs/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddressForm from "./AddressForm";
import TaxSetupForm from "./TaxSetupForm";
import AutomationForm from "./automation/AutomationForm";
import PayoutsIntegrationTabs from "./payoutsIntegrations/PayoutsIntegrationTabs";

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
      navigate("auth/login", { replace: true });
    }
  }, [auth, navigate]);

  return (
    <>
      <Card
        style={REGISTER_FORM_CARD_STYLING}
        interactive={false}
        elevation={Elevation.THREE}
      >
        <Tabs id="registerForm" defaultSelectedTabId="1">
          <Tab id="1" title="1. Company Details " panel={<AddressForm />} />
          <Tab id="2" title="2. Tax Setup" panel={<TaxSetupForm />} />
          <Tab
            id="3"
            title="3. Compliance Automation"
            panel={<AutomationForm />}
          />
          <Tab
            id="4"
            title="4. Payouts Integration"
            panel={<PayoutsIntegrationTabs />}
          />
        </Tabs>
      </Card>
      <br />
      <br />
      <br />
    </>
  );
};

const RegisterForm = () => {
  return <RegisterFormContent />;
};

export default RegisterForm;
