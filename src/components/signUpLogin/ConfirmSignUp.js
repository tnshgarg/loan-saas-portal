import { Button, Card, Elevation, Intent } from "@blueprintjs/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "../common/ErrorDialog";
import FormInput from "../../atomic/atoms/forms/FormInput";
import { confirmSignUp } from "../../store/slices/authSlice";

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
  textAlign: "left",
  padding: "10%",
};

export const ConfirmSignUp = () => {
  const [successful, setSuccessful] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message } = useSelector((state) => state.message);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const { code } = data;
    const username = message;
    console.log(username, code);

    dispatch(confirmSignUp(username, code))
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
      <ErrorDialog message={message} success={successful} />

      <Card style={LOGIN_CARD_STYLING} elevation={Elevation.TWO}>
        <div style={LOGIN_CONTAINER_STYLING}>
          <h5>Confirm Sign Up</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
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
