import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../../atomic/atoms/forms/FormInput";
import { forgotPassword } from "../../store/slices/authSlice";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import AuthNavbar from "../../layout/AuthNavbar";
import TextInput from "../../newComponents/TextInput";
import PrimaryButton from "../../newComponents/PrimaryButton";

export const ResetPassword = () => {
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message } = useSelector((state) => state.message);

  const {
    register,
    handleSubmit,
    getValues,
    // watch,
    formState: { errors },
  } = useForm({ mode: "all" });
  const values = getValues();
  const onSubmit = () => {
    const { email: username } = values;

    dispatch(forgotPassword(username))
      .then(() => {
        setSuccessful(true);
        navigate("/auth/confirm-reset-password");
      })
      .catch(() => {
        setSuccessful(false);
      });
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input
  console.log("ResetPasswordForm", { successful, message });
  return (
    // <div>
    //   <Card style={LOGIN_CARD_STYLING} elevation={Elevation.TWO}>
    //     <div style={LOGIN_CONTAINER_STYLING}>
    //       <h5>Reset Password</h5>
    //       <form onSubmit={handleSubmit(onSubmit)}>
    //         <div style={INPUT_CONTAINER_STYLING}>
    //           <FormInput
    //             register={register}
    //             validations={{
    //               required: true,
    //               pattern: {
    //                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    //               },
    //             }}
    //             errors={errors}
    //             field={"email"}
    //             inputProps={{
    //               icon: "envelope",
    //               type: "email",
    //               placeholder: "Email",
    //               errorMessage: "Enter a valid email address",
    //             }}
    //           />
    //         </div>
    //         <Button type="submit" large intent={Intent.PRIMARY}>
    //           Submit
    //         </Button>
    //       </form>
    //     </div>
    //   </Card>
    // </div>
    <>
      <AuthNavbar variant="login" />

      <div className="container flex flex-col items-center justify-center mt-16 min-h-[40rem]">
        <Card className="w-2/3 p-0 m-0 rounded-xl self-center">
          <CardHeader
            className="py-4 grid place-items-center shadow-none bg-[#f9f9fb] m-0"
            floated={false}
          >
            <Typography variant="h5" className="text-lg text-black mt-4">
              Reset Password
            </Typography>
            <Typography
              variant="paragraph"
              className="text-sm text-gray w-3/5 text-center"
            >
              Enter the email address associated with your account, and we'll
              send a verification code.
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 w-full px-36 bg-[#f9f9fb]">
            <form
              className="flex flex-col gap-4 w-full mt-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <TextInput
                type="email"
                label="Email"
                size="lg"
                register={register}
                validations={{
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  },
                }}
                errors={errors}
                errorMessage={"Enter a valid email address"}
                field={"email"}
              />

              <PrimaryButton
                className="w-[60%] self-center"
                size="lg"
                title={"Send Verification Code"}
                color="primary"
                type="submit"
                disabled={errors.email}
                onClick={onSubmit}
              />
            </form>
          </CardBody>
          <CardFooter className="pt-16 flex flex-col grow items-center bg-[#f9f9fb] rounded-xl">
            <Typography className="flex justify-center flex-row items-center w-full text-xs">
              Remember your password?
              <a href="/auth/login">
                <Typography as="span" className="text-xs text-secondary ml-1">
                  Sign In
                </Typography>
              </a>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
