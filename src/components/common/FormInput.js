import { FormGroup, InputGroup, Intent, Icon } from "@blueprintjs/core";

export default function FormInput({
  field,
  inputProps,
  register,
  errors,
  validations,
  icon,
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
      label={inputProps.label}
      labelFor={fieldId}
      subLabel={inputProps.subLabel}
    >
      <InputGroup
        large={inputProps.large}
        id={fieldId}
        leftIcon={icon}
        type={inputProps.type}
        placeholder={inputProps.placeholder}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={ref}
        name={name}
      />
    </FormGroup>
  );
}
