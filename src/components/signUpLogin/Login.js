import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/auth";
import {
  setAddressForm,
  setEsicStateForm,
  setPfForm,
  setRegisterFormLogout,
  setTaxSetupForm,
} from "../../actions/registerForm";
import { getRegisterFormData } from "../../services/user.services";
import "./styles.css";

export const Login = () => {
  const [successful, setSuccessful] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(setRegisterFormLogout());
  }, [dispatch]);

  const handleForgotPasswordOnClick = () => {
    navigate("/forgot-password");
  };

  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();
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
              state,
              pincode,
            } = registerFormObject ?? "";

            dispatch(setAddressForm(company, brand, address, state, pincode));

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
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label>Email</label>
        <input {...register("email")} />
        <label>Password</label>
        <input type="password" {...register("password")} />

        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <p>This field is required</p>} */}

        <label onClick={handleForgotPasswordOnClick}>
          Forgot Password? Click here to reset it
        </label>

        <input type="submit" />
      </form>
      {message && (
        <div className="form-group">
          <div
            className={
              successful ? "alert alert-success" : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};
