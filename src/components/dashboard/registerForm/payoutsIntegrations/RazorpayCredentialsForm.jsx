import {
  useGetEmployerCredentialsByIdQuery,
  useUpdateEmployerCredentialsMutation,
} from "../../../../store/slices/apiSlices/employer/credentialsApiSlice";
import { Button, Collapse, Intent, Spinner } from "@blueprintjs/core";
import FormInput from "../../../../atomic/atoms/forms/FormInput";
import React from "react";
import { useForm } from "react-hook-form";
import { AppToaster } from "../../../../contexts/ToastContext";
import {
  NO_CHANGE_ERROR,
  VALUES_UPDATED,
} from "../../../../utils/messageStrings";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    employerId: state.auth.user?.attributes.sub,
  };
}

let isDirty = false;

function _RazorpayCredentialsForm({ employerId }) {
  let { status, data, isFetching, isLoading } =
    useGetEmployerCredentialsByIdQuery({
      employerId,
      portal: "razorpay",
    });
  const {
    body: { username: usernameInitial, password: passwordInitial } = {},
  } = data ?? {};

  const [updateEmployerCredentials] = useUpdateEmployerCredentialsMutation();
  const [disabled, setDisabled] = React.useState(true);
  const [showBankAccountForm, setBankAccountFormState] = React.useState(false);
  let username = usernameInitial;
  let password = passwordInitial;
  const {
    register,
    getValues,
    handleSubmit,
    setValue: setFormValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      username,
      password,
    },
  });
  if (status === "fulfilled") {
    if (!username) {
      if (disabled) setDisabled(false);
    } else {
      if (!isDirty) {
        setFormValue("username", username);
        setFormValue("password", password);
        isDirty = true;
      }
    }
    console.log({ rzpay: true, username, password });
  }
  const onSubmit = (data) => {
    const isEqual = data.username === username && data.password === password;
    const isBankingEntered =
      data.accountHolderName || data.payoutsAccountNumber || data.ifsc;
    if (!isEqual || isBankingEntered) {
      const banking_data = {};
      if (isBankingEntered) {
        banking_data["payoutsAccountNumber"] = data.payoutsAccountNumber;
        banking_data["accountHolderName"] = data.accountHolderName;
        banking_data["ifsc"] = data.ifsc;
      }
      updateEmployerCredentials({
        username: data.username,
        password: data.password,
        id: employerId,
        portal: "razorpay",
        ...banking_data,
      })
        .then((response) => {
          if (response.data.status === 200) {
            AppToaster.show({
              intent: Intent.SUCCESS,
              message: VALUES_UPDATED,
            });
            setDisabled(true);
            status = "fulfilled";
          }
        })
        .catch((error) => {
          console.log(error);
          const message = error.response?.data?.message ?? "Some error occured";
          AppToaster.show({
            intent: Intent.DANGER,
            message,
          });
        });
    } else {
      setDisabled(true);
      AppToaster.show({
        intent: Intent.DANGER,
        message: NO_CHANGE_ERROR,
      });
    }
  }; // your form submit function which will invoke after successful validation
  console.log(status, isFetching, isLoading);
  return (
    <>
      {(isLoading || isFetching) && !data ? <Spinner /> : ""}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            register={register}
            validations={{
              required: true,
              pattern: {
                value: /^[A-Za-z0-9_]+$/,
              },
            }}
            errors={errors}
            field={"username"}
            inputProps={{
              icon: "user",
              label: "Client Id",
              placeholder: "Razorpay Client Id",
              errorMessage: "Please enter your Razorpay Client Id",
              value: username,
              disabled: disabled,
            }}
          />
          <FormInput
            register={register}
            errors={errors}
            field={"password"}
            inputProps={{
              icon: "shield",
              type: "password",
              label: "Client Secret",
              placeholder: "Razorpay Client Secret",
              errorMessage: "Please enter your Razorpay Client Secret",
              value: password,
              disabled: disabled,
            }}
          />
          <Button onClick={() => setBankAccountFormState(!showBankAccountForm)}>
            {showBankAccountForm ? "Hide Form" : "Enter Bank Account Details"}
          </Button>
          <br />
          <br />
          <Collapse isOpen={showBankAccountForm}>
            <FormInput
              register={register}
              validations={{
                required: true,
                pattern: {
                  value: /^[A-Za-z0-9_\s]+$/,
                },
              }}
              errors={errors}
              field={"accountHolderName"}
              inputProps={{
                icon: "mugshot",
                label: "Account Holder Name",
                placeholder: "Razorpay Account Holder Name",
                errorMessage: "Please enter your Razorpay Account Holder Name",
                value: username,
                disabled: disabled,
              }}
            />
            <FormInput
              register={register}
              validations={{
                required: true,
                pattern: {
                  value: /^[A-Za-z0-9_]+$/,
                },
              }}
              errors={errors}
              field={"payoutsAccountNumber"}
              inputProps={{
                icon: "bank-account",
                label: "Account Number",
                placeholder: "Razorpay Account Number",
                errorMessage: "Please enter your Razorpay Account Number",
                value: username,
                disabled: disabled,
              }}
            />
            <FormInput
              register={register}
              errors={errors}
              field={"ifsc"}
              inputProps={{
                icon: "locate",
                type: "password",
                label: "IFSC",
                placeholder: "Razorpay Account IFSC",
                errorMessage: "Please enter your Razorpay Account IFSC",
                value: password,
                disabled: disabled,
              }}
            />
          </Collapse>
          <div style={{ textAlign: "right" }}>
            <Button
              disabled={errors.username || errors.password}
              type="button"
              onClick={() =>
                disabled ? setDisabled(false) : onSubmit({ ...getValues() })
              }
            >
              {disabled ? "Edit" : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export const RazorpayCredentialsForm = connect(mapStateToProps)(
  _RazorpayCredentialsForm
);
