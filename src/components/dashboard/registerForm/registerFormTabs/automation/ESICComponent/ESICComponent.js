import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { setEsicStateForm } from "../../../../../../actions/registerForm";
import statesAndUts from "../../../../../../helpers/statesAndUts";
import "./ESICComponentStyles.css";

const ESICStateComponent = ({
  esicStateInitial,
  esicStateOtherInitial,
  esicEmployerCodeInitial,
  esicPasswordInitial,
}) => {
  const [successful, setSuccessful] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message } = useSelector((state) => state.message);

  const states = Object.keys(statesAndUts).map((indianState) => {
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
    // formState: { errors },
  } = useForm({
    defaultValues: {
      esic_state: esicStateInitial,
      esic_state_other: esicStateOtherInitial,
      esic_employer_code: esicEmployerCodeInitial,
      esic_password: esicPasswordInitial,
    },
  });

  useEffect(() => {
    return () => {
      const data = getValues();
      const {
        esic_state,
        esic_state_other,
        esic_employer_code,
        esic_password,
      } = data || "";
      const isEmpty =
        (esic_employer_code === "" ||
          esic_employer_code === null ||
          esic_employer_code === undefined) &
        (esic_password === "" ||
          esic_password === null ||
          esic_password === undefined);
      if (!isEmpty) {
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
  }, [dispatch, getValues]);

  const onSubmit = (data) => {
    console.log(data);
    setIsComponentDisabled(!isComponentDisabled);
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-row">
        {/* register your input into the hook by invoking the "register" function */}

        <div className="form-row-new">
          <label>State</label>
          {showOtherIndianState && <label>Please enter</label>}
          <label>ESIC Employer Establishment Code</label>
          <label>Password</label>
          <label>Action</label>
        </div>

        <div className="form-row-new">
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
            <input
              {...register("esic_state_other")}
              disabled={isComponentDisabled}
            />
          )}

          <input
            {...register("esic_employer_code")}
            disabled={isComponentDisabled}
          />

          <input
            type="password"
            {...register("esic_password")}
            disabled={isComponentDisabled}
          />
          {/* include validation with required or other standard HTML validation rules */}
          {/* errors will return when field validation fails  */}
          {/* {errors.exampleRequired && <p>This field is required</p>} */}
          <input type="submit" value={isComponentDisabled ? "edit" : "lock"} />
        </div>
      </form>
    </div>
  );
};

const ESICComponent = () => {
  const [stateCount, setStateCount] = useState(0);

  const { esicFormDetails: initialEsicFormDetails } =
    useSelector((state) => state.registerForm) || {};

  useEffect(() => {
    console.log(initialEsicFormDetails);
  }, [initialEsicFormDetails]);

  return (
    <div>
      <h1>Enter your ESIC details</h1>

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
