import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { setEsicStateForm } from "../../../../store/actions/registerForm";
import { getDocumentFromEsicForm } from "../../../../utils/getDocumentFromState";
import { NO_CHANGE_ERROR } from "../../../../utils/messageStrings";
import statesAndUts from "../../../../utils/statesAndUts";
import { postRegisterFormData } from "../../../../services/user.services";
import FormInput from "../../../common/FormInput";

const ESICStateComponent = ({
  disabledInitial = true,
  isOtherInitial = false,
  stateInitial = "Andaman and Nicobar",
  employerCodeInitial = "",
  passwordInitial = "",
  onSuccess = undefined,
}) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { jwtToken } =
    useSelector((state) => state.auth.user?.signInUserSession.idToken) ?? "";

  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

  const states = statesAndUts.map((indianState) => {
    return {
      value: indianState,
      label: indianState,
    };
  });
  const defaultIndianState = states[0].label;

  const [isOther, setIsOther] = useState(isOtherInitial);
  const [state, setState] = useState(stateInitial);
  const [employerCode, setEmployerCode] = useState(employerCodeInitial);
  const [password, setPassword] = useState(passwordInitial);

  const [disabled, setDisabled] = useState(disabledInitial);
  const [stateFieldDisabled, setStateFieldDisabled] = useState(disabledInitial);

  const {
    register,
    getValues,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      state: isOtherInitial ? "Other" : stateInitial,
      stateOther: isOtherInitial ? stateInitial : "",
      employerCode: employerCodeInitial,
      password: passwordInitial,
    },
    mode: "all",
  });

  // useEffect(() => {
  //   return () => {
  //     const data = getValues();
  //     console.log(`data: ${data}`);
  //     const isEqual =
  //       data.state === state &&
  //       data.employerCode === employerCode &&
  //       data.password === password;
  //     console.log(`isEqual: ${isEqual}`);
  //     if (!isEqual) {
  //       dispatch(
  //         setEsicStateForm(
  //           data.state === "Other" ? true : false,
  //           data.state === "Other" ? data.stateOther : state,
  //           data.employerCode,
  //           data.password
  //         )
  //       );
  //     }
  //   };
  // }, [dispatch, state, employerCode, password, getValues]);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  const onSubmit = (data) => {
    console.log(`disabled: ${disabled}`);
    if (!disabled) {
      return;
    }
    console.log(data, state, employerCode, password);
    const isEqual =
      data.state === state &&
      data.employerCode === employerCode &&
      data.password === password;
    console.log(`isEqual : ${isEqual}`);
    if (!isEqual) {
      setEmployerCode(data.employerCode);
      setPassword(data.password);
      setState(isOther ? data.stateOther : data.state);

      postRegisterFormData(
        jwtToken,
        getDocumentFromEsicForm(
          employerId,
          isOther,
          isOther ? data.stateOther : data.state,
          data.employerCode,
          data.password
        )
      )
        .then((response) => {
          dispatch(
            setEsicStateForm(
              data.state === "Other" ? true : false,
              data.state === "Other" ? data.stateOther : data.state,
              data.employerCode,
              data.password
            )
          );
          const message = response.data.body.message;
          alert.success(message);
          setStateFieldDisabled(true);
          onSuccess && onSuccess();
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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}

        <label>State</label>
        <Controller
          control={control}
          defaultValue={defaultIndianState}
          name="state"
          render={({ field }) => (
            <Select
              inputRef={field.ref}
              classNamePrefix="addl-class"
              className="select-comp"
              options={states}
              value={states.find((c) => c.value === field.value)}
              onChange={(val) => {
                val.value === "Other" ? setIsOther(true) : setIsOther(false);
                field.onChange(val.value);
              }}
              isDisabled={stateFieldDisabled}
            />
          )}
        />
        <br />
        {isOther && (
          <FormInput
            register={register}
            validations={{
              required: true,
              pattern: {
                value: /^[A-Za-z]+$/,
              },
            }}
            errors={errors}
            field={"stateOther"}
            inputProps={{
              icon: "",
              placeholder: "Please enter State Name",
              errorMessage: "Please enter State Name",
              disabled: disabled,
            }}
          />
        )}

        <FormInput
          register={register}
          validations={{
            required: true,
            pattern: {
              value: /^\d+$/,
            },
          }}
          errors={errors}
          field={"employerCode"}
          inputProps={{
            icon: "user",
            label: "Establishment Code",
            placeholder:
              "Please enter ESIC Establishment Code for selected state",
            errorMessage:
              "Please enter ESIC Establishment Code for selected state",
            disabled: disabled,
          }}
        />

        <FormInput
          register={register}
          validations={{
            required: true,
          }}
          errors={errors}
          field={"password"}
          inputProps={{
            icon: "shield",
            type: "password",
            label: "Password",
            placeholder:
              "Please enter ESIC Portal Password for this Establishment Code",
            errorMessage:
              "Please enter ESIC Portal Password for this Establishment Code",
            disabled: disabled,
          }}
        />

        <input
          type="submit"
          value={disabled ? "Edit" : "Submit"}
          onClick={toggleDisabled}
        />
      </form>
    </div>
  );
};

const ESICComponent = () => {
  const [stateCount, setStateCount] = useState(0);

  const esicForm = useSelector((state) => state.registerForm.esicForm) || {};

  const successCallback = () => {
    setStateCount(0);
  };

  return (
    <div>
      <h5>ESIC Portal Credentials</h5>
      {Object.entries(esicForm).map(([key, value]) => {
        return (
          <div key={key}>
            <ESICStateComponent
              isOtherInitial={value.isOther}
              stateInitial={value.state}
              employerCodeInitial={value.employerCode}
              passwordInitial={value.password}
            />
            <br />
            <hr />
          </div>
        );
      })}

      {[...Array(stateCount)].map((_, i) => (
        <div key={`${i}`}>
          <ESICStateComponent
            onSuccess={successCallback}
            disabledInitial={false}
          />
          <br />
          <hr />
        </div>
      ))}
      <Button
        onClick={() => setStateCount(stateCount + 1)}
        variant="outlined"
        startIcon={<AddCircleIcon />}
      >
        Add another State
      </Button>
    </div>
  );
};

export default ESICComponent;
