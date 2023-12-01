import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import React from "react";

export default function PhoneInput({
  label,
  size,
  styling,
  required,
  id,
  register,
  field,
  validations,
  errorMessage,
  errors,
}) {
  const [country, setCountry] = React.useState(0);
  const { onChange, onBlur, name, ref } = register(field, validations);

  return (
    <div>
      <div className="relative flex w-full">
        <Menu placement="bottom-start">
          <MenuHandler>
            <Button
              ripple={false}
              variant="text"
              color="blue-gray"
              className="flex items-center rounded-r-none !border !border-lightGray bg-white border-r-none text-sm font-medium py-0 px-4"
            >
              +91
            </Button>
          </MenuHandler>
          <MenuList className="max-h-[20rem] max-w-[18rem]">
            {["+91"].map((item, index) => {
              return (
                <MenuItem
                  key={item}
                  value={item}
                  className="flex items-center gap-2"
                  onClick={() => setCountry(item)}
                >
                  <span>{item}</span>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
        <Input
          placeholder={label}
          size={size}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
          name={name}
          style={{ ...styling }}
          error={errors?.[field]}
          type="tel"
          className="rounded-[3px] !border !border-lightGray bg-white text-gray shadow-none placeholder:text-gray rounded-l-none "
          labelProps={{
            className: "hidden",
          }}
          maxLength={10}
          validations={{
            required: true,
            pattern: {
              value: /^\d{10}$/,
            },
          }}
        />
      </div>
      <>
        {errors?.[field] ? (
          <p className="text-[10px] text-danger mt-[4px] leading-3">
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
