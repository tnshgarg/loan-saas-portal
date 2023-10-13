import React from "react";
import { Input, Button, Select, Option } from "@material-tailwind/react";
import { Controller } from "react-hook-form";

export default function DropdownInput({
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
        control={control}
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

      {/* <Select
        label={label}
        className="bg-white"
        size={size}
        color="gray"
        value=""
        onChange={(value) => {
          // console.log(value);
          setValue(name, value);
        }}
        onBlur={onBlur}
        ref={ref}
        name={name}
        style={{ ...styling }}
      >
        {options?.map((item, index) => (
          <Option value={item.value} key={index}>
            {item.label}
          </Option>
        ))}
      </Select> */}
      <>
        {errors?.[field] ? (
          <p className="text-[10px] text-warning mt-[4px] leading-3">
            {errorMessage}
          </p>
        ) : (
          <p className="text-[10px] text-[#f9f9fb] mt-[4px] leading-3">
            placeholder
          </p> // added to prevent jerk when input is valid
        )}
      </>
    </div>
  );
}
