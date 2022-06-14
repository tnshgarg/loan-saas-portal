import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  setAddressForm,
  setRegisterFormTabValue,
} from "../../../../actions/registerForm";
import { getDocumentFromAddressFormDetails } from "../../../../helpers/getDocumentFromState";
import { NO_CHANGE_ERROR } from "../../../../helpers/messageStrings";
import statesAndUts from "../../../../helpers/statesAndUts";
import { postRegisterFormData } from "../../../../services/user.services";
import "./styles.css";

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

  const states = statesAndUts.map((indianState) => {
    return {
      value: indianState,
      label: indianState,
    };
  });

  const defaultIndianState = states[0].label;

  const {
    register,
    getValues,
    handleSubmit,
    control,
    // watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company: companyInitial,
      brand: brandInitial,
      address: addressInitial,
      state: stateInitial,
      pincode: pincodeInitial,
    },
    mode: "all",
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
          dispatch(setRegisterFormTabValue(1));
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
        <input
          {...register("company", {
            required: true,
          })}
        />
        {errors.company && <p>Company Name cannot be empty</p>}

        <label>Brand Name</label>
        <input
          {...register("brand", {
            required: true,
          })}
        />
        {errors.brand && <p>Brand Name cannot be empty</p>}

        <label>Registered Address</label>
        <input
          {...register("address", {
            required: true,
          })}
        />
        {errors.address && <p>Address cannot be empty</p>}

        <label>State</label>
        <Controller
          control={control}
          defaultValue={defaultIndianState}
          name="state"
          render={({ field }) => (
            <Select
              inputRef={field.ref}
              classNamePrefix="addl-class"
              options={states}
              value={states.find((c) => c.value === field.value)}
              onChange={(val) => {
                field.onChange(val.value);
              }}
            />
          )}
        />

        <label>Pincode</label>
        <input
          {...register("pincode", {
            required: true,
            pattern: {
              value: /^[1-9][0-9]{5}$/,
            },
          })}
        />
        {errors.pincode && <p>Pincode must consist of 6 digits</p>}

        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <p>This field is required</p>} */}

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddressForm;
