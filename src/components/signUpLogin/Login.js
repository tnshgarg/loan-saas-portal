import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/slices/authSlice";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";

import TextInput from "../../newComponents/TextInput";
import AuthNavbar from "../../layout/AuthNavbar";
import PrimaryButton from "../../newComponents/PrimaryButton";
import ErrorDialog from "../../atomic/atoms/alerts/ErrorDialog";

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
    getValues,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm();

  const values = getValues();

  const onSubmit = () => {
    const { email: username, password } = values;

    dispatch(login(username, password))
      .then(() => {
        setSuccessful(true);
        navigate("/dashboard/employer", { replace: true });
      })
      .catch(() => {
        setSuccessful(false);
      });
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    // <div className="bg-white">
    //   <Card style={LOGIN_CARD_STYLING} elevation={Elevation.TWO}>
    //     <div style={LOGIN_CONTAINER_STYLING}>
    //       <img src={unipeLogo} alt="unipe logo" style={{ width: "50%" }} />
    //       <div style={INPUT_CONTAINER_STYLING}>
    //         <form onSubmit={handleSubmit(onSubmit)}>
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
    //               large: true,
    //               type: "email",
    //               placeholder: "Email",
    //               errorMessage: "Enter a valid email address",
    //             }}
    //           />
    //           <FormInput
    //             register={register}
    //             validations={{
    //               required: true,
    //               pattern: {
    //                 value:
    //                   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //               },
    //             }}
    //             errors={errors}
    //             field={"password"}
    //             inputProps={{
    //               icon: "shield",
    //               large: true,
    //               type: "password",
    //               placeholder: "Password",
    //               errorMessage:
    //                 "Password must contain atleast 8 characters with a special character, a number, a lowercase and an uppercase alphabet",
    //             }}
    //           />
    //           <Button
    //             type="submit"
    //             large
    //             intent={Intent.PRIMARY}
    //             style={{ float: "left" }}
    //           >
    //             Sign In
    //           </Button>
    //         </form>

    //         <Button
    //           type="button"
    //           onClick={handleResetPasswordOnClick}
    //           large
    //           intent={Intent.PRIMARY}
    //           style={{ float: "right" }}
    //         >
    //           Reset Password
    //         </Button>
    //       </div>
    //     </div>
    //   </Card>
    //   <ErrorDialog message={message} success={successful} />
    // </div>
    <>
      <AuthNavbar variant="login" />

      <div className="container mx-auto grid grid-cols-5 gap-8 mt-8 min-h-[40rem]">
        <Card className="xl:col-span-2 col-span-5 w-full bg-transparent flex flex-col justify-center shadow-none pr-12">
          <Typography color="white" className="font-bold text-[2rem] my-1">
            Already Part of the Unipe Family?
          </Typography>
          <Typography
            variant="paragraph"
            color="white"
            className="text-lg font-normal"
          >
            Log in and continue your journey.
          </Typography>
          <ul style={{ listStyleType: "disc" }} className="text-white pt-8">
            <li className="my-1 text-md font-light font-sans">
              Streamlined Payroll Finance for your business.
            </li>
            <li className="my-1 text-md font-light font-sans">
              Offer employees on-demand salaries.
            </li>
            <li className="my-1 text-md font-light font-sans">
              Enhance financial well-being for your workforce.
            </li>
          </ul>
        </Card>
        <Card className="xl:col-span-3 w-full p-0 m-0 col-span-5">
          <CardHeader
            className="py-4 grid place-items-center shadow-none bg-[#f9f9fb] m-0"
            floated={false}
          >
            <Typography variant="h5" className="text-lg text-black mt-4">
              Welcome Back to Unipe!
            </Typography>
            <Typography variant="paragraph" className="text-sm text-gray">
              Enter your login details below
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 w-full px-36 bg-[#f9f9fb]">
            <form
              className="flex flex-col gap-2 w-full mt-8"
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
              <TextInput
                type="password"
                label="Password"
                id="password"
                size="lg"
                register={register}
                validations={{
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  },
                }}
                field={"password"}
                errors={errors}
                errorMessage={
                  "Password must contain atleast 8 characters with a special character, a number, a lowercase and an uppercase alphabet"
                }
              />

              <a href="/auth/reset-password" className="self-end mb-8">
                <Typography as="span" className="text-xs text-secondary">
                  Forgot password?
                </Typography>
              </a>
              <ErrorDialog message={message} success={successful} />
              <PrimaryButton
                className="w-[60%] self-center "
                size="lg"
                title={"LOGIN"}
                color="primary"
                onClick={() => {
                  onSubmit();
                }}
                disabled={
                  !(dirtyFields.email && dirtyFields.password) ||
                  errors.email ||
                  errors.password
                }
              />
            </form>
          </CardBody>
          <CardFooter className="pt-0 flex flex-col grow items-center bg-[#f9f9fb] rounded-xl">
            <Typography className="flex justify-center flex-row items-center w-full text-xs">
              <a href="https://www.unipe.money/privacy-policy" target="_blank">
                <Typography as="span" className="text-xs text-secondary">
                  Privacy Policy
                </Typography>
              </a>
              <Typography as="span" className="mx-1 text-xs">
                &
              </Typography>
              <a
                href="https://www.unipe.money/terms-of-service"
                target="_blank"
              >
                <Typography as="span" className="text-xs mr-1 text-secondary">
                  Terms of service
                </Typography>
              </a>
              apply
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
