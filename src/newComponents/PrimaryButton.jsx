import { Button, Typography } from "@material-tailwind/react";

export default function PrimaryButton({
  leftIcon,
  RightIcon,
  title,
  variant,
  color,
  className,
  disabled,
  size,
  type,
  onClick,
}) {
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
      {leftIcon}
      <Typography className={`text-md font-semibold capitalize`}>
        {title}
      </Typography>

      {RightIcon}
    </Button>
  );
}
