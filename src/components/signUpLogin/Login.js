import {
  Card,
  Button,
  Elevation,
  Icon,
  Divider,
  Intent,
  Colors,
} from "@blueprintjs/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/auth";
import {
  setAddressForm,
  setEsicStateForm,
  setPfForm,
  setTaxSetupForm,
} from "../../actions/registerForm";
import { getRegisterFormData } from "../../services/user.services";
import FormInput from "../common/FormInput";

const LOGIN_CARD_STYLING = {
  width: "20%",
  minWidth: "500px",
  marginRight: "auto",
  marginLeft: "auto",
  marginTop: "20vh",
};

const LOGIN_CONTAINER_STYLING = {
  textAlign: "center",
  padding: "2em",
};

const INPUT_CONTAINER_STYLING = {
  padding: "2em",
  paddingBottom: "0",
};

const DIVIDER_STYLING = {
  marginTop: "3em",
};

const SPACE_REDUCER = () => <div style={{ marginTop: "-10px" }}></div>;

function ErrorDialog({ message, success }) {
  if (message) {
    return (
      <div className="form-group">
        <br />
        <div
          className={success ? "alert alert-success" : "alert alert-danger"}
          role="alert"
        >
          {message}
        </div>
      </div>
    );
  }
  return <></>;
}
export const Login = () => {
  const [successful, setSuccessful] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message } = useSelector((state) => state.message);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log({ errors });
  const onSubmit = (data) => {
    const { email: username, password } = data;

    dispatch(login(username, password))
      .then((loginData) => {
        setSuccessful(true);

        const { authToken, employerId } = loginData;

        getRegisterFormData(authToken, employerId)
          .then((response) => {
            const registerFormObject = response.data.body;

            const {
              companyName: company,
              brandName: brand,
              registeredAddress: address,
              pincode,
            } = registerFormObject ?? "";

            dispatch(setAddressForm(company, brand, address, pincode));

            const { id: pan } = registerFormObject?.PAN ?? "";
            const { id: tan } = registerFormObject?.TAN ?? "";
            const { id: gstin } = registerFormObject?.GSTIN ?? "";

            dispatch(setTaxSetupForm(pan, tan, gstin));

            const { username: pf_username, password: pf_password } =
              registerFormObject?.credentials?.epfo ?? "";

            dispatch(setPfForm(pf_username, pf_password));

            Object.entries(registerFormObject?.credentials?.esic ?? {}).forEach(
              ([key, value]) => {
                const esic_state_identifier = key;
                const {
                  username: esic_employer_code,
                  password: esic_password,
                } = value ?? "";
                dispatch(
                  setEsicStateForm(
                    esic_state_identifier,
                    esic_state_identifier,
                    esic_employer_code,
                    esic_password
                  )
                );
              }
            );

            navigate("/profile");
          })
          .catch((error) => {
            console.log(error);
            setSuccessful(false);
          });
      })
      .catch(() => {
        setSuccessful(false);
      });
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          style={LOGIN_CARD_STYLING}
          interactive={true}
          elevation={Elevation.TWO}
        >
          <div style={LOGIN_CONTAINER_STYLING}>
            <Icon icon="user" size={"8em"} color={Colors.LIGHT_GRAY1} />
            <Divider style={DIVIDER_STYLING} />
            <div style={INPUT_CONTAINER_STYLING}>
              <FormInput
                register={register}
                validations={{
                  required: true,
                  minLength: 1,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  },
                }}
                errors={errors}
                field={"email"}
                icon={"envelope"}
                inputProps={{
                  large: true,
                  type: "email",
                  subLabel: "",
                  placeholder: "Please enter your email",
                  errorMessage: "Enter a valid email address",
                }}
              />
              <SPACE_REDUCER />
              <FormInput
                register={register}
                icon={"shield"}
                validations={{
                  required: true,
                  minLength: 8,
                }}
                errors={errors}
                field={"password"}
                inputProps={{
                  large: true,
                  type: "password",
                  placeholder: "Enter your password",
                  errorMessage: "Password cannot be less than 8 characters",
                }}
              />
              <Button type="submit" large intent={Intent.PRIMARY}>
                Sign In
              </Button>

              <ErrorDialog message={message} success={successful} />
            </div>
          </div>
        </Card>

        {/* register your input into the hook by invoking the "register" function */}

        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <p>This field is required</p>} */}
      </form>
    </div>
  );
};
