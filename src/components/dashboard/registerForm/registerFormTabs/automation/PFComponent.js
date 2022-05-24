import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPfForm } from "../../../../../actions/registerForm";
import "./styles.css";

const PFComponent = () => {
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pf_username: pfUsernameInitial, pf_password: pfPasswordInitial } =
    useSelector((state) => state.registerForm.pfFormDetails) || "";

  const {
    register,
    getValues,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      pf_username: pfUsernameInitial,
      pf_password: pfPasswordInitial,
    },
  });

  useEffect(() => {
    return () => {
      const data = getValues();
      const { pf_username, pf_password } = data;
      const isEmpty = Object.values(data).every((value) => {
        if (value === "") {
          return true;
        }
        return false;
      });
      if (!isEmpty) {
        dispatch(setPfForm(pf_username, pf_password));
      }
    };
  }, [dispatch, getValues]);

  const onSubmit = (data) => {
    console.log(data);
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <div>
      <h1>Enter your PF details</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label>Username</label>
        <input {...register("pf_username")} />
        <label>Password</label>
        <input type="password" {...register("pf_password")} />

        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <p>This field is required</p>} */}

        <input type="submit" value="next" />
      </form>
    </div>
  );
};

export default PFComponent;
