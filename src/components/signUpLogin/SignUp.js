import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { registerUser } from "../../actions/auth";
import { numberOfEmployees } from "../../helpers/numberOfEmployees";
import "./styles.css";

export const SignUp = () => {
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message } = useSelector((state) => state.message);

  const {
    register,
    handleSubmit,
    control,
    // watch,
    formState: { errors },
  } = useForm({ mode: "all" });
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
        <input
          {...register("email", {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            },
          })}
        />
        {errors.email && <p>Enter correct email address</p>}

        <label>Password</label>
        <input
          type="password"
          {...register("password", {
            required: true,
          })}
        />
        {errors.password && <p>Password cannot be empty</p>}

        <label>Phone Number</label>
        <input
          {...register("phone_number", {
            required: true,
            pattern: {
              value: /(\+91)?\d{12}/,
            },
          })}
        />
        {errors.phone_number && <p>Enter 10 digit number starting with +91</p>}

        <label>Full Name</label>
        <input
          {...register("name", {
            required: true,
          })}
        />
        {errors.name && <p>Full Name cannot be empty</p>}

        <label>Company Name</label>
        <input
          {...register("company_name", {
            required: true,
          })}
        />
        {errors.company_name && <p>Company Name cannot be empty</p>}

        <label>Number of Employees</label>
        {/* <input {...register("no_of_employees")} /> */}
        <Controller
          control={control}
          defaultValue={numberOfEmployees[0]}
          name="no_of_employees"
          render={({ field }) => (
            <Select
              inputRef={field.ref}
              classNamePrefix="addl-class"
              options={numberOfEmployees}
              value={numberOfEmployees.find((c) => c.value === field.value)}
              onChange={(val) => {
                field.onChange(val.value);
              }}
            />
          )}
        />

        <label>Title</label>
        <input
          {...register("title", {
            required: true,
          })}
        />
        {errors.title && <p>Title cannot be empty</p>}

        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}

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
