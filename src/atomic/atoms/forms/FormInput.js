import { FormGroup, Icon, InputGroup, Intent } from "@blueprintjs/core";
import { InputGroupDate } from "./FormInputDate";

export default function FormInput({
  field,
  inputProps,
  register,
  errors,
  validations,
  setValue,
  getValues,
}) {
  const { onChange, onBlur, name, ref } = register(field, validations);
  const fieldId = `${field}-input`;
  return (
    <FormGroup
      key={fieldId}
      helperText={
        <div>
          {errors[field] ? (
            <>
              <Icon intent={Intent.DANGER} icon="error" />
              &nbsp;{inputProps.errorMessage}
            </>
          ) : (
            <span>&nbsp;</span> // added to prevent jerk when input is valid
          )}
        </div>
      }
      inline={inputProps.inline}
      label={inputProps.label}
      labelFor={fieldId}
      subLabel={inputProps.subLabel}
    >
      {inputProps?.label?.toLowerCase().includes("date") ? (
        <InputGroupDate
          disabled={inputProps.disabled}
          placeholder={inputProps.placeholder}
          setValue={setValue}
          getValues={getValues}
          field={field}
        />
      ) : (
        <InputGroup
          large={inputProps.large}
          id={fieldId}
          disabled={inputProps.disabled}
          leftIcon={inputProps.icon}
          type={inputProps.type}
          rightElement={inputProps.rightElement}
          placeholder={inputProps.placeholder}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
          name={name}
          style={inputProps.style}
        />
      )}
    </FormGroup>
  );
}
