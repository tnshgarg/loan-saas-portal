import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { setEsicStateForm } from "../../../../store/actions/registerForm";
import { getDocumentFromEsicFormDetails } from "../../../../helpers/getDocumentFromState";
import { NO_CHANGE_ERROR } from "../../../../helpers/messageStrings";
import statesAndUts from "../../../../helpers/statesAndUts";
import { postRegisterFormData } from "../../../../services/user.services";
import FormInput from "../../../common/FormInput";

const ESICStateComponent = ({
  esicStateInitial,
  esicStateOtherInitial,
  esicEmployerCodeInitial,
  esicPasswordInitial,
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
  const [showOtherIndianState, setShowOtherIndianState] = useState(
    esicStateOtherInitial ? true : false
  );

  const [isComponentDisabled, setIsComponentDisabled] = useState(true);

  const {
    register,
    getValues,
    handleSubmit,
    control,
    // watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      esic_state: esicStateInitial ?? "",
      esic_state_other: esicStateOtherInitial,
      esic_employer_code: esicEmployerCodeInitial,
      esic_password: esicPasswordInitial,
    },
    mode: "all",
  });

  useEffect(() => {
    return () => {
      const esicStateDataNew = getValues();
      const {
        esic_state,
        esic_state_other,
        esic_employer_code,
        esic_password,
      } = esicStateDataNew || "";
      const isEqual =
        ((esic_employer_code === esicEmployerCodeInitial ||
          esic_employer_code === null ||
          esic_employer_code === undefined) &&
          (esic_password === esicPasswordInitial ||
            esic_password === null ||
            esic_password === undefined)) ||
        esic_state === "";
      if (!isEqual) {
        dispatch(
          setEsicStateForm(
            esic_state,
            esic_state_other,
            esic_employer_code,
            esic_password
          )
        );
      }
    };
  }, [dispatch, esicEmployerCodeInitial, esicPasswordInitial, getValues]);

  const toggleDisabledStatus = () => {
    setIsComponentDisabled(!isComponentDisabled);
  };

  const onSubmit = (esicStateDataNew) => {
    const { esic_state, esic_state_other, esic_employer_code, esic_password } =
      esicStateDataNew || "";
    const esic_state_identifier = esic_state_other
      ? esic_state_other
      : esic_state;
    const isEqual =
      (esic_employer_code === esicEmployerCodeInitial ||
        esic_employer_code === null ||
        esic_employer_code === undefined) &&
      (esic_password === esicPasswordInitial ||
        esic_password === null ||
        esic_password === undefined);
    if (!isEqual) {
      postRegisterFormData(
        jwtToken,
        getDocumentFromEsicFormDetails(
          employerId,
          esic_state_identifier,
          esic_employer_code,
          esic_password
        )
      )
        .then((response) => {
          const message = response.data.body.message;
          alert.success(message);
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
          name="esic_state"
          render={({ field }) => (
            <Select
              inputRef={field.ref}
              classNamePrefix="addl-class"
              className="select-comp"
              options={states}
              value={states.find((c) => c.value === field.value)}
              onChange={(val) => {
                val.value === "Other"
                  ? setShowOtherIndianState(true)
                  : setShowOtherIndianState(false);
                field.onChange(val.value);
              }}
              isDisabled={isComponentDisabled}
            />
          )}
        />
        {showOtherIndianState && (
          <FormInput
            register={register}
            validations={{
              required: true,
              pattern: {
                value: /^[A-Za-z]+$/,
              },
            }}
            errors={errors}
            field={"esic_state_other"}
            inputProps={{
              icon: "state",
              placeholder: "Please enter State Name",
              errorMessage: "Please enter State Name",
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
          field={"esic_employer_code"}
          inputProps={{
            icon: "user",
            label: "Establishment Code",
            placeholder:
              "Please enter ESIC Establishment Code for selected state",
            errorMessage:
              "Please enter ESIC Establishment Code for selected state",
          }}
        />

        <FormInput
          register={register}
          validations={{
            required: true,
          }}
          errors={errors}
          field={"esic_password"}
          inputProps={{
            icon: "shield",
            type: "password",
            disabled: { isComponentDisabled },
            label: "Password",
            placeholder:
              "Please enter ESIC Portal Password for this Establishment Code",
            errorMessage:
              "Please enter ESIC Portal Password for this Establishment Code",
          }}
        />
        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <p>This field is required</p>} */}
        <input
          type="submit"
          value={isComponentDisabled ? "Edit" : "Submit"}
          onClick={toggleDisabledStatus}
        />
      </form>
    </div>
  );
};

const ESICComponent = () => {
  const [stateCount, setStateCount] = useState(0);

  const { esicFormDetails: initialEsicFormDetails } =
    useSelector((state) => state.registerForm) || {};

  console.log("rendering");
  return (
    <div>
      <h5>ESIC Portal Credentials</h5>
      {Object.entries(initialEsicFormDetails).map(([key, value]) => {
        const {
          esic_state: esicStateInitial,
          esic_state_other: esicStateOtherInitial,
          esic_employer_code: esicEmployerCodeInitial,
          esic_password: esicPasswordInitial,
        } = value;
        return (
          <div key={key}>
            <ESICStateComponent
              esicStateInitial={esicStateInitial}
              esicStateOtherInitial={esicStateOtherInitial}
              esicEmployerCodeInitial={esicEmployerCodeInitial}
              esicPasswordInitial={esicPasswordInitial}
            />
            <br />
          </div>
        );
      })}

      {[...Array(stateCount)].map((_, i) => (
        <div key={`esic${i}`}>
          <ESICStateComponent />
          <br />
        </div>
      ))}
      <Button
        onClick={() => setStateCount(stateCount + 1)}
        variant="outlined"
        startIcon={<AddCircleIcon />}
        style={{ marginLeft: "auto" }}
      >
        Add another State
      </Button>
    </div>
  );
};

export default ESICComponent;
