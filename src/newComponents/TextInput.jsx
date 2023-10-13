import React, { useState } from "react";
import { Input, Button, IconButton } from "@material-tailwind/react";

export default function TextInput({
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
  securedEntry,
}) {
  const { onChange, onBlur, name, ref } = register(field, validations);
  const [textType, setTextType] = useState("password");
  console.log("length", errorMessage?.length);

  return (
    <div className="w-full">
      <Input
        // placeholder={label}
        label={label}
        size={size}
        className="rounded-[3px] border border-lightGray bg-white text-gray shadow-none placeholder:text-warning placeholder:bg-white placeholder:font-sans"
        type={securedEntry ? textType : type}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={ref}
        color="black"
        // labelProps={{
        //   className: "hidden",
        // }}
        variant="outlined"
        name={name}
        style={{ ...styling }}
        error={errors?.[field]}
        icon={
          securedEntry ? (
            <div>
              {textType != "text" ? (
                <i
                  className="fas fa-eye-slash cursor-pointer"
                  onClick={() => setTextType("text")}
                />
              ) : (
                <i
                  className="fas fa-eye cursor-pointer"
                  onC
                  onClick={() => setTextType("password")}
                />
              )}
            </div>
          ) : null
        }

        // error={errors?.[field]}

        // containerProps={{ className: "min-w-[96px] h-[36px]" }}
      />

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
