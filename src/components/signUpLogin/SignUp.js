import {
  Button,
  Card,
  DialogStep,
  Intent,
  MultistepDialog,
} from "@blueprintjs/core";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { numberOfEmployees } from "../../utils/numberOfEmployees";
import { registerUser } from "../../store/slices/authSlice";
import ErrorDialog from "../common/ErrorDialog";
import FormInput from "../common/FormInput";
import { Tooltip2 } from "@blueprintjs/popover2";

export const SignUp = () => {
  var md5 = require("md5");
  const [successful, setSuccessful] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    // console.log(data);
    const {
      email: username,
      password,
      email,
      phone_number,
      name,
      company_name,
      employee_count,
      designation,
    } = data;

    dispatch(
      registerUser(
        username,
        password,
        email,
        phone_number,
        name,
        company_name,
        employee_count,
        designation
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
      <form onSubmit={(e) => e.preventDefault()}>
        {/* register your input into the hook by invoking the "register" function */}
        <MultistepDialog
          lazy={false}
          icon="info-sign"
          isOpen={true}
          title={"Sign Up"}
          navigationPosition={"top"}
          isCloseButtonShown={false}
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
                !(
                  dirtyFields.access_key &&
                  dirtyFields.email &&
                  dirtyFields.password
                ) ||
                errors.access_key ||
                errors.email ||
                errors.password,
            }}
            panel={
              <Card>
                <FormInput
                  register={register}
                  validations={{
                    required: true,
                    validate: {
                      hash: (v) =>
                        md5(v) === "a043ed8b42e5e8c38fe5ae27c54c1aa3",
                    },
                  }}
                  errors={errors}
                  field={"access_key"}
                  inputProps={{
                    icon: "key",
                    type: "text",
                    label: "Access Key",
                    placeholder: "Access Key",
                    errorMessage: "Enter a valid access key",
                  }}
                />
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
                    placeholder: "Email",
                    errorMessage: "Enter a valid email address",
                  }}
                />
                <FormInput
                  register={register}
                  validations={{
                    required: true,
                    pattern: {
                      value:
                        /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/,
                    },
                  }}
                  errors={errors}
                  field={"password"}
                  inputProps={{
                    rightElement: (
                      <Tooltip2
                        content={`${showPassword ? "Hide" : "Show"} Password`}
                      >
                        <Button
                          icon={showPassword ? "unlock" : "lock"}
                          intent={Intent.WARNING}
                          minimal={true}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </Tooltip2>
                    ),
                    icon: "shield",
                    type: showPassword ? "text" : 'password',
                    label: "Password",
                    subLabel:
                      "Password must contain atleast 8 characters with a special character, a number, a lowercase and an uppercase alphabet",
                    placeholder: "Password",
                    errorMessage:
                      "Password must contain atleast 8 characters with a special character, a number, a lowercase and an uppercase alphabet",
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
                    placeholder: "Full Name",
                    errorMessage: "Full Name cannot be empty",
                  }}
                />
                <FormInput
                  register={register}
                  validations={{
                    required: true,
                    pattern: {
                      value: /^\d{10}$/,
                    },
                  }}
                  errors={errors}
                  field={"phone_number"}
                  inputProps={{
                    icon: "phone",
                    type: "text",
                    label: "Phone Number",
                    placeholder:
                      "Enter you 10-digit phone number",
                    errorMessage: "Enter 10 digit number",
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
                    placeholder: "Company Name",
                    errorMessage: "Company Name cannot be empty",
                  }}
                />
                <FormInput
                  register={register}
                  validations={{
                    required: true,
                  }}
                  errors={errors}
                  field={"designation"}
                  inputProps={{
                    icon: "briefcase",
                    type: "text",
                    label: "Designation",
                    placeholder: "Your designation in the organization",
                    errorMessage: "Designation cannot be empty",
                  }}
                />
                <label>Number of Employees</label>
                <Controller
                  control={control}
                  defaultValue={numberOfEmployees[0]}
                  name="employee_count"
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
      </form>
      <ErrorDialog message={message} success={successful} />
    </div>
  );
};
