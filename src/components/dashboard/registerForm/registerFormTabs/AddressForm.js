import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAddressForm } from "../../../../actions/registerForm";
import "./styles.css";

const AddressForm = () => {
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    company: companyIntial,
    brand: brandInitial,
    address: addressInitial,
    state: stateInitial,
    pincode: pincodeInitial,
  } = useSelector((state) => state.registerForm.addressFormDetails) || "";

  const {
    register,
    getValues,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      company: companyIntial,
      brand: brandInitial,
      address: addressInitial,
      state: stateInitial,
      pincode: pincodeInitial,
    },
  });

  useEffect(() => {
    return () => {
      const data = getValues();
      const { company, brand, address, state, pincode } = data;
      const isEmpty = Object.values(data).every((value) => {
        if (value === "") {
          return true;
        }
        return false;
      });
      if (!isEmpty) {
        dispatch(setAddressForm(company, brand, address, state, pincode));
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

        <label>Company Name</label>
        <input {...register("company")} />
        <label>Brand Name</label>
        <input {...register("brand")} />
        <label>Registered Address</label>
        <input {...register("address")} />
        <label>State</label>
        <input {...register("state")} />
        <label>Pincode</label>
        <input {...register("pincode")} />

        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <p>This field is required</p>} */}

        <input type="submit" value="next" />
      </form>
    </div>
  );
};

export default AddressForm;
