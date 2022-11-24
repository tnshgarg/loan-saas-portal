import { Button, Card, Elevation, Intent } from "@blueprintjs/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/slices/authSlice";
import ErrorDialog from "../../atomic/atoms/alerts/ErrorDialog";
import FormInput from "../../atomic/atoms/forms/FormInput";
import unipeLogo from "../../theme/logo_new.png";

const LOGIN_CARD_STYLING = {
  width: "35%",
  marginTop: "5%",
  marginRight: "auto",
  marginLeft: "auto",
};

const LOGIN_CONTAINER_STYLING = {
  textAlign: "center",
  padding: "2%",
  marginBottom: "5%",
};

const INPUT_CONTAINER_STYLING = {
  padding: "10%",
};

export const Login = () => {
  const [successful, setSuccessful] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  localStorage.clear();
  const { message } = useSelector((state) => state.message);

  const handleResetPasswordOnClick = () => {
    navigate("/reset-password");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email: username, password } = data;

    dispatch(login(username, password))
      .then(() => {
        setSuccessful(true);
        navigate("/employer/register-form");
      })
      .catch(() => {
        setSuccessful(false);
      });
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <div>
      <Card style={LOGIN_CARD_STYLING} elevation={Elevation.TWO}>
        <div style={LOGIN_CONTAINER_STYLING}>
          <img src={unipeLogo} alt="unipe logo" style={{ width: "50%" }} />
          <div style={INPUT_CONTAINER_STYLING}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  large: true,
                  type: "email",
                  placeholder: "Email",
                  errorMessage: "Enter a valid email address",
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
                  large: true,
                  type: "password",
                  placeholder: "Password",
                  errorMessage:
                    "Password must contain atleast 8 characters with a special character, a number, a lowercase and an uppercase alphabet",
                }}
              />
              <Button
                type="submit"
                large
                intent={Intent.PRIMARY}
                style={{ float: "left" }}
              >
                Sign In
              </Button>
            </form>

            <Button
              type="button"
              onClick={handleResetPasswordOnClick}
              large
              intent={Intent.PRIMARY}
              style={{ float: "right" }}
            >
              Reset Password
            </Button>
          </div>
        </div>
      </Card>
      <ErrorDialog message={message} success={successful} />
    </div>
  );
};
