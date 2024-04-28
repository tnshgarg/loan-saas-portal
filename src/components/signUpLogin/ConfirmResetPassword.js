import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "../../atomic/atoms/alerts/ErrorDialog";
import FormInput from "../../atomic/atoms/forms/FormInput";
import { confirmForgotPassword } from "../../store/slices/authSlice";
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

export const ConfirmResetPassword = () => {
  const [successful, setSuccessful] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message } = useSelector((state) => state.message);

  const {
    register,
    watch,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm({ mode: "all" });

  const values = getValues();

  const onSubmit = () => {
    // console.log(data);
    const { code, password } = values;
    const username = message;
    console.log(username, code, password);

    dispatch(confirmForgotPassword(username, code, password))
      .then(() => {
        setSuccessful(true);
        navigate("/auth/login", { replace: true });
      })
      .catch(() => {
        setSuccessful(false);
      });
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    // <div>
    //   <Card style={LOGIN_CARD_STYLING} elevation={Elevation.TWO}>
    //     <div style={LOGIN_CONTAINER_STYLING}>
    //       <h5>Confirm New Password</h5>
    //       <form onSubmit={handleSubmit(onSubmit)}>
    //         <div style={INPUT_CONTAINER_STYLING}>
    //           <FormInput
    //             register={register}
    //             errors={errors}
    //             field={"code"}
    //             inputProps={{
    //               icon: "id-number",
    //               type: "code",
    //               label: "Verification Code",
    //               placeholder: "Enter verification code received in email",
    //               errorMessage: "Verification Code cannot be empty",
    //             }}
    //           />
    //           <FormInput
    //             register={register}
    //             validations={{
    //               required: true,
    //               pattern: {
    //                 value:
    //                   /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/,
    //               },
    //             }}
    //             errors={errors}
    //             field={"password"}
    //             inputProps={{
    //               icon: "shield",
    //               type: "password",
    //               label: "New Password",
    //               subLabel:
    //                 "Password must contain atleast 8 characters with a special character, a number, a lowercase and an uppercase alphabet",
    //               placeholder: "Enter your new password",
    //               errorMessage:
    //                 "Password must contain atleast 8 characters with a special character, a number, a lowercase and an uppercase alphabet",
    //             }}
    //           />
    //         </div>
    //         <Button type="submit" large intent={Intent.PRIMARY}>
    //           Submit
    //         </Button>
    //       </form>
    //     </div>
    //   </Card>
    //   <ErrorDialog message={message} success={successful} />
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
              Check Your Email
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs font-normal text-gray w-3/5 text-center"
            >
              We've sent a verification code to your email. Please enter the
              code to proceed.
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 w-full px-36 bg-[#f9f9fb]">
            <form
              className="flex flex-col gap-2 w-full mt-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <TextInput
                type="text"
                label="Enter Verification Code"
                size="lg"
                register={register}
                validations={{
                  required: true,
                }}
                errors={errors}
                errorMessage={"Verification code cannot be empty"}
                field={"code"}
              />
              <div>
                <Typography className="text-sm font-semibold text-black mt-4">
                  Set Your New Password
                </Typography>
                <Typography className="text-sm font-normal text-gray mb-4">
                  For your security, please create a new password for your
                  account.
                </Typography>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <TextInput
                  type="password"
                  label="Password"
                  size="lg"
                  register={register}
                  errors={errors}
                  validations={{
                    required: true,
                    pattern: {
                      value:
                        /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/,
                    },
                  }}
                  errorMessage="Invalid Password"
                  field={"password"}
                  securedEntry={true}
                />
                <TextInput
                  type="password"
                  label="Re-enter Password"
                  size="lg"
                  register={register}
                  errors={errors}
                  validations={{
                    required: true,
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Your passwords do no match";
                      }
                    },
                  }}
                  errorMessage="Password does not match"
                  // errorMessage=""
                  //errorMessage="Password must contain atleast 8 characters with a special character, a number, a lowercase and an uppercase alphabet"
                  field={"confirmPassword"}
                />
              </div>
              <Typography className="text-xs font-normal text-gray my-4">
                Please note: Password must contain atleast 8 characters with a
                special character, a number, a lowercase and an uppercase
                alphabet
              </Typography>

              <PrimaryButton
                className="w-[60%] self-center"
                size="lg"
                title={"UPDATE PASSWORD"}
                color="primary"
                type="submit"
                onClick={onSubmit}
                disabled={
                  !(
                    dirtyFields.code &&
                    dirtyFields.password &&
                    dirtyFields.confirmPassword
                  ) ||
                  errors.code ||
                  errors.password ||
                  errors.confirmPassword ||
                  values["password"] != values["confirmPassword"]
                }
              />
            </form>
          </CardBody>
          <CardFooter className="flex flex-col grow items-center bg-[#f9f9fb] rounded-xl py-2"></CardFooter>
        </Card>
      </div>
    </>
  );
};
