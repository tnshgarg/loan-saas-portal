import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import statesAndUts from "../../../../../helpers/statesAndUts";
import "./styles.css";

const ESICStateComponent = () => {
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
  const [showOtherIndianState, setShowOtherIndianState] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    // watch,
    // formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
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
              options={states}
              value={states.find((c) => c.value === field.value)}
              onChange={(val) => {
                val.value === "Other"
                  ? setShowOtherIndianState(true)
                  : setShowOtherIndianState(false);
                field.onChange(val.value);
              }}
            />
          )}
        />
        {showOtherIndianState && (
          <>
            <label>Please enter</label>
            <input {...register("esic_other_state")} />
          </>
        )}
        <label>ESIC Employer Establishment Code</label>
        <input {...register("esic_employer_code")} />
        <label>Password</label>
        <input type="password" {...register("esic_password")} />
        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <p>This field is required</p>} */}
        <input type="submit" value="next" />
      </form>
    </div>
  );
};

const ESICComponent = () => {
  const [stateCount, setStateCount] = useState(1);

  return (
    <div>
      <h1>Enter your ESIC details</h1>
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
