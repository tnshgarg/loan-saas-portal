import { Typography } from "@material-tailwind/react";
import React from "react";

const FieldItem = ({ label, value }) => (
  <div>
    <Typography className="text-[10px] text-gray mt-8 font-normal">
      {label}
    </Typography>
    <Typography className="text-xs text-black font-semibold">
      {value ?? "-"}
    </Typography>
  </div>
);

export default FieldItem;
