import {
  Button,
  Card,
  DialogStep,
  Intent,
  MultistepDialog,
} from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import ErrorDialog from "../../atomic/atoms/alerts/ErrorDialog";
import FormInput from "../../atomic/atoms/forms/FormInput";
import { registerUser } from "../../store/slices/authSlice";
import { companyTypes } from "../../utils/numberOfEmployees";

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
      company_type,
      employee_count,
      designation,
      sales_id,
      access_key
    } = data;

    dispatch(
      registerUser(
        username,
        password,
        access_key,
        email,
        `+91${phone_number}`,
        name,
        company_name,
        company_type,
        employee_count,
        designation,
        sales_id
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
                      hash: (v) => {
                        return (v || "").length
                      },
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
                    type: showPassword ? "text" : "password",
                    label: "Password",
                    subLabel:
                      "Password must contain atleast 8 characters with a special character, a number, a lowercase and an uppercase alphabet",
                    placeholder: "Password",
                    errorMessage:
                      "Password must contain atleast 8 characters with a special character, a number, a lowercase and an uppercase alphabet",
                  }}
                />
                <FormInput
                  register={register}
                  validations={{
                    required: true,
                  }}
                  errors={errors}
                  field={"sales_id"}
                  inputProps={{
                    icon: "id-number",
                    type: "text",
                    label: "Sales ID",
                    placeholder: "Sales ID",
                    errorMessage: "Sales ID cannot be empty",
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
                    placeholder: "Enter you 10-digit phone number",
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
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto",
                    columnGap: "2em",
                  }}
                >
                  <div>
                    {" "}
                    <label>Type of Company</label>
                    <Controller
                      control={control}
                      defaultValue={companyTypes[0]["value"]}
                      name="company_type"
                      render={({ field }) => (
                        <Select
                          inputRef={field.ref}
                          classNamePrefix="addl-class"
                          options={companyTypes}
                          value={companyTypes.find(
                            (c) => c.value === field.value
                          )}
                          onChange={(val) => {
                            field.onChange(val.value);
                          }}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <FormInput
                      register={register}
                      validations={{
                        required: true,
                        pattern: {
                          value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        },
                      }}
                      errors={errors}
                      field={"employee_count"}
                      inputProps={{
                        icon: "id-number",
                        type: "text",
                        label: "Number of Employees",
                        placeholder: "Number of Employees",
                        errorMessage:
                          "Number of Employees should be a non-empty number",
                      }}
                    />
                  </div>
                </div>
              </Card>
            }
          />
        </MultistepDialog>
      </form>
      <ErrorDialog message={message} success={successful} />
    </div>
  );
};
