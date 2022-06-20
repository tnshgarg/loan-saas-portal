import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setPfForm } from "../../../../store/actions/registerForm";
import { getDocumentFromPfFormDetails } from "../../../../helpers/getDocumentFromState";
import { NO_CHANGE_ERROR } from "../../../../helpers/messageStrings";
import { postRegisterFormData } from "../../../../services/user.services";
import FormInput from "../../../common/FormInput";

const EPFOComponent = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { pf_username: pfUsernameInitial, pf_password: pfPasswordInitial } =
    useSelector((state) => state.registerForm.pfFormDetails) || "";

  const { jwtToken } =
    useSelector((state) => state.auth.user?.signInUserSession.idToken) ?? "";

  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

  const [isComponentDisabled, setIsComponentDisabled] = useState(true);

  const {
    register,
    getValues,
    handleSubmit,
    // watch,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
      pf_username: pfUsernameInitial,
      pf_password: pfPasswordInitial,
    },
    mode: "all",
  });

  useEffect(() => {
    return () => {
      const pfFormDetailsNew = getValues();
      const { pf_username: pfUserNameNew, pf_password: pfPasswordNew } =
        pfFormDetailsNew;
      const isEqual =
        pfUserNameNew === pfUsernameInitial &&
        pfPasswordNew === pfPasswordInitial;
      if (!isEqual) {
        dispatch(setPfForm(pfUserNameNew, pfPasswordNew));
      }
    };
  }, [dispatch, getValues, pfPasswordInitial, pfUsernameInitial]);

  const toggleDisabledStatus = () => {
    setIsComponentDisabled(!isComponentDisabled);
  };

  const onSubmit = (pfFormDetailsNew) => {
    const { pf_username: pfUserNameNew, pf_password: pfPasswordNew } =
      pfFormDetailsNew;
    const isEqual =
      pfUserNameNew === pfUsernameInitial &&
      pfPasswordNew === pfPasswordInitial;
    if (!isEqual) {
      dispatch(setPfForm(pfUserNameNew, pfPasswordNew));
      postRegisterFormData(
        jwtToken,
        getDocumentFromPfFormDetails(employerId, pfFormDetailsNew)
      )
        .then((response) => {
          const message = response.data.body.message;
          alert.success(message);
        })
        .catch((error) => {
          const message = error.response?.data?.message ?? "Some error occured";
          alert.error(message);
        });
    } else {
      alert.error(NO_CHANGE_ERROR);
    }
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input
  console.log({ dirtyFields, errors });

  return (
    <div>
      <h5>EPFO Portal Credentials</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <FormInput
          register={register}
          validations={{
            required: true,
            pattern: {
              value: /^[A-Za-z0-9]+$/,
            },
          }}
          errors={errors}
          field={"pf_username"}
          inputProps={{
            icon: "user",
            label: "Username",
            placeholder: "Please enter EPFO Portal Username",
            errorMessage: "Please enter EPFO Portal Username",
          }}
        />
        <FormInput
          register={register}
          validations={{
            required: true,
          }}
          errors={errors}
          field={"pf_password"}
          inputProps={{
            icon: "shield",
            type: "password",
            disabled: { isComponentDisabled },
            label: "Password",
            placeholder: "Please enter company's EPFO Portal Password",
            errorMessage: "Please enter company's EPFO Portal Password",
          }}
        />
        <input type="submit" value={isComponentDisabled ? "Edit" : "Submit"} />

        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <p>This field is required</p>} */}
      </form>
    </div>
  );
};

export default EPFOComponent;
