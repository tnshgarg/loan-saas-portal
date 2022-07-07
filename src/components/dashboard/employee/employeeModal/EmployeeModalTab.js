import { Alert, Intent } from "@blueprintjs/core";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { NO_CHANGE_ERROR } from "../../../../helpers/messageStrings";
import {
  useGetEmployeeDetailsByEmployeeIdQuery,
  useUpdateEmployeeDetailsMutation,
} from "../../../../store/slices/apiSlices/employee/getEmployeeDetailsApiSlice";
import FormInput from "../../../common/FormInput";

export const EmployeeModalTab = ({
  category,
  fields,
  currEmployeeId,
  setDidDialogChange,
}) => {
  const alert = useAlert();

  const responseFromQuery = useGetEmployeeDetailsByEmployeeIdQuery({
    id: currEmployeeId,
    category,
  });
  const { data, isLoading, error } = responseFromQuery;

  const [updateEmployeeDetails, { data: updateEmployeeMutationResponse }] =
    useUpdateEmployeeDetailsMutation();

  const {
    register,
    handleSubmit,
    reset,
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
      const body = data.body ?? {};
      const formDataInitialFetched = Object.entries(body).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [fields[key]]: value,
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
  }, [data, fields, reset]);

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
      {}
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
    console.log(`disabled: ${disabled}`);
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
      console.log(changedEmployeeDetails);
      setChangesInEmployeeDetails(changedEmployeeDetails);
      setIsAlertOpen(true);
    } else {
      alert.error(NO_CHANGE_ERROR);
    }
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input

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
              if (key === "_id") {
                return <></>;
              }
              return (
                <FormInput
                  key={key}
                  register={register}
                  errors={errors}
                  field={key}
                  inputProps={{
                    icon: "user",
                    label: formDataNewFieldsToInitialFieldsMap[key],
                    placeholder: `Please enter ${formDataNewFieldsToInitialFieldsMap[key]} for selected employee`,
                    errorMessage: `Please enter ${formDataNewFieldsToInitialFieldsMap[key]} for selected employee`,
                    disabled: disabled,
                  }}
                />
              );
            })}

            <input
              type="submit"
              value={disabled ? "Edit" : "Submit"}
              onClick={toggleDisabled}
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
