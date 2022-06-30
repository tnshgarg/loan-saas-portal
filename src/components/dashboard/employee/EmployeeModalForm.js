import _ from "lodash";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { NO_CHANGE_ERROR } from "../../../helpers/messageStrings";
import { postEmployeeData } from "../../../services/employee.services";
import FormInput from "../../common/FormInput";

export const EmployeeModalForm = ({ formDataInitial, setDidDialogChange }) => {
  const alert = useAlert();

  const { jwtToken } =
    useSelector((state) => state.auth.user?.signInUserSession.idToken) ?? "";

  const formDataNewFieldsToInitialFieldsMap = Object.keys(
    formDataInitial
  ).reduce(
    (acc, currentFormField) => ({
      ...acc,
      [currentFormField.replace(/\W/g, "")]: currentFormField,
    }),
    {}
  );

  const formDataNewFields = Object.entries(formDataInitial).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key.replace(/\W/g, "")]: value,
    }),
    {}
  );

  const [disabled, setDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formDataNewFields ?? {},
    mode: "all",
  });

  const toggleDisabled = () => {
    setDisabled(!disabled);
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
    console.log(actualDataToUpdate);
    if (!_.isEqual(formDataInitial, actualDataToUpdate)) {
      setDidDialogChange(true);
      postEmployeeData(jwtToken, actualDataToUpdate)
        .then((response) => {
          const message = response.data.body;
          alert.success(message);
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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        {Object.entries(formDataNewFields).map(([key, value]) => {
          if (key === "_id") {
            return <></>;
          }
          return (
            <FormInput
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
    </div>
  );
};
