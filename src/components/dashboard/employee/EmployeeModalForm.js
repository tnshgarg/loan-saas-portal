import { useState } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import FormInput from "../../common/FormInput";

export const EmployeeModalForm = ({ formDataInitial }) => {
  const alert = useAlert();

  const { jwtToken } =
    useSelector((state) => state.auth.user?.signInUserSession.idToken) ?? "";

  const [disabled, setDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formDataInitial ?? {},
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
    console.log(data);
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        {Object.entries(formDataInitial).map(([key, value]) => {
          return (
            <FormInput
              register={register}
              errors={errors}
              field={key.replace(/\W/g, "")}
              inputProps={{
                icon: "user",
                label: key,
                placeholder: `Please enter ${key} for selected employee`,
                errorMessage: `Please enter ${key} for selected employee`,
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
