import React, { useContext, useEffect } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setAddressForm } from "../../../store/actions/registerForm";
import { getDocumentFromAddressFormDetails } from "../../../utils/getDocumentFromState";
import { NO_CHANGE_ERROR } from "../../../utils/messageStrings";
import statesAndUts from "../../../utils/statesAndUts";
import { postRegisterFormData } from "../../../services/user.services";
import FormInput from "../../common/FormInput";
import withUpdateAlert from "../../../hoc/withUpdateAlert";
import UpdateAlertContext from "../../../contexts/updateAlertContext";
import UpdateAlert from "../../common/UpdateAlert";

const AddressForm = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const alert = useAlert();

  const [disabled, setDisabled] = React.useState(true);

  const { value, setValue } = useContext(UpdateAlertContext);

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
          setDisabled(true)
          setValue({ ...value, isOpen: false });
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

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  const hydrateUpdateAlert = () => {
    const addressFormDetails = {
      company: companyInitial,
      brand: brandInitial,
      address: addressInitial,
      state: stateInitial,
      pincode: pincodeInitial,
    };
    setValue({
      ...value,
      isOpen: !value.isOpen,
      newValues: { ...getValues() },
      initialValues: addressFormDetails,
      onConfirm: () => onSubmit({ ...getValues() }),
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(value.toggleAlert)}>
        <FormInput
          register={register}
          validations={{
            required: true,
            pattern: {
              value: /^[A-Z0-9a-z ]+$/,
            },
          }}
          errors={errors}
          field={"company"}
          inputProps={{
            disabled: disabled,
            icon: "office",
            label: "Company Name",
            placeholder: "Please enter your company name",
            errorMessage: "Please enter your company name",
          }}
        />
        <FormInput
          register={register}
          validations={{
            required: false,
          }}
          errors={errors}
          field={"brand"}
          inputProps={{
            disabled: disabled,
            icon: "tag",
            label: "Brand Name",
            placeholder: "Please enter your brand name",
            errorMessage: "Please enter your brand name",
          }}
        />
        <FormInput
          register={register}
          validations={{
            required: true,
            minLength: 1,
            pattern: {
              value: /^[A-Z0-9a-z, ]+$/,
            },
          }}
          errors={errors}
          field={"address"}
          inputProps={{
            disabled: disabled,
            icon: "home",
            label: "Address",
            placeholder: "Please enter your company address",
            errorMessage: "Please enter your company address",
          }}
        />
        <FormInput
          register={register}
          validations={{
            required: true,
            minLength: 1,
            pattern: {
              value: /^[A-Za-z ]+$/,
            },
          }}
          errors={errors}
          field={"state"}
          inputProps={{
            disabled: disabled,
            icon: "locate",
            label: "State",
            placeholder:
              "Please enter the State in which your company office is located",
            errorMessage:
              "Please enter the State in which your company office is located",
          }}
        />
        <FormInput
          register={register}
          validations={{
            required: true,
            minLength: 1,
            pattern: {
              value: /^\d{6}$/,
            },
          }}
          errors={errors}
          field={"pincode"}
          inputProps={{
            disabled: disabled,
            icon: "pin",
            label: "Pincode",
            placeholder: "Please enter company address pincode",
            errorMessage: "Pincode must be 6 digits",
          }}
        />
        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <p>This field is required</p>} */}

        <input
          disabled={Object.values(errors).length}
          type="button"
          value={disabled ? "Edit" : "Submit"}
          onClick={disabled ? toggleDisabled : hydrateUpdateAlert}
        />
      </form>
      <UpdateAlert />
    </div>
  );
};

export default withUpdateAlert(AddressForm);
