import { Button, Typography } from "@material-tailwind/react";

export default function PrimaryButton({
  leftIcon,
  RightIcon,
  title,
  variant,
  color,
}) {
  return (
    <Button
      className={`flex items-center m-2 shadow-none rounded-[4px]`}
      size="sm"
      variant={variant}
      color={color}
    >
      {leftIcon}
      <Typography className={`text-md font-semibold capitalize`}>
        {title}
      </Typography>

      {RightIcon}
    </Button>
  );
}
