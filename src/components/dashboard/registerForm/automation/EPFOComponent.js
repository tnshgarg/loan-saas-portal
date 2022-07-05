import React, { useEffect, useState, useContext } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setPfForm } from "../../../../store/actions/registerForm";
import { getDocumentFromPfForm } from "../../../../utils/getDocumentFromState";
import { NO_CHANGE_ERROR } from "../../../../utils/messageStrings";
import { postRegisterFormData } from "../../../../services/user.services";
import FormInput from "../../../common/FormInput";
import withUpdateAlert from "../../../../hoc/withUpdateAlert";
import UpdateAlertContext from "../../../../contexts/updateAlertContext";
import UpdateAlert from "../../../common/UpdateAlert";


const EPFOComponent = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { username: usernameInitial, password: passwordInitial } =
    useSelector((state) => state.registerForm.pfForm) || "";

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
    formState: { errors },
  } = useForm({
    defaultValues: {
      username,
      password,
    },
    mode: "all",
  });

  useEffect(() => {
    const data = getValues();
    console.log(`data: ${data}`);
    dispatch(setPfForm(data.username, data.password));
  }, [username, password]);

  const onSubmit = (data) => {
    console.log(`disabled: ${disabled}`);
    const isEqual = data.username === username && data.password === password;
    if (!isEqual) {
      setUsername(data.username);
      setPassword(data.password);
      postRegisterFormData(jwtToken, getDocumentFromPfForm(employerId, data))
        .then((response) => {
          const message = response.data.body.message;
          alert.success(message);
          setDisabled(true)
          setValue({ ...value, isOpen: false });
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
      <UpdateAlert/>
    </div>
  );
};

export default withUpdateAlert(EPFOComponent);
