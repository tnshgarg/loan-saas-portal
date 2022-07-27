import React, { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  useGetEmployerTaxByIdQuery,
  useUpdateEmployerTaxMutation,
} from "../../../store/slices/apiSlices/employer/taxApiSlice";
import { NO_CHANGE_ERROR, VALUES_UPDATED } from "../../../utils/messageStrings";
import FormInput from "../../common/FormInput";
import withUpdateAlert from "../../../hoc/withUpdateAlert";
import UpdateAlertContext from "../../../contexts/updateAlertContext";
import UpdateAlert from "../../common/UpdateAlert";

const TaxSetupForm = () => {
  const alert = useAlert();

  const [disabled, setDisabled] = useState(true);
  const { value, setValue } = useContext(UpdateAlertContext);

  const [updateEmployerTax] = useUpdateEmployerTaxMutation();

  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";


  const responseFromQuery = useGetEmployerTaxByIdQuery(employerId);
  const { data, isLoading, error } = responseFromQuery;


  const {
    body: {
      pan: { number: panInitial } = "",
      tan: { number: tanInitial } = "",
      gstin: { number: gstinInitial } = "",
      cin: { number: cinInitial } = "",
    } = {},
  } = data ?? {};

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (data) {
      reset({
        pan: panInitial,
        tan: tanInitial,
        gstin: gstinInitial,
        cin: cinInitial
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, reset]);

  const onSubmit = (taxSetupFormDetailsNew) => {
    const { pan, tan, gstin, cin } = taxSetupFormDetailsNew;
    const isEqual =
      pan === panInitial && tan === tanInitial && gstin === gstinInitial && cin === cinInitial;
    if (!isEqual) {
      updateEmployerTax({
        ...taxSetupFormDetailsNew,
        id: employerId,
      })
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
      setValue({ ...value, isOpen: false });
      setDisabled(true);
      alert.error(NO_CHANGE_ERROR);
    }
  }; 

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  const cancelCallback = () => {
    setDisabled(true);
    reset();
  }

  const hydrateUpdateAlert = () => {
    const taxFormDetails = {
      pan: panInitial,
      tan: tanInitial,
      gstin: gstinInitial,
      cin: cinInitial
    };
    setValue({
      ...value,
      isOpen: !value.isOpen,
      newValues: { ...getValues() },
      initialValues: taxFormDetails,
      cancelCallback,
      onConfirm: () => onSubmit({ ...getValues() }),
    });
  };

  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
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
                errorMessage:
                  "Please enter a valid PAN number with 10 characters",
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
                errorMessage:
                  "Please enter a valid TAN number with 10 characters",
              }}
            />
            <FormInput
              register={register}
              validations={{
                required: false,
                pattern: {
                  value: /^([a-zA-Z0-9]{21})$/,
                },
              }}
              errors={errors}
              field={"cin"}
              inputProps={{
                disabled: disabled,
                icon: "id-number",
                label: "CIN",
                placeholder: "Please enter company's CIN number",
                errorMessage:
                  "Please enter a valid CIN number with 21 characters",
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
            <input
              disabled={Object.values(errors).length}
              type="button"
              value={disabled ? "Edit" : "Submit"}
              onClick={disabled ? toggleDisabled : hydrateUpdateAlert}
            />
          </form>
          <UpdateAlert />
        </div>
      ) : null}
    </div>
  );
};

export default withUpdateAlert(TaxSetupForm);
