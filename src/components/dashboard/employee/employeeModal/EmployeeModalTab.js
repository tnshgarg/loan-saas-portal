import { Alert, Intent } from "@blueprintjs/core";
import Select from "react-select";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Controller, useForm } from "react-hook-form";
import { NO_CHANGE_ERROR } from "../../../../utils/messageStrings";
import {
  useGetEmployeeDetailsByEmployeeIdQuery,
  useUpdateEmployeeDetailsMutation,
} from "../../../../store/slices/apiSlices/employee/employeeDetailsApiSlice";
import FormInput from "../../../../atomic/atoms/forms/FormInput";

export const EmployeeModalTab = ({
  category,
  fields,
  currEmployeeId,
  setDidDialogChange,
  type,
  inputTypes,
}) => {
  const alert = useAlert();
  const responseFromQuery = useGetEmployeeDetailsByEmployeeIdQuery({
    id: currEmployeeId,
    category,
    subCategory: type,
  });
  const { data, isLoading, error } = responseFromQuery;

  const [updateEmployeeDetails, { data: updateEmployeeMutationResponse }] =
    useUpdateEmployeeDetailsMutation();

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const fieldsInverted = _.invert(fields);
  const [formDataInitial, setFormDataInitial] = useState({});
  const [
    formDataNewFieldsToInitialFieldsMap,
    setFormDataNewFieldsToInitialFieldsmap,
  ] = useState({});
  const [formDataNewFields, setFormDataNewFields] = useState({});

  const [disabled, setDisabled] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [changesInEmployeeDetails, setChangesInEmployeeDetails] = useState({});

  useEffect(() => {
    if (data) {
      let body = data.body ?? {};

      const formDataInitialFetched = Object.entries(fields).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [value]: body[key],
        }),
        {}
      );

      const formDataNewFieldsToInitialFieldsMapFetched = Object.keys(
        formDataInitialFetched
      ).reduce(
        (acc, currentFormField) => ({
          ...acc,
          [currentFormField.replace(/\W/g, "")]: currentFormField,
        }),
        {}
      );

      const formDataNewFieldsFetched = Object.entries(
        formDataInitialFetched
      ).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key.replace(/\W/g, "")]: value,
        }),
        {}
      );

      setFormDataInitial(formDataInitialFetched);
      setFormDataNewFieldsToInitialFieldsmap(
        formDataNewFieldsToInitialFieldsMapFetched
      );
      setFormDataNewFields(formDataNewFieldsFetched);

      reset(formDataNewFieldsFetched);
    }
  }, [data, fields, reset, type]);

  useEffect(() => {
    if (updateEmployeeMutationResponse) {
      const { status, message } = updateEmployeeMutationResponse ?? null;
      if (status === 200) {
        alert.success(message);
        setDidDialogChange(true);
      }
    }
  }, [alert, setDidDialogChange, updateEmployeeMutationResponse]);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  const handleAlertCancel = () => {
    setIsAlertOpen(false);
  };

  const handleAlertConfirm = () => {
    const employeeUpdateObjectToSend = Object.entries(
      changesInEmployeeDetails
    ).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [fieldsInverted[key]]: value,
      }),
      {
        ...(type && { type }),
      }
    );

    const finalEmployeeUpdateObjectToSend = {
      ...employeeUpdateObjectToSend,
      id: currEmployeeId,
      category: category,
    };

    setIsAlertOpen(false);
    updateEmployeeDetails(finalEmployeeUpdateObjectToSend);
  };

  const onSubmit = (data) => {
    if (!disabled) {
      return;
    }
    const actualDataToUpdate = Object.entries(data).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [formDataNewFieldsToInitialFieldsMap[key]]: value,
      }),
      {}
    );
    if (!_.isEqual(formDataInitial, actualDataToUpdate)) {
      const changedEmployeeDetails = Object.entries(actualDataToUpdate).reduce(
        (acc, [key, value]) => {
          if (
            actualDataToUpdate[key] !== formDataInitial[key] ||
            key === "_id"
          ) {
            return {
              ...acc,
              [key]: value,
            };
          }
          return {
            ...acc,
          };
        },
        {}
      );
      setChangesInEmployeeDetails(changedEmployeeDetails);
      setIsAlertOpen(true);
    } else {
      alert.error(NO_CHANGE_ERROR);
    }
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input

  const generateOptions = (values) => {
    return values?.map((opt) => ({
      value: opt,
      label: opt,
    }));
  };
  const disableEditing = data?.body?.verifyStatus === "SUCCESS";
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
            {Object.entries(formDataNewFields).map(([key, value]) => {
              const labelKey = formDataNewFieldsToInitialFieldsMap[key];
              if (key === "_id") {
                return <></>;
              }
              if (inputTypes && inputTypes[labelKey]) {
                let options = [];
                const dependentOn = inputTypes[labelKey]?.dependentOn ?? false;
                if (dependentOn) {
                  const currState = watch(dependentOn) ?? "";
                  options = generateOptions(
                    inputTypes[labelKey]?.options[currState]
                  );
                } else {
                  options = generateOptions(inputTypes[labelKey]?.options);
                }
                const defaultValue = options ? options[0]?.value : null;
                return (
                  <Controller
                    control={control}
                    name={key}
                    // defaultValue={defaultValue}
                    render={({ field }) => (
                      <>
                        <label>{labelKey}</label>
                        <Select
                          key={`selected_${defaultValue}`}
                          inputRef={field.ref}
                          classNamePrefix="addl-class"
                          className="select-comp"
                          options={options}
                          value={options?.find((c) => c.value === field.value)}
                          onChange={(v) => {
                            field.onChange(v.value);
                          }}
                          name={key}
                          isDisabled={disabled}
                        />
                        <div>&nbsp;</div>
                      </>
                    )}
                  />
                );
              }
              return (
                <FormInput
                  key={key}
                  register={register}
                  errors={errors}
                  field={key}
                  inputProps={{
                    icon: "user",
                    label: labelKey,
                    placeholder: `Please enter ${labelKey} for selected employee`,
                    errorMessage: `Please enter ${labelKey} for selected employee`,
                    disabled: disabled,
                  }}
                />
              );
            })}
            <input
              type="submit"
              value={disabled ? "Edit" : "Submit"}
              onClick={toggleDisabled}
              disabled={disableEditing}
            />
          </form>
          <Alert
            cancelButtonText="Cancel"
            confirmButtonText="Update the details"
            icon="warning-sign"
            intent={Intent.WARNING}
            isOpen={isAlertOpen}
            onCancel={handleAlertCancel}
            onConfirm={handleAlertConfirm}
          >
            <p>
              Are you sure you want to do the following changes? You will be
              able to change this later.
            </p>
            {Object.entries(changesInEmployeeDetails).map(([key, value]) => {
              if (key === "_id") {
                return <></>;
              }
              return (
                <p>
                  {key}:{value}
                </p>
              );
            })}
          </Alert>
        </div>
      ) : null}
    </div>
  );
};
