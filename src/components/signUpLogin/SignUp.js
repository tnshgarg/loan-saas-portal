import { Tooltip2 } from "@blueprintjs/popover2";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import ErrorDialog from "../../atomic/atoms/alerts/ErrorDialog";
import FormInput from "../../atomic/atoms/forms/FormInput";
import { confirmSignUp, registerUser } from "../../store/slices/authSlice";
import {
  companyTypes,
  numberOfEmployees,
  states,
} from "../../utils/numberOfEmployees";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Input,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
  Button,
} from "@material-tailwind/react";

import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import TextInput from "../../newComponents/TextInput";
import PhoneInput from "../../newComponents/PhoneInput";
import AuthNavbar from "../../layout/AuthNavbar";
import PrimaryButton from "../../newComponents/PrimaryButton";
import OtpInput from "../../newComponents/OtpInput";

import CustomStepper from "../../newComponents/cards/CustomStepper";
import DropdownInput from "../../newComponents/DropdownInput";

export const SignUp = () => {
  var md5 = require("md5");
  const [moduleSelected, setModuleSelected] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preferredModules, setPreferredModules] = useState([]);

  const { message } = useSelector((state) => state.message);

  const {
    register,
    getValues,
    watch,
    handleSubmit,
    setValue,
    control,
    // watch,
    formState: { errors, dirtyFields },
  } = useForm({ mode: "all" });

  const values = getValues();
  const {
    email: username,
    password,
    email,
    phone_number,
    name,
    company_name,
    brand_name,
    company_type,
    employee_count,
    designation,
    address,
    state,
    pin,
    gstin,
    pan,
    tan,
    cin,
    sales_id,
    access_key,
    preferredModules: preferred_modules,
  } = values;
  const onSubmit = () => {
    console.log(values);

    dispatch(
      registerUser(
        username,
        password,
        access_key,
        email,
        `+91${phone_number}`,
        name,
        company_name,
        company_type,
        employee_count,
        designation,
        sales_id,
        address,
        state,
        pin,
        gstin,
        pan,
        tan,
        cin,
        preferred_modules,
        brand_name
      )
    )
      .then(() => {
        setSuccessful(true);
        setActiveStep(3);
        // navigate("/confirm-sign-up");
      })
      .catch(() => {
        setSuccessful(false);
      });
  }; // your form submit function which will invoke after successful validation

  const onSubmitOtp = () => {
    const username = message;
    console.log(username, otp);
    var numOtp = parseInt(otp);
    console.log({ numOtp });

    dispatch(confirmSignUp(username, otp))
      .then(() => {
        setSuccessful(true);
        navigate("/auth/login", { replace: true });
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  const data = [
    {
      label: "GETTING STARTED",
      value: 1,
      header: "Unipe For Employers",
      subHeader: "Pay your employees with ease",
      points: [
        "Ensure on-time payroll, every time.",
        "Offer On-Demand Salary with zero hassle.",
        "Boost retention and attract top-tier talent.",
      ],
    },
    {
      label: "COMPANY INFO",
      value: 2,

      header: "Empower Your Workforce with Unipe",
      subHeader:
        "On-Time and On-Demand Salary That Will Make Your Employees Happy!",
      points: [
        "Say goodbye to late salary issues.",
        "Real-time salary advances for employee needs.",
        "Transform the way your business handles payroll.",
      ],
    },
    {
      label: "ADDITIONAL INFO",
      value: 3,

      header: "Optimize Your Unipe Experience",
      subHeader: "Provide additional info for tailored services",
      points: [
        "Cross-check and affirm your business identity.",
        "Help us evaluate your company's eligibility swiftly.",
        "Optimal service recommendations based on detailed info.",
      ],
    },
    {
      label: "VERIFICATION",
      value: 4,

      header: "Your Security is Our Priority",
      subHeader: " Verify to ensure your account's safety.",
      points: [
        "OTP ensures secure and verified access.",
        "We value and protect your business data.",
        "Join the Unipe community with confidence.",
      ],
    },
  ];

  const moduleData = [
    {
      label: "GETTING STARTED",
      value: 1,
      header: "Become part of the Unipe Family",
      subHeader: "Pay your employees with ease",
      points: [
        "Streamlined Payroll Finance for your business.",
        "Offer employees on-demand salaries.",
        "Enhance financial well-being for your workforce.",
      ],
    },
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [otp, setOtp] = useState("");

  // console.log(watch("example")); // you can watch individual input by pass the name of the input
  return (
    // <div>
    //   <form onSubmit={(e) => e.preventDefault()}>
    //     {/* register your input into the hook by invoking the "register" function */}
    //     <MultistepDialog
    //       lazy={false}
    //       icon="info-sign"
    //       isOpen={true}
    //       title={"Sign Up"}
    //       navigationPosition={"top"}
    //       isCloseButtonShown={false}
    //       usePortal={false}
    //       backdropProps={{
    //         style: {
    //           backgroundColor: "rgba(0,0,0,0)",
    //         },
    //       }}
    //       finalButtonProps={{
    //         disabled: Object.keys(errors).length,
    //         type: "submit",
    //         onClick: handleSubmit(onSubmit),
    //       }}
    //     >
    //       <DialogStep
    //         id="login-details"
    //         title="Login Details"
    //         nextButtonProps={{
    //           disabled:
    //             !(
    //               dirtyFields.access_key &&
    //               dirtyFields.email &&
    //               dirtyFields.password
    //             ) ||
    //             errors.access_key ||
    //             errors.email ||
    //             errors.password,
    //         }}
    //         panel={
    //           <Card>
    //             <FormInput
    //               register={register} errors={errors}
    //               validations={{
    //                 required: true,
    //                 validate: {
    //                   hash: (v) => {
    //                     return (v || "").length
    //                   },
    //                 },
    //               }}
    //               errors={errors}
    //               field={"access_key"}
    //               inputProps={{
    //                 icon: "key",
    //                 type: "text",
    //                 label: "Access Key",
    //                 placeholder: "Access Key",
    //                 errorMessage: "Enter a valid access key",
    //               }}
    //             />
    //             <FormInput
    //               register={register} errors={errors}
    //               validations={{
    //                 required: true,
    //                 pattern: {
    //                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    //                 },
    //               }}
    //               errors={errors}
    //               field={"email"}
    //               inputProps={{
    //                 icon: "envelope",
    //                 type: "email",
    //                 label: "Email",
    //                 placeholder: "Email",
    //                 errorMessage: "Enter a valid email address",
    //               }}
    //             />
    //             <FormInput
    //               register={register} errors={errors}
    //               validations={{
    //                 required: true,
    //                 pattern: {
    //                   value:
    //                     /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/,
    //                 },
    //               }}
    //               errors={errors}
    //               field={"password"}
    //               inputProps={{
    //                 rightElement: (
    //                   <Tooltip2
    //                     content={`${showPassword ? "Hide" : "Show"} Password`}
    //                   >
    //                     <Button
    //                       icon={showPassword ? "unlock" : "lock"}
    //                       intent={Intent.WARNING}
    //                       minimal={true}
    //                       onClick={() => setShowPassword(!showPassword)}
    //                     />
    //                   </Tooltip2>
    //                 ),
    //                 icon: "shield",
    //                 type: showPassword ? "text" : "password",
    //                 label: "Password",
    //                 subLabel:
    //                   "Password must contain atleast 8 characters with a special character, a number, a lowercase and an uppercase alphabet",
    //                 placeholder: "Password",
    //                 errorMessage:
    //                   "Password must contain atleast 8 characters with a special character, a number, a lowercase and an uppercase alphabet",
    //               }}
    //             />
    //             <FormInput
    //               register={register} errors={errors}
    //               validations={{
    //                 required: true,
    //               }}
    //               errors={errors}
    //               field={"sales_id"}
    //               inputProps={{
    //                 icon: "id-number",
    //                 type: "text",
    //                 label: "Sales ID",
    //                 placeholder: "Sales ID",
    //                 errorMessage: "Sales ID cannot be empty",
    //               }}
    //             />
    //           </Card>
    //         }
    //       />
    //       <DialogStep
    //         id="personal-details"
    //         title="Personal Details"
    //         panel={
    //           <Card>
    //             <FormInput
    //               register={register} errors={errors}
    //               validations={{
    //                 required: true,
    //               }}
    //               errors={errors}
    //               field={"name"}
    //               inputProps={{
    //                 icon: "user",
    //                 type: "text",
    //                 label: "Full Name",
    //                 placeholder: "Full Name",
    //                 errorMessage: "Full Name cannot be empty",
    //               }}
    //             />
    //             <FormInput
    //               register={register} errors={errors}
    //               validations={{
    //                 required: true,
    //                 pattern: {
    //                   value: /^\d{10}$/,
    //                 },
    //               }}
    //               errors={errors}
    //               field={"phone_number"}
    //               inputProps={{
    //                 icon: "phone",
    //                 type: "text",
    //                 label: "Phone Number",
    //                 placeholder: "Enter you 10-digit phone number",
    //                 errorMessage: "Enter 10 digit number",
    //               }}
    //             />
    //           </Card>
    //         }
    //       />
    // <DialogStep
    //   id="company-details"
    //   title="Company Details"
    //   panel={
    //     <Card>
    //       <FormInput
    //         register={register} errors={errors}
    //         validations={{
    //           required: true,
    //         }}
    //         errors={errors}
    //         field={"company_name"}
    //         inputProps={{
    //           icon: "office",
    //           type: "text",
    //           label: "Company Name",
    //           placeholder: "Company Name",
    //           errorMessage: "Company Name cannot be empty",
    //         }}
    //       />
    //       <FormInput
    //         register={register} errors={errors}
    //         validations={{
    //           required: true,
    //         }}
    //         errors={errors}
    //         field={"designation"}
    //         inputProps={{
    //           icon: "briefcase",
    //           type: "text",
    //           label: "Designation",
    //           placeholder: "Your designation in the organization",
    //           errorMessage: "Designation cannot be empty",
    //         }}
    //       />
    //       <div
    //         style={{
    //           display: "grid",
    //           gridTemplateColumns: "auto auto",
    //           columnGap: "2em",
    //         }}
    //       >
    //         <div>
    //           {" "}
    //           <label>Type of Company</label>
    //           <Controller
    //             control={control}
    //             defaultValue={companyTypes[0]["value"]}
    //             name="company_type"
    //             render={({ field }) => (
    //               <Select
    //                 inputRef={field.ref}
    //                 classNamePrefix="addl-class"
    //                 options={companyTypes}
    //                 value={companyTypes.find(
    //                   (c) => c.value === field.value
    //                 )}
    //                 onChange={(val) => {
    //                   field.onChange(val.value);
    //                 }}
    //               />
    //             )}
    //           />
    //         </div>
    //         <div>
    //           <FormInput
    //             register={register} errors={errors}
    //             validations={{
    //               required: true,
    //               pattern: {
    //                 value: /^(0|[1-9]\d*)(\.\d+)?$/,
    //               },
    //             }}
    //             errors={errors}
    //             field={"employee_count"}
    //             inputProps={{
    //               icon: "id-number",
    //               type: "text",
    //               label: "Number of Employees",
    //               placeholder: "Number of Employees",
    //               errorMessage:
    //                 "Number of Employees should be a non-empty number",
    //             }}
    //           />
    //         </div>
    //       </div>
    //     </Card>
    //   }
    // />
    //     </MultistepDialog>
    //   </form>
    //   <ErrorDialog message={message} success={successful} />
    // </div>
    <>
      <AuthNavbar />
      {!moduleSelected ? (
        <div className="container mx-auto grid grid-cols-5 gap-8 mt-8 min-h-[40rem]">
          <Card className="xl:col-span-2 col-span-5 w-full bg-transparent flex flex-col justify-center shadow-none pr-12">
            <Typography color="white" className="font-bold text-[2rem] my-1">
              {moduleData[0]?.header}
            </Typography>
            <Typography
              variant="paragraph"
              color="white"
              className="text-lg font-normal"
            >
              {moduleData[0]?.subHeader}
            </Typography>
            <ul style={{ listStyleType: "disc" }} className="text-white pt-8">
              {moduleData[0]?.points.map((item, index) => (
                <li className="my-1 text-md font-light font-sans">{item}</li>
              ))}
            </ul>
          </Card>
          <Card className="xl:col-span-3 w-full p-0 m-0 col-span-5">
            <>
              <CardHeader
                className="py-2 grid place-items-center shadow-none bg-white m-0"
                floated={false}
              >
                <Typography variant="h5" className="text-lg text-black mt-4">
                  Choose your preferred module(s)
                </Typography>
                <Typography variant="paragraph" className="text-sm text-gray">
                  Tailor your Unipe experience to best fit your company's needs.
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col gap-4 w-full px-36 bg-white">
                <form className="flex flex-col gap-4 w-full mt-0">
                  {["On-demand Salary", "Payroll Finance"].map(
                    (item, index) => (
                      <div className="w-full border-lightGray border px-4 rounded-md flex flex-row items-center justify-between">
                        <Typography className="text-black text-sm font-normal">
                          {item}
                        </Typography>
                        <Checkbox
                          color="gray"
                          onClick={(e) => {
                            let arr = [];
                            console.log(item);
                            arr = preferredModules;
                            // setPreferredModules(arr.push(item));
                            console.log({ arr });
                          }}
                        />
                      </div>
                    )
                  )}
                  <PrimaryButton
                    className="w-[60%] self-center mt-12"
                    size="lg"
                    title={"NEXT"}
                    color="primary"
                    // disabled={!preferredModules.length}
                    // type="submit"
                    onClick={() => setModuleSelected(true)}
                    // disabled={preferredModules.length == 0}
                  />
                </form>
              </CardBody>
            </>

            <CardFooter className="pt-0 flex flex-col grow items-center bg-white rounded-xl">
              <Typography className="flex justify-center flex-row items-center w-full text-xs">
                <a
                  href="https://www.unipe.money/privacy-policy"
                  target="_blank"
                >
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
      ) : (
        <div className="container mx-auto grid grid-cols-5 gap-8 mt-8 min-h-[40rem]">
          <Card className="col-span-2 w-full bg-transparent flex flex-col justify-center shadow-none pr-12">
            <Typography color="white" className="font-bold text-[2rem] my-1">
              {data[activeStep]?.header}
            </Typography>
            <Typography
              variant="paragraph"
              color="white"
              className="text-lg font-normal"
            >
              {data[activeStep]?.subHeader}
            </Typography>
            <ul style={{ listStyleType: "disc" }} className="text-white pt-8">
              {data[activeStep]?.points.map((item, index) => (
                <li className="my-1 text-md font-light font-sans">{item}</li>
              ))}
            </ul>
          </Card>
          <Card className="col-span-3 w-full p-0 m-0 ">
            <CustomStepper
              steps={data}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />

            {activeStep == 0 && (
              <>
                <CardHeader
                  className="py-2 grid place-items-center shadow-none bg-[#f9f9fb] m-0"
                  floated={false}
                >
                  <Typography variant="h5" className="text-lg text-black mt-4">
                    Let's get started on Unipe
                  </Typography>
                  <Typography variant="paragraph" className="text-sm text-gray">
                    Let's begin with some basic info
                  </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4 w-full px-36 bg-[#f9f9fb] pb-2">
                  <form
                    className="flex flex-col gap-2 w-full mt-0"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <TextInput
                      size={"lg"}
                      label="Full Name"
                      type="text"
                      register={register}
                      errors={errors}
                      validations={{
                        required: true,
                      }}
                      field={"name"}
                      errorMessage="Full Name cannot be empty"
                    />

                    <TextInput
                      type="email"
                      label="Email"
                      size="lg"
                      register={register}
                      errors={errors}
                      validations={{
                        required: true,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        },
                      }}
                      errorMessage={"Enter a valid email address"}
                      field={"email"}
                    />

                    <PhoneInput
                      label="Mobile Number"
                      size="lg"
                      register={register}
                      errors={errors}
                      validations={{
                        required: true,
                        pattern: {
                          value: /^\d{10}$/,
                        },
                      }}
                      errorMessage="Enter you 10-digit phone number"
                      field={"phone_number"}
                    />

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
                    {/* <Typography className="text-[10px] text-gray w-full font-normal leading-3">
                      Please note: Password must contain atleast 8 characters
                      with a special character, a number, a lowercase and an
                      uppercase alphabet
                    </Typography> */}

                    <TextInput
                      size={"lg"}
                      label="Reference ID (Optional)"
                      type="text"
                      register={register}
                      errors={errors}
                      validations={{
                        required: true,
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        },
                      }}
                      field={"sales_id"}
                    />
                    <TextInput
                      size={"lg"}
                      label="Access Key"
                      type="text"
                      register={register}
                      errors={errors}
                      validations={{
                        required: true,
                        validate: {
                          hash: (v) => {
                            return (v || "").length;
                          },
                        },
                      }}
                      field={"access_key"}
                      errorMessage="Enter a valid access key"
                    />
                    <PrimaryButton
                      className="w-[60%] self-center "
                      size="lg"
                      title={"NEXT"}
                      color="primary"
                      type="submit"
                      onClick={() => {
                        setActiveStep(1);
                      }}
                      disabled={
                        !(
                          dirtyFields.access_key &&
                          dirtyFields.email &&
                          dirtyFields.password &&
                          dirtyFields.phone_number
                        ) ||
                        errors.access_key ||
                        errors.email ||
                        errors.password ||
                        errors.phone_number ||
                        values["password"] != values["confirmPassword"]
                      }
                    />
                  </form>
                </CardBody>
              </>
            )}
            {activeStep == 1 && (
              <>
                <CardHeader
                  className="py-2 grid place-items-center shadow-none bg-[#f9f9fb] m-0"
                  floated={false}
                >
                  <Typography variant="h5" className="text-lg text-black mt-4">
                    Welcome to Unipe
                  </Typography>
                  <Typography variant="paragraph" className="text-sm text-gray">
                    Tell us about your company
                  </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-2 w-full px-36 bg-[#f9f9fb]">
                  <TextInput
                    size={"lg"}
                    label="Company Name"
                    type="text"
                    register={register}
                    errors={errors}
                    validations={{
                      required: true,
                    }}
                    field={"company_name"}
                    errorMessage="Company Name cannot be empty"
                  />

                  <TextInput
                    type="text"
                    label="Brand Name"
                    size="lg"
                    register={register}
                    errors={errors}
                    validations={{
                      required: true,
                    }}
                    field={"brand_name"}
                    errorMessage="Brand Name cannot be empty"
                  />
                  <TextInput
                    type="text"
                    label="Your Designation"
                    size="lg"
                    register={register}
                    errors={errors}
                    validations={{
                      required: true,
                    }}
                    field={"designation"}
                    errorMessage="Designation cannot be empty"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <DropdownInput
                      type="text"
                      label="Type of company"
                      size="lg"
                      register={register}
                      errors={errors}
                      options={companyTypes}
                      defaultValue={companyTypes[0]["value"]}
                      validations={{
                        required: true,
                      }}
                      field={"company_type"}
                      errorMessage="Type of company cannot be empty"
                      setValue={setValue}
                      control={control}
                    />

                    <DropdownInput
                      type="text"
                      label="No. of emp"
                      size="lg"
                      register={register}
                      errors={errors}
                      validations={{
                        required: true,
                      }}
                      options={numberOfEmployees}
                      defaultValue={numberOfEmployees[0]["value"]}
                      field={"employee_count"}
                      errorMessage="No. of emp cannot be empty"
                      setValue={setValue}
                      control={control}
                    />
                  </div>

                  <TextInput
                    size={"lg"}
                    label="Registered Address"
                    type="text"
                    register={register}
                    errors={errors}
                    validations={{
                      required: true,
                    }}
                    field={"address"}
                    errorMessage="Registered address cannot be empty"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <DropdownInput
                      size="lg"
                      type="text"
                      label="State"
                      register={register}
                      errors={errors}
                      validations={{
                        required: true,
                      }}
                      defaultValue={states[0]["value"]}
                      options={states}
                      field={"state"}
                      errorMessage="State cannot be empty"
                      setValue={setValue}
                      control={control}
                    />

                    <TextInput
                      type="text"
                      label="Pin"
                      size="lg"
                      register={register}
                      errors={errors}
                      validations={{
                        required: true,
                      }}
                      field={"pin"}
                      errorMessage="Pin cannot be empty"
                    />
                  </div>
                  <PrimaryButton
                    className="w-[60%] self-center "
                    size="lg"
                    title={"PROCEED"}
                    color="primary"
                    onClick={() => {
                      setActiveStep(2);
                      // console.log(values);
                    }}
                    disabled={
                      !(
                        dirtyFields.company_name &&
                        dirtyFields.brand_name &&
                        dirtyFields.designation &&
                        dirtyFields.company_type &&
                        dirtyFields.employee_count &&
                        dirtyFields.address &&
                        dirtyFields.state &&
                        dirtyFields.pin
                      ) ||
                      errors.company_name ||
                      errors.brand_name ||
                      errors.designation ||
                      errors.company_type ||
                      errors.employee_count ||
                      errors.address ||
                      errors.state ||
                      errors.pin
                    }
                  />
                </CardBody>
              </>
            )}
            {activeStep == 2 && (
              <>
                <CardHeader
                  className="py-2 grid place-items-center shadow-none bg-[#f9f9fb] m-0"
                  floated={false}
                >
                  <Typography variant="h5" className="text-lg text-black mt-4">
                    Optional Company details
                  </Typography>
                  <Typography variant="paragraph" className="text-sm text-gray">
                    These will help us offer a tailored experience
                  </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-2 w-full px-36 bg-[#f9f9fb]">
                  <TextInput
                    size={"lg"}
                    label="GSTIN"
                    type="text"
                    register={register}
                    errors={errors}
                    field={"gstin"}
                    errorMessage="Enter valid details"
                  />
                  <TextInput
                    size={"lg"}
                    label="PAN"
                    type="text"
                    register={register}
                    errors={errors}
                    field={"pan"}
                    errorMessage="Enter valid details"
                  />
                  <TextInput
                    size={"lg"}
                    label="TAN"
                    type="text"
                    register={register}
                    errors={errors}
                    field={"tan"}
                    errorMessage="Enter valid details"
                  />
                  <TextInput
                    size={"lg"}
                    label="CIN"
                    type="text"
                    register={register}
                    errors={errors}
                    field={"cin"}
                    errorMessage="Enter valid details"
                  />
                  <PrimaryButton
                    className="w-[60%] self-center "
                    size="lg"
                    title={"NEXT"}
                    color="primary"
                    // type="submit"
                    onClick={() => {
                      onSubmit();
                      // setActiveStep(3);
                    }}
                  />
                </CardBody>
              </>
            )}
            {activeStep == 3 && (
              <>
                <CardHeader
                  className="py-2 grid place-items-center shadow-none bg-[#f9f9fb] m-0"
                  floated={false}
                >
                  <Typography variant="h5" className="text-lg text-black mt-4">
                    One last step
                  </Typography>
                  <Typography variant="paragraph" className="text-sm text-gray">
                    Secure your account with the OTP verification
                  </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-2 w-full px-36 bg-[#f9f9fb]">
                  <OtpInput otp={otp} setOtp={setOtp} />
                  <Typography className="self-center my-4 text-[#155263] text-sm font-medium flex flex-row">
                    We've sent an OTP to{"  "}
                    <Typography className="ml-1 text-[#0091FF] text-sm font-semibold">
                      {email}
                    </Typography>
                  </Typography>
                  <PrimaryButton
                    className="w-[60%] self-center "
                    size="lg"
                    title={"PROCEED"}
                    color="primary"
                    disabled={otp.length != 6}
                    // type="submit"
                    onClick={onSubmitOtp}
                  />
                </CardBody>
              </>
            )}

            <CardFooter className="pt-0 flex flex-col grow items-center bg-[#f9f9fb] rounded-xl">
              <ErrorDialog message={message} success={successful} />
              <Typography className="flex justify-center flex-row items-center w-full text-xs">
                <a
                  href="https://www.unipe.money/privacy-policy"
                  target="_blank"
                >
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
      )}
    </>
  );
};
