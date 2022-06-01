import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTaxSetupForm } from "../../../../actions/registerForm";
import "./styles.css";

const TaxSetupForm = () => {
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    pan: panInitial,
    tan: tanInitial,
    gstin: gstinInitial,
  } = useSelector((state) => state.registerForm.taxSetupFormDetails) || "";

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
      const data = getValues();
      const { pan, tan, gstin } = data;
      const isEmpty = Object.values(data).every((value) => {
        if (value === "") {
          return true;
        }
        return false;
      });
      if (!isEmpty) {
        dispatch(setTaxSetupForm(pan, tan, gstin));
      }
    };
  }, [dispatch, getValues]);

  const onSubmit = (data) => {
    console.log(data);
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
