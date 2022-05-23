import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../actions/auth";
import "./styles.css";

export const SignUp = () => {
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message } = useSelector((state) => state.message);

  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const {
      email: username,
      password,
      email,
      phone_number,
      name,
      company_name,
      no_of_employees,
      title,
    } = data;

    dispatch(
      registerUser(
        username,
        password,
        email,
        phone_number,
        name,
        company_name,
        no_of_employees,
        title
      )
    )
      .then(() => {
        setSuccessful(true);
        navigate("/confirm-sign-up");
      })
      .catch(() => {
        setSuccessful(false);
      });
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <div>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label>Email</label>
        <input {...register("email")} />
        <label>Password</label>
        <input type="password" {...register("password")} />
        <label>Phone Number</label>
        <input {...register("phone_number")} />
        <label>Full Name</label>
        <input {...register("name")} />
        <label>Company Name</label>
        <input {...register("company_name")} />
        <label>Number of Employees</label>
        <input {...register("no_of_employees")} />
        <label>Title</label>
        <input {...register("title")} />

        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <p>This field is required</p>} */}

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
