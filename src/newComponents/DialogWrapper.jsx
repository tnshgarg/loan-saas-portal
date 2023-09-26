import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Stepper,
  Step,
  Typography,
} from "@material-tailwind/react";
import StepperWithContent from "./StepperWithContent";

export default function DialogWrapper() {
  const [open, setOpen] = React.useState(false);

  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen}>Message Dialog</Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between p-4">
          <DialogHeader className="p-0">Bulk Upload</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <DialogBody>
          <div className="w-full px-24 py-4">
            <Stepper
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
              // lineClassName="bg-white"
              // activeLinecolor="primary"
            >
              <Step
                className="border-2 border-lightGray text-lightGray p-1"
                activeClassName="border-2 border-primary text-black p-1"
                completedClassName="bg-primary text-white border-primary p-1"
                onClick={() => setActiveStep(0)}
              >
                1
                <div className="absolute -right-[3.5rem] w-max text-center">
                  <Typography
                    variant="paragraph"
                    color={activeStep === 1 ? "blue-gray" : "gray"}
                  >
                    Step 1
                  </Typography>
                </div>
              </Step>
              <Step
                className="border-2 border-lightGray text-lightGray p-1"
                activeClassName="border-2 border-primary text-black p-1"
                completedClassName="bg-primary text-white border-primary p-1"
                onClick={() => setActiveStep(1)}
              >
                2
                <div className="absolute -right-[3.5rem] w-max text-center">
                  <Typography
                    variant="paragraph"
                    color={activeStep === 1 ? "blue-gray" : "gray"}
                  >
                    Step 2
                  </Typography>
                </div>
              </Step>
              <Step
                className="border-2 border-lightGray text-lightGray p-1"
                activeClassName="border-2 border-primary text-black p-1"
                completedClassName="bg-primary text-white border-primary p-1"
                onClick={() => setActiveStep(2)}
              >
                3
                <div className="absolute -right-[3.5rem] w-max text-center">
                  <Typography
                    variant="paragraph"
                    color={activeStep === 1 ? "blue-gray" : "gray"}
                  >
                    Step 3
                  </Typography>
                </div>
              </Step>
            </Stepper>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2 items-center justify-center">
          <Button
            variant="outlined"
            color="black"
            onClick={handlePrev}
            className="w-1/3 rounded-md"
          >
            Back
          </Button>
          <Button onClick={handleNext} className="w-1/3 rounded-md bg-primary">
            Import
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
