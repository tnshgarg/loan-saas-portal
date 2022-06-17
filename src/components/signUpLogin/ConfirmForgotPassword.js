import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { confirmForgotPassword } from "../../actions/auth";
import "./styles.css";

export const ConfirmForgotPassword = () => {
  const [successful, setSuccessful] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message } = useSelector((state) => state.message);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({ mode: "all" });
  const onSubmit = (data) => {
    console.log(data);
    const { code, password } = data;
    const username = message;
    console.log(username, code, password);

    dispatch(confirmForgotPassword(username, code, password))
      .then(() => {
        setSuccessful(true);
        navigate("/login");
      })
      .catch(() => {
        setSuccessful(false);
      });
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <div>
      <h1>Enter New Password</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label>Verification Code</label>
        <input {...register("code")} />

        <label>New Password</label>
        <input
          type="password"
          {...register("password", {
            required: true,
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
            },
          })}
        />
        {errors.password && (
          <p>
            Password must contain atleast 8 letters, including numbers,
            uppercase, lowercase and special characters{" "}
          </p>
        )}

        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <p>This field is required</p>} */}

        <input type="submit" />
      </form>
      {message && !successful && (
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
