import { Button, Card, Elevation, Intent } from "@blueprintjs/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../common/FormInput";
import { forgotPassword } from "../../store/slices/authSlice";

const LOGIN_CARD_STYLING = {
  width: "20%",
  minWidth: "500px",
  marginRight: "auto",
  marginLeft: "auto",
  marginTop: "20vh",
};

const LOGIN_CONTAINER_STYLING = {
  textAlign: "center",
  padding: "2em",
};

const INPUT_CONTAINER_STYLING = {
  textAlign: "left",
  padding: "2em",
  paddingBottom: "0",
};

export const ResetPassword = () => {
  const [successful, setSuccessful] = useState(false);
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
    const { email: username } = data;

    dispatch(forgotPassword(username))
      .then(() => {
        setSuccessful(true);
        navigate("/confirm-reset-password");
      })
      .catch(() => {
        setSuccessful(false);
      });
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card style={LOGIN_CARD_STYLING} elevation={Elevation.TWO}>
          <div style={LOGIN_CONTAINER_STYLING}>
            <h5>Reset Password</h5>
            <div style={INPUT_CONTAINER_STYLING}>
              <FormInput
                register={register}
                validations={{
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  },
                }}
                errors={errors}
                field={"email"}
                inputProps={{
                  icon: "envelope",
                  type: "email",
                  label: "Email",
                  placeholder: "Email",
                  errorMessage: "Enter a valid email address",
                }}
              />

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
            <Button type="submit" large intent={Intent.PRIMARY}>
              Submit
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};
