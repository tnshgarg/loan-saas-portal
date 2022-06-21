import { Card, DialogStep, MultistepDialog } from "@blueprintjs/core";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { registerUser } from "../../store/actions/auth";
import { numberOfEmployees } from "../../helpers/numberOfEmployees";
import FormInput from "../common/FormInput";

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
    formState: { errors, dirtyFields },
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
  console.log({ dirtyFields, errors });
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* register your input into the hook by invoking the "register" function */}
        <MultistepDialog
          lazy={false}
          icon="info-sign"
          isOpen={true}
          title={"Sign Up"}
          navigationPosition={"top"}
          usePortal={false}
          backdropProps={{
            style: {
              backgroundColor: "rgba(0,0,0,0)",
            },
          }}
          finalButtonProps={{
            disabled: Object.keys(errors).length,
            type: "submit",
            onClick: handleSubmit(onSubmit),
          }}
        >
          <DialogStep
            id="login-details"
            title="Login Details"
            nextButtonProps={{
              disabled:
                !(dirtyFields.email && dirtyFields.password) ||
                errors.email ||
                errors.password,
            }}
            panel={
              <Card>
                <FormInput
                  register={register}
                  validations={{
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    },
                  }}
                  errors={errors}
                  field={"email"}
                  inputProps={{
                    icon: "envelope",
                    type: "email",
                    label: "Email",
                    subLabel: "",
                    placeholder: "Please enter your email",
                    errorMessage: "Enter a valid email address",
                  }}
                />
                <FormInput
                  register={register}
                  validations={{
                    required: true,
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    },
                  }}
                  errors={errors}
                  field={"password"}
                  inputProps={{
                    icon: "shield",
                    type: "password",
                    label: "Password",
                    subLabel:
                      "Enter a strong atleast 8 lettered password with a special character, a number, a lowercase and an uppercase alphabet",
                    placeholder: "Enter your password",
                    errorMessage: "Password cannot be empty",
                  }}
                />
              </Card>
            }
          />
          <DialogStep
            id="personal-details"
            title="Personal Details"
            panel={
              <Card>
                <FormInput
                  register={register}
                  validations={{
                    required: true,
                  }}
                  errors={errors}
                  field={"name"}
                  inputProps={{
                    icon: "user",
                    type: "text",
                    label: "Full Name",
                    subLabel: "",
                    placeholder: "Enter your First Name and Last Name",
                    errorMessage: "Full Name cannot be empty",
                  }}
                />
                <FormInput
                  register={register}
                  validations={{
                    required: true,
                    pattern: {
                      value: /^\+91\d{10}$/,
                    },
                  }}
                  errors={errors}
                  field={"phone_number"}
                  inputProps={{
                    icon: "phone",
                    type: "text",
                    label: "Phone Number",
                    placeholder:
                      "Enter you 10-digit phone number with country code",
                    errorMessage: "Enter 10 digit number starting with +91",
                  }}
                />
              </Card>
            }
          />
          <DialogStep
            id="company-details"
            title="Company Details"
            panel={
              <Card>
                <FormInput
                  register={register}
                  validations={{
                    required: true,
                  }}
                  errors={errors}
                  field={"company_name"}
                  inputProps={{
                    icon: "office",
                    type: "text",
                    label: "Company Name",
                    subLabel: "",
                    placeholder: "Enter the name of you Organization",
                    errorMessage: "Company Name cannot be empty",
                  }}
                />
                <FormInput
                  register={register}
                  validations={{
                    required: true,
                  }}
                  errors={errors}
                  field={"title"}
                  inputProps={{
                    icon: "briefcase",
                    type: "text",
                    label: "Title",
                    subLabel: "",
                    placeholder: "Your Position in the organization",
                    errorMessage: "Title cannot be empty",
                  }}
                />
                <label>Number of Employees</label>
                <Controller
                  control={control}
                  defaultValue={numberOfEmployees[0]}
                  name="no_of_employees"
                  render={({ field }) => (
                    <Select
                      inputRef={field.ref}
                      classNamePrefix="addl-class"
                      options={numberOfEmployees}
                      value={numberOfEmployees.find(
                        (c) => c.value === field.value
                      )}
                      onChange={(val) => {
                        field.onChange(val.value);
                      }}
                    />
                  )}
                />
              </Card>
            }
          />
        </MultistepDialog>

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
