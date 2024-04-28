import { Progress, Typography } from "@material-tailwind/react";

export default function ProgressBar({ value }) {
  console.log("value", value);
  return (
    <div className="w-full my-4">
      <div className="mb-2 flex items-center justify-between gap-4">
        <Typography color="blue-gray" variant="h6">
          Completed
        </Typography>
        <Typography color="blue-gray" variant="h6">
          {value}%
        </Typography>
      </div>
      <Progress value={value} color="blue-gray" />
    </div>
  );
}
