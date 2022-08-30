import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  NO_CHANGE_ERROR,
  VALUES_UPDATED,
} from "../../../../utils/messageStrings";
import { setPfForm } from "../../../../store/slices/registerFormSlice";
import FormInput from "../../../../atomic/atoms/forms/FormInput";
import withUpdateAlert from "../../../../hoc/withUpdateAlert";
import UpdateAlertContext from "../../../../contexts/updateAlertContext";
import UpdateAlert from "../../../common/UpdateAlert";
import {
  useGetEmployerCredentialsByIdQuery,
  useUpdateEmployerCredentialsMutation,
} from "../../../../store/slices/apiSlices/employer/credentialsApiSlice";
import { Intent } from "@blueprintjs/core";
import { AppToaster } from "../../../../contexts/ToastContext";

const EPFOComponent = () => {
  const dispatch = useDispatch();
  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

  const responseFromQuery = useGetEmployerCredentialsByIdQuery({
    employerId,
    portal: "epfo",
  });
  const { data, isLoading, error } = responseFromQuery;

  const {
    body: { username: usernameInitial, password: passwordInitial } = {},
  } = data ?? {};

  const [username, setUsername] = useState(usernameInitial);
  const [password, setPassword] = useState(passwordInitial);

  const { jwtToken } =
    useSelector((state) => state.auth.user?.signInUserSession.idToken) ?? "";

  const [updateEmployerCredentials] = useUpdateEmployerCredentialsMutation();

  const [disabled, setDisabled] = React.useState(true);
  const { value, setValue } = useContext(UpdateAlertContext);

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (data) {
      reset({
        username: usernameInitial,
        password: passwordInitial,
      });
    }
    return () => {
      const pfFormDetailsNew = getValues();
      const { username, password } = pfFormDetailsNew;
      const isEqual =
        username === usernameInitial && password === passwordInitial;
      if (!isEqual) {
        dispatch(setPfForm(username, password));
      }
    };
  }, [usernameInitial, passwordInitial, data, dispatch, getValues, reset]);

  const onSubmit = (data) => {
    const isEqual = data.username === username && data.password === password;
    if (!isEqual) {
      setUsername(data.username);
      setPassword(data.password);
      updateEmployerCredentials({
        ...data,
        id: employerId,
        portal: "epfo",
      })
        .then((response) => {
          const status = response.data.status;
          if (status === 200) {
            AppToaster.show({
              intent: Intent.SUCCESS,
              message: VALUES_UPDATED,
            });
            setDisabled(true);
            setValue({ ...value, isOpen: false });
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

  // console.log(watch("example")); // you can watch individual input by pass the name of the input

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  const cancelCallback = () => {
    setDisabled(true);
    reset();
  };

  const hydrateUpdateAlert = () => {
    const taxFormDetails = {
      username: usernameInitial,
      password: passwordInitial,
    };
    setValue({
      ...value,
      isOpen: !value.isOpen,
      newValues: { ...getValues() },
      initialValues: taxFormDetails,
      cancelCallback,
      onConfirm: () => onSubmit({ ...getValues() }),
    });
  };

  return (
    <div>
      <h5>EPFO Portal Credentials</h5>
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
          field={"username"}
          inputProps={{
            icon: "user",
            label: "Username",
            placeholder: "Please enter EPFO Portal Username",
            errorMessage: "Please enter EPFO Portal Username",
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
            label: "Password",
            placeholder: "Please enter company's EPFO Portal Password",
            errorMessage: "Please enter company's EPFO Portal Password",
            disabled: disabled,
          }}
        />
        <input
          disabled={errors.username || errors.password}
          type="button"
          value={disabled ? "Edit" : "Submit"}
          onClick={disabled ? toggleDisabled : hydrateUpdateAlert}
        />
      </form>
      <UpdateAlert />
    </div>
  );
};

export default withUpdateAlert(EPFOComponent);
