import { Button, Card, Elevation, Intent } from "@blueprintjs/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../common/FormInput";
import { forgotPassword } from "../../store/slices/authSlice";

const LOGIN_CARD_STYLING = {
  width: "30%",
  marginTop: "5%",
  marginRight: "auto",
  marginLeft: "auto",
};

const LOGIN_CONTAINER_STYLING = {
  textAlign: "center",
  padding: "5%",
};

const INPUT_CONTAINER_STYLING = {
  padding: "10%",
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
      <Card style={LOGIN_CARD_STYLING} elevation={Elevation.TWO}>
        <div style={LOGIN_CONTAINER_STYLING}>
          <h5>Reset Password</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder: "Email",
                  errorMessage: "Enter a valid email address",
                }}
              />
            </div>
            <Button type="submit" large intent={Intent.PRIMARY}>
              Submit
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};
