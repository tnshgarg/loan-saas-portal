import React, { useEffect, useState, useContext } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getCredentialsFormAction,
  setPfForm,
} from "../../../../store/actions/registerForm";
import { getDocumentFromPfForm } from "../../../../utils/getDocumentFromState";
import { NO_CHANGE_ERROR, VALUES_UPDATED } from "../../../../utils/messageStrings";
import { postCredentialsForm, postRegisterFormData } from "../../../../services/user.services";
import FormInput from "../../../common/FormInput";
import withUpdateAlert from "../../../../hoc/withUpdateAlert";
import UpdateAlertContext from "../../../../contexts/updateAlertContext";
import UpdateAlert from "../../../common/UpdateAlert";
import useFetchWithRedux from "../../../../hooks/useFetchWithRedux";

const EPFOComponent = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { username: usernameInitial, password: passwordInitial } =
    useFetchWithRedux(
      () => getCredentialsFormAction("epfo"),
      (state) => state.registerForm.pfForm
    ) || "";

  const [username, setUsername] = useState(usernameInitial);
  const [password, setPassword] = useState(passwordInitial);

  const { jwtToken } =
    useSelector((state) => state.auth.user?.signInUserSession.idToken) ?? "";

  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

  const [disabled, setDisabled] = React.useState(true);
  const { value, setValue } = useContext(UpdateAlertContext);

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username,
      password,
    },
    mode: "all",
  });

  useEffect(() => {
    if (usernameInitial || passwordInitial) {
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
  }, [usernameInitial, passwordInitial, dispatch, getValues, reset]);

  const onSubmit = (data) => {
    const isEqual = data.username === username && data.password === password;
    if (!isEqual) {
      setUsername(data.username);
      setPassword(data.password);
      postCredentialsForm(jwtToken, getDocumentFromPfForm(employerId, data))
        .then((response) => {
          const status = response.data.status;
          if(status === 200) {
            alert.success(VALUES_UPDATED);
            setDisabled(true);
            setValue({ ...value, isOpen: false });
          }
        })
        .catch((error) => {
          const message = error.response?.data?.message ?? "Some error occured";
          alert.error(message);
        });
    } else {
      alert.error(NO_CHANGE_ERROR);
    }
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input

  const toggleDisabled = () => {
    setDisabled(!disabled);
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
