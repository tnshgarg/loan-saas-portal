import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAddressForm } from "../../../../actions/registerForm";
import { getDocumentFromAddressFormDetails } from "../../../../helpers/getDocumentFromState";
import { NO_CHANGE_ERROR } from "../../../../helpers/messageStrings";
import { postRegisterFormData } from "../../../../services/user.services";

const AddressForm = () => {
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const {
    company: companyInitial,
    brand: brandInitial,
    address: addressInitial,
    state: stateInitial,
    pincode: pincodeInitial,
  } = useSelector((state) => state.registerForm.addressFormDetails) || "";

  const { jwtToken } =
    useSelector((state) => state.auth.user?.signInUserSession.idToken) ?? "";

  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

  const {
    register,
    getValues,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      company: companyInitial,
      brand: brandInitial,
      address: addressInitial,
      state: stateInitial,
      pincode: pincodeInitial,
    },
  });

  useEffect(() => {
    return () => {
      const addressFormDetailsNew = getValues();
      const { company, brand, address, state, pincode } = addressFormDetailsNew;
      const isEqual =
        company === companyInitial &&
        brand === brandInitial &&
        address === addressInitial &&
        state === stateInitial &&
        pincode === pincodeInitial;
      if (!isEqual) {
        dispatch(setAddressForm(company, brand, address, state, pincode));
      }
    };
  }, [
    addressInitial,
    brandInitial,
    companyInitial,
    dispatch,
    getValues,
    pincodeInitial,
    stateInitial,
  ]);

  const onSubmit = (addressFormDetailsNew) => {
    const { company, brand, address, state, pincode } = addressFormDetailsNew;
    const isEqual =
      company === companyInitial &&
      brand === brandInitial &&
      address === addressInitial &&
      state === stateInitial &&
      pincode === pincodeInitial;
    if (!isEqual) {
      dispatch(setAddressForm(company, brand, address, state, pincode));
      postRegisterFormData(
        jwtToken,
        getDocumentFromAddressFormDetails(employerId, addressFormDetailsNew)
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

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddressForm;
