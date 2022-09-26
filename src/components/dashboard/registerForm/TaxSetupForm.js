import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  useGetEmployerTaxByIdQuery,
  useUpdateEmployerTaxMutation,
} from "../../../store/slices/apiSlices/employer/taxApiSlice";
import { NO_CHANGE_ERROR, VALUES_UPDATED } from "../../../utils/messageStrings";
import FormInput from "../../../atomic/atoms/forms/FormInput";
import withUpdateAlert from "../../../hoc/withUpdateAlert";
import UpdateAlertContext from "../../../contexts/updateAlertContext";
import UpdateAlert from "../../common/UpdateAlert";
import { Intent } from "@blueprintjs/core";
import { AppToaster } from "../../../contexts/ToastContext";

const TaxSetupForm = () => {
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
        cin: cinInitial,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, reset]);

  const onSubmit = (taxSetupFormDetailsNew) => {
    const { pan, tan, gstin, cin } = taxSetupFormDetailsNew;
    const isEqual =
      pan === panInitial &&
      tan === tanInitial &&
      gstin === gstinInitial &&
      cin === cinInitial;
    if (!isEqual) {
      updateEmployerTax({
        ...taxSetupFormDetailsNew,
        id: employerId,
      })
        .then((response) => {
          const status = response.data.status;
          if (status === 200) {
            AppToaster.show({
              intent: Intent.SUCCESS,
              message: VALUES_UPDATED,
            });
            setValue({ ...value, isOpen: false });
          }
        })
        .catch((error) => {
          setValue({ ...value, isOpen: false });
          const message = error.response?.data?.message ?? "Some error occured";
          AppToaster.show({
            intent: Intent.DANGER,
            message,
          });
        });
    } else {
      setValue({ ...value, isOpen: false });
      AppToaster.show({
        intent: Intent.DANGER,
        message: NO_CHANGE_ERROR,
      });
    }
  };

  const cancelCallback = () => {
    reset();
  };

  const hydrateUpdateAlert = () => {
    const taxFormDetails = {
      pan: panInitial,
      tan: tanInitial,
      gstin: gstinInitial,
      cin: cinInitial,
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
                  value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                },
              }}
              errors={errors}
              field={"pan"}
              inputProps={{
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
                  value: /^((^[a-zA-Z]{4}[0-9]{5}[a-zA-Z]{1}?$))$/,
                },
              }}
              errors={errors}
              field={"tan"}
              inputProps={{
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
                  value:
                    /^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/,
                },
              }}
              errors={errors}
              field={"cin"}
              inputProps={{
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
                  value:
                    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                },
              }}
              errors={errors}
              field={"gstin"}
              inputProps={{
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
              value={"Submit"}
              onClick={hydrateUpdateAlert}
            />
          </form>
          <UpdateAlert />
        </div>
      ) : null}
    </div>
  );
};

export default withUpdateAlert(TaxSetupForm);
