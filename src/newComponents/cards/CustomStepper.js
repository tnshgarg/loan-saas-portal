import React from "react";
import {
  Stepper,
  Step,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/solid";

export default function CustomStepper({ steps, activeStep, setActiveStep }) {
  return (
    <div className="w-full border-b border-lightGray bg-white rounded-t-xl">
      <div className="w-full py-9 px-16 pt-4">
        <Stepper
          activeStep={activeStep}
          lineClassName="bg-lightGray"
          activeLineClassName="bg-primary"
        >
          {steps?.map((item, index) => (
            <Step
              className="h-6 w-6 text-white cursor-pointer !bg-lightGray"
              activeClassName="ring-0 !bg-primary text-white"
              completedClassName="!bg-primary text-white"
              // onClick={() => setActiveStep(index)}
            >
              <Typography className="text-white text-sm font-semibold">
                {index + 1}
              </Typography>
              <div className="absolute -bottom-[1.5rem] w-max text-center text-xs">
                <Typography className="text-xs font-semibold text-gray">
                  {item.label}
                </Typography>
              </div>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
}
