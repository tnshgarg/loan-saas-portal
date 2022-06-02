import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPfForm } from "../../../../../../actions/registerForm";
import { getDocumentFromPfFormDetails } from "../../../../../../helpers/getDocumentFromState";
import { NO_CHANGE_ERROR } from "../../../../../../helpers/messageStrings";
import { postRegisterFormData } from "../../../../../../services/user.services";
import "./PFComponentStyles.css";

const PFComponent = () => {
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    // formState: { errors },
  } = useForm({
    defaultValues: {
      pf_username: pfUsernameInitial,
      pf_password: pfPasswordInitial,
    },
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
          const message = error.response.data.message;
          alert.error(message);
        });
    } else if (!isComponentDisabled) {
      alert.error(NO_CHANGE_ERROR);
    }

    setIsComponentDisabled(!isComponentDisabled);
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <div>
      <h1>Enter your PF details</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-row">
        {/* register your input into the hook by invoking the "register" function */}
        <div className="form-row-new">
          <label>Username</label>
          <label>Password</label>
          <label>Action</label>
        </div>

        <div className="form-row-new">
          <input {...register("pf_username")} disabled={isComponentDisabled} />
          <input
            type="password"
            {...register("pf_password")}
            disabled={isComponentDisabled}
          />
          <input type="submit" value={isComponentDisabled ? "edit" : "lock"} />
        </div>

        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <p>This field is required</p>} */}
      </form>
    </div>
  );
};

export default PFComponent;
