import {
  useGetEmployerCredentialsByIdQuery,
  useUpdateEmployerCredentialsMutation,
} from "../../../../store/slices/apiSlices/employer/credentialsApiSlice";
import { Button, FileInput, Intent, Spinner } from "@blueprintjs/core";
import FormInput from "../../../../atomic/atoms/forms/FormInput";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AppToaster } from "../../../../contexts/ToastContext";
import {
  NO_CHANGE_ERROR,
  VALUES_UPDATED,
} from "../../../../utils/messageStrings";
import UpdateAlertContext from "../../../../contexts/updateAlertContext";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    employerId: state.auth.user?.attributes.sub,
  };
}

function _CashfreeCredentialsForm({ employerId }) {
  let res = {};
  const { data, isFetching, isLoading } = (res =
    useGetEmployerCredentialsByIdQuery({
      employerId,
      portal: "cashfree",
    }));
  console.log(res);
  const {
    body: {
      client_id: clientIdInitial,
      client_secret: clientSecretInitial,
    } = {},
  } = data ?? {};
  console.log({ data });
  const [updateEmployerCredentials] = useUpdateEmployerCredentialsMutation();
  const [disabled, setDisabled] = React.useState(true);
  const { value, setValue } = useContext(UpdateAlertContext);
  const [uploadedPublicKey, setUploadedPublicKey] = useState("");
  let clientId = clientIdInitial;
  let clientSecret = clientSecretInitial;
  const {
    register,
    getValues,
    handleSubmit,
    setValue: setFormValue,
    formState: { isDirty, errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      clientId,
      clientSecret,
    },
  });

  if (!isDirty) {
    setFormValue("clientId", clientId);
    setFormValue("clientSecret", clientSecret);
  }
  const onSubmit = (data) => {
    const isEqual =
      data.clientId === clientId && data.clientSecret === clientSecret;
    if (!isEqual || uploadedPublicKey) {
      data.publicKey = uploadedPublicKey;
      updateEmployerCredentials({
        client_id: data.clientId,
        client_secret: data.clientSecret,
        public_key: uploadedPublicKey,
        id: employerId,
        portal: "cashfree",
      })
        .then((response) => {
          const status = response.data.status;
          if (status === 200) {
            AppToaster.show({
              intent: Intent.SUCCESS,
              message: VALUES_UPDATED,
            });
            setDisabled(true);
          }
        })
        .catch((error) => {
          const message = error.response?.data?.message ?? "Some error occured";
          AppToaster.show({
            intent: Intent.DANGER,
            message,
          });
        });
    } else {
      setValue({ ...value, isOpen: false });
      setDisabled(true);
      AppToaster.show({
        intent: Intent.DANGER,
        message: NO_CHANGE_ERROR,
      });
    }
  }; // your form submit function which will invoke after successful validation

  const handleFileUpload = (event) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles.length > 0) {
      let reader = new FileReader();
      reader.readAsText(uploadedFiles[0], "UTF-8");
      console.log(reader);
      reader.addEventListener(
        "load",
        () => {
          setUploadedPublicKey(reader.result);
        },
        false
      );
    }
  };
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
                value: /^[A-Za-z0-9]+$/,
              },
            }}
            errors={errors}
            field={"clientId"}
            inputProps={{
              icon: "user",
              label: "Client Id",
              placeholder: "Please enter your Cashfree Client Id",
              errorMessage: "Please enter your Cashfree Client Id",
              value: clientId,
              disabled: disabled,
            }}
          />
          <FormInput
            register={register}
            errors={errors}
            field={"clientSecret"}
            inputProps={{
              icon: "shield",
              type: "password",
              label: "Client Secret",
              placeholder: "Please enter your Cashfree Client Secret",
              errorMessage: "Please enter your Cashfree Client Secret",
              value: clientSecret,
              disabled: disabled,
            }}
          />
          <FileInput
            disabled={disabled}
            text="Cashfree Public Key"
            buttonText={"Upload"}
            onInputChange={handleFileUpload}
          />
          <br />
          <br />
          {uploadedPublicKey ? (
            <code>
              The Key you have uploaded
              <br />
              {uploadedPublicKey.split("\n").map((item, i) => (
                <>
                  <small key={i}>{item}</small>
                  <br />
                </>
              ))}
            </code>
          ) : (
            ""
          )}
          <FormInput
            register={register}
            errors={errors}
            field={"walletNumber"}
            inputProps={{
              icon: "credit-card",
              label: "Payouts Wallet ID",
              placeholder: "Cashfree Payouts Wallet ID",
              errorMessage: "Please enter your Cashfree Payouts Wallet ID",
              value: clientSecret,
              disabled: disabled,
            }}
          />
          <div style={{ textAlign: "right" }}>
            <Button
              disabled={errors.clientId || errors.clientSecret}
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

export const CashfreeCredentialsForm = connect(mapStateToProps)(
  _CashfreeCredentialsForm
);
