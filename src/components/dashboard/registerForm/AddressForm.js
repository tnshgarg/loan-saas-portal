import { Button, Intent } from "@blueprintjs/core";
import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Select from "react-select";
import FormInput from "../../../atomic/atoms/forms/FormInput";
import { AppToaster } from "../../../contexts/ToastContext";
import UpdateAlertContext from "../../../contexts/updateAlertContext";
import withUpdateAlert from "../../../hoc/withUpdateAlert";
import {
  useGetEmployerAddressByIdQuery,
  useUpdateEmployerAddressMutation,
} from "../../../store/slices/apiSlices/employer/addressApiSlice";
import { NO_CHANGE_ERROR } from "../../../utils/messageStrings";
import states from "../../../utils/states";
import UpdateAlert from "../../common/UpdateAlert";

const AddressForm = () => {
  const { value, setValue } = useContext(UpdateAlertContext);

  const [updateEmployerAddress] = useUpdateEmployerAddressMutation();

  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

  const responseFromQuery = useGetEmployerAddressByIdQuery(employerId);
  const { data, isLoading, error } = responseFromQuery;

  console.log("AddressForm", data);

  const {
    body: {
      pin: pinInitial,
      state: stateInitial,
      street: streetInitial,
      company: companyInitial,
      brand: brandInitial,
    } = {},
  } = data ?? {};

  const statesOptions = states.map((state) => ({
    value: state,
    label: state,
  }));

  const customStyles = {
    container: (provided, _) => ({
      ...provided,
      marginBottom: "30px",
      marginTop: "25px",
    }),
  };

  const {
    register,
    getValues,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (data) {
      reset({
        company: companyInitial,
        brand: brandInitial,
        street: streetInitial,
        state: stateInitial,
        pin: pinInitial,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, reset]);

  const onSubmit = (addressFormDetailsNew) => {
    const { company, brand, street, state, pin } = addressFormDetailsNew;

    const isEqual =
      company === companyInitial &&
      brand === brandInitial &&
      street === streetInitial &&
      state === stateInitial &&
      pin === pinInitial;
    if (!isEqual) {
      updateEmployerAddress({
        ...addressFormDetailsNew,
        id: employerId,
      })
        .then(({ data }) => {
          const status = data.status;
          if (status === 200) {
            const message = data.message;
            AppToaster.show({
              message,
              intent: Intent.SUCCESS,
            });
            setValue({ ...value, isOpen: false });
          }
        })
        .catch((error) => {
          const message = error.response?.data?.message ?? "Some error occured";
          AppToaster.show({
            message,
            intent: Intent.DANGER,
          });
        });
    } else {
      setValue({ ...value, isOpen: false });
      AppToaster.show({
        message: NO_CHANGE_ERROR,
        intent: Intent.DANGER,
      });
    }
  };

  const cancelCallback = () => {
    reset();
  };

  const hydrateUpdateAlert = () => {
    const addressFormDetails = {
      company: companyInitial,
      brand: brandInitial,
      street: streetInitial,
      state: stateInitial,
      pin: pinInitial,
    };
    setValue({
      ...value,
      isOpen: !value.isOpen,
      newValues: { ...getValues() },
      initialValues: addressFormDetails,
      cancelCallback: cancelCallback,
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
                  value: /^[a-zA-Z0-9!@#$&()`.+,/"\-\w\s]*$/,
                },
              }}
              errors={errors}
              field={"street"}
              inputProps={{
                icon: "home",
                label: "Registered Address",
                placeholder: "Please enter your registered company address",
                errorMessage: "Please enter your registered company address",
              }}
            />
            <Controller
              control={control}
              defaultValue={statesOptions[0]}
              name="state"
              render={({ field }) => (
                <Select
                  styles={customStyles}
                  placeholder="Please enter the State in which your company office is located"
                  inputRef={field.ref}
                  classNamePrefix="addl-class"
                  options={statesOptions}
                  value={statesOptions.find((c) => c.value === field.value)}
                  onChange={(val) => {
                    field.onChange(val.value);
                  }}
                />
              )}
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
              field={"pin"}
              inputProps={{
                icon: "pin",
                label: "Pincode",
                placeholder: "Please enter company address pincode",
                errorMessage: "Pincode must be 6 digits",
              }}
            />
            <div style={{ textAlign: "right" }}>
              <Button
                disabled={Object.values(errors).length}
                type="button"
                text={"Submit"}
                onClick={hydrateUpdateAlert}
              />
            </div>
          </form>
          <UpdateAlert />
        </div>
      ) : null}
    </div>
  );
};

export default withUpdateAlert(AddressForm);
