import React, { useContext, useEffect } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getTaxFormAction,
  setTaxSetupForm,
} from "../../../store/actions/registerForm";

import { getDocumentFromTaxSetupFormDetails } from "../../../utils/getDocumentFromState";
import { NO_CHANGE_ERROR, VALUES_UPDATED } from "../../../utils/messageStrings";
import {
  postRegisterFormData,
  postTaxForm,
} from "../../../services/user.services";
import FormInput from "../../common/FormInput";
import withUpdateAlert from "../../../hoc/withUpdateAlert";
import UpdateAlertContext from "../../../contexts/updateAlertContext";
import UpdateAlert from "../../common/UpdateAlert";
import useFetchWithRedux from "../../../hooks/useFetchWithRedux";

const TaxSetupForm = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [disabled, setDisabled] = React.useState(true);
  const { value, setValue } = useContext(UpdateAlertContext);

  const taxSetupForm =
    useFetchWithRedux(
      getTaxFormAction,
      (state) => state.registerForm.taxSetupFormDetails
    ) || "";

  const {
    pan: { number: panInitial } = '',
    tan: { number: tanInitial } = '',
    gstin: { number: gstinInitial } = '',
  } = taxSetupForm;

  const { jwtToken } =
    useSelector((state) => state.auth.user?.signInUserSession.idToken) ?? "";

  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    // watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pan: panInitial,
      tan: tanInitial,
      gstin: gstinInitial,
    },
    mode: "all",
  });

  useEffect(() => {
    if (panInitial || tanInitial || gstinInitial) {
      reset({
        pan: panInitial,
        tan: tanInitial,
        gstin: gstinInitial,
      });
    }
    return () => {
      const taxSetupFormDetailsNew = getValues();
      const { pan, tan, gstin } = taxSetupFormDetailsNew;
      const isEqual =
        pan === panInitial && tan === tanInitial && gstin === gstinInitial;
      if (!isEqual) {
        dispatch(setTaxSetupForm(pan, tan, gstin));
      }
    };
  }, [dispatch, getValues, gstinInitial, panInitial, tanInitial, reset]);

  const onSubmit = (taxSetupFormDetailsNew) => {
    const { pan, tan, gstin } = taxSetupFormDetailsNew;
    const isEqual =
      pan === panInitial && tan === tanInitial && gstin === gstinInitial;
    if (!isEqual) {
      dispatch(setTaxSetupForm(pan, tan, gstin));
      postTaxForm(
        jwtToken,
        getDocumentFromTaxSetupFormDetails(employerId, taxSetupFormDetailsNew)
      )
        .then((response) => {
          const status = response.data.status;
          if (status === 200) {
            alert.success(VALUES_UPDATED);
            setDisabled(true);
            setValue({ ...value, isOpen: false });
          }
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
    const taxFormDetails = {
      pan: panInitial,
      tan: tanInitial,
      gstin: gstinInitial,
    };
    setValue({
      ...value,
      isOpen: !value.isOpen,
      newValues: { ...getValues() },
      initialValues: taxFormDetails,
      onConfirm: () => onSubmit({ ...getValues() }),
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <FormInput
          register={register}
          validations={{
            required: true,
            pattern: {
              value: /^([a-zA-Z0-9]{10})$/,
            },
          }}
          errors={errors}
          field={"pan"}
          inputProps={{
            disabled: disabled,
            icon: "id-number",
            label: "PAN",
            placeholder: "Please enter company's PAN number",
            errorMessage: "Please enter a valid PAN number with 10 characters",
          }}
        />
        <FormInput
          register={register}
          validations={{
            required: true,
            pattern: {
              value: /^([a-zA-Z0-9]{10})$/,
            },
          }}
          errors={errors}
          field={"tan"}
          inputProps={{
            disabled: disabled,
            icon: "id-number",
            label: "TAN",
            placeholder: "Please enter company's TAN number",
            errorMessage: "Please enter a valid TAN number with 10 characters",
          }}
        />
        <FormInput
          register={register}
          validations={{
            required: true,
            pattern: {
              value: /^([a-zA-Z0-9]{15})$/,
            },
          }}
          errors={errors}
          field={"gstin"}
          inputProps={{
            disabled: disabled,
            icon: "id-number",
            label: "GSTIN",
            placeholder: "Please enter company's GSTIN number",
            errorMessage:
              "Please enter a valid GSTIN number with 15 characters",
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

export default withUpdateAlert(TaxSetupForm);
