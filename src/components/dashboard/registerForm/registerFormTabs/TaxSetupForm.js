import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTaxSetupForm } from "../../../../actions/registerForm";
import { getDocumentFromTaxSetupFormDetails } from "../../../../helpers/getDocumentFromState";
import { NO_CHANGE_ERROR } from "../../../../helpers/messageStrings";
import { postRegisterFormData } from "../../../../services/user.services";
import "./styles.css";

const TaxSetupForm = () => {
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const {
    pan: panInitial,
    tan: tanInitial,
    gstin: gstinInitial,
  } = useSelector((state) => state.registerForm.taxSetupFormDetails) || "";

  const { jwtToken } =
    useSelector((state) => state.auth.user?.signInUserSession.idToken) ?? "";

  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

  const {
    register,
    handleSubmit,
    getValues,
    // watch,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      pan: panInitial,
      tan: tanInitial,
      gstin: gstinInitial,
    },
  });

  useEffect(() => {
    return () => {
      const taxSetupFormDetailsNew = getValues();
      const { pan, tan, gstin } = taxSetupFormDetailsNew;
      const isEqual =
        pan === panInitial && tan === tanInitial && gstin === gstinInitial;
      if (!isEqual) {
        dispatch(setTaxSetupForm(pan, tan, gstin));
      }
    };
  }, [dispatch, getValues, gstinInitial, panInitial, tanInitial]);

  const onSubmit = (taxSetupFormDetailsNew) => {
    const { pan, tan, gstin } = taxSetupFormDetailsNew;
    const isEqual =
      pan === panInitial && tan === tanInitial && gstin === gstinInitial;
    if (!isEqual) {
      dispatch(setTaxSetupForm(pan, tan, gstin));
      postRegisterFormData(
        jwtToken,
        getDocumentFromTaxSetupFormDetails(employerId, taxSetupFormDetailsNew)
      )
        .then((response) => {
          const message = response.data.body.message;
          alert.success(message);
        })
        .catch((error) => {
          const message = error.response.data.message;
          alert.error(message);
        });
    } else {
      alert.error(NO_CHANGE_ERROR);
    }
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label>Company PAN</label>
        <input {...register("pan")} />
        <label>Company TAN</label>
        <input {...register("tan")} />
        <label>Company GSTIN</label>
        <input {...register("gstin")} />

        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <p>This field is required</p>} */}

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default TaxSetupForm;
