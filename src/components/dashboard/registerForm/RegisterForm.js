import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbarMainContent/Navbar";
import { AddressForm, TaxSetupForm } from "./registerFormTabs/index";
import RegisterFormTabSwitcher from "./RegisterFormTabSwitcher";

const RegisterFormContent = () => {
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
      <h5 style={{ color: "white" }}>
        Hello {userName}, let's get to know your company.
      </h5>
      <br />
      <RegisterFormTabSwitcher tab1={<AddressForm />} tab2={<TaxSetupForm />} />
    </>
  );
};

const RegisterForm = () => {
  return <Navbar child={<RegisterFormContent />} />;
};

export default RegisterForm;
