import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { confirmSignUp } from "../../actions/auth";
import "./styles.css";

const ConfirmSignUp = () => {
  const [successful, setSuccessful] = useState(true);
  const dispatch = useDispatch();

  const { message } = useSelector((state) => state.message);

  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const { code } = data;
    const email = message;
    console.log(email, code);

    dispatch(confirmSignUp(email, code))
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <div>
      <h1>Confirm Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label>Verification Code</label>
        <input {...register("code")} />

        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <p>This field is required</p>} */}

        <input type="submit" />
      </form>
      {message && (
        <div className="form-group">
          <div
            className={
              successful ? "alert alert-success" : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmSignUp;
