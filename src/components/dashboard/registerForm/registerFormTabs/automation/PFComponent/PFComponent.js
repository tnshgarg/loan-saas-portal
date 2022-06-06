import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPfForm } from "../../../../../../actions/registerForm";
import "./PFComponentStyles.css";

const PFComponent = () => {
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pf_username: pfUsernameInitial, pf_password: pfPasswordInitial } =
    useSelector((state) => state.registerForm.pfFormDetails) || "";

  const [isComponentDisabled, setIsComponentDisabled] = useState(true);

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
    setIsComponentDisabled(!isComponentDisabled);
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <div>
      <h1>Enter your PF details</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-row">
        {/* register your input into the hook by invoking the "register" function */}
        <div className="form-row-new">
          <label>Username</label>
          <label>Password</label>
          <label>Action</label>
        </div>

        <div className="form-row-new">
          <input {...register("pf_username")} disabled={isComponentDisabled} />
          <input
            type="password"
            {...register("pf_password")}
            disabled={isComponentDisabled}
          />
          <input type="submit" value={isComponentDisabled ? "edit" : "lock"} />
        </div>

        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <p>This field is required</p>} */}
      </form>
    </div>
  );
};

export default PFComponent;
