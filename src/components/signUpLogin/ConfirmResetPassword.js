import { Button, Card, Elevation, Intent } from "@blueprintjs/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../common/FormInput";
import { confirmForgotPassword } from "../../store/slices/authSlice";

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

export const ConfirmResetPassword = () => {
  const [successful, setSuccessful] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message } = useSelector((state) => state.message);

  const {
    register,
    handleSubmit,
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card style={LOGIN_CARD_STYLING} elevation={Elevation.TWO}>
          <div style={LOGIN_CONTAINER_STYLING}>
            <h5>Confirm New Password</h5>
            <div style={INPUT_CONTAINER_STYLING}>
              <FormInput
                register={register}
                errors={errors}
                field={"code"}
                inputProps={{
                  icon: "id-number",
                  type: "code",
                  label: "Verification Code",
                  placeholder: "Enter verification code received in email",
                  errorMessage: "Verification Code cannot be empty",
                }}
              />
              <FormInput
                register={register}
                validations={{
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  },
                }}
                errors={errors}
                field={"password"}
                inputProps={{
                  icon: "shield",
                  type: "password",
                  label: "New Password",
                  subLabel:
                    "Enter a strong atleast 8 lettered password with a special character, a number, a lowercase and an uppercase alphabet",
                  placeholder: "Enter your new password",
                  errorMessage: "Password cannot be empty",
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