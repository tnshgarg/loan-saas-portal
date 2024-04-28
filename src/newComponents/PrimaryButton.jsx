import { Button, Typography } from "@material-tailwind/react";
import React from "react";

export default function PrimaryButton({
  leftIcon,
  rightIcon,
  title,
  variant,
  color,
  className,
  disabled,
  size,
  type,
  onClick,
}) {
  const colors = {
    primary: "text-primary",
    secondary: "text-secondary",
  };
  return (
    <Button
      className={`flex items-center justify-center m-2 shadow-none outline-none rounded-[4px] ${className}`}
      size={size}
      variant={variant}
      color={color}
      ripple={false}
      disabled={disabled}
      type={type}
      style={{ backgroundColor: disabled && "gray" }}
      onClick={onClick}
    >
      {leftIcon &&
        React.createElement(leftIcon, {
          className: `w-4 h-4 mr-1 ${
            variant == "outlined" ? colors[color] : "text-white"
          }`,
        })}
      <Typography className={`text-md font-semibold capitalize`}>
        {title}
      </Typography>
      {rightIcon &&
        React.createElement(rightIcon, {
          className: `w-4 h-4 ml-1 ${
            variant == "outlined" ? colors[color] : "text-white"
          }`,
        })}
    </Button>
  );
}
