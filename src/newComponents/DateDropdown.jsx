import React from "react";
import { Input, Button, Select, Option } from "@material-tailwind/react";
import { Controller } from "react-hook-form";

export default function DateDropdown({
  options,
  label,
  size,
  type,
  styling,
  required,
  id,
  register,
  field,
  validations,
  errorMessage,
  errors,
  setValue,
  control,
}) {
  // const { onChange, onBlur, name, ref, onSelect } = register(
  //   field,
  //   validations,
  //   control
  // );

  return (
    <div className="w-full">
      <Controller
        name={field}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            label={label}
            className="bg-white"
            size={size}
            color="gray"
            value=""
            onChange={(val) => onChange(val)}
            // onBlur={onBlur}
            ref={ref}
            style={{ ...styling }}
          >
            {options?.map((item, index) => (
              <Option value={item.value} key={index}>
                {item.label}
              </Option>
            ))}
          </Select>
        )}
        rules={{ required: true }}
      />
    </div>
  );
}
