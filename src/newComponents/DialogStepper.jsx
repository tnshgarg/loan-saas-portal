import React from "react";

const DialogStepper = ({ steps, activeStep }) => {
  return (
    <div className="flex flex-row items-center justify-between w-full px-8 py-8">
      {steps.map((item, index) => (
        <>
          <div className="w-full flex flex-row items-center justify-center">
            <div
              className={`h-5 w-5 rounded-md flex flex-col items-center justify-center border-2 ${
                activeStep == index
                  ? "bg-white border-primary"
                  : index > activeStep
                  ? "bg-white border-[#bfbfbf]"
                  : "bg-primary"
              }`}
            >
              <p
                className={`text-xs font-semibold ${
                  activeStep == index
                    ? "text-primary"
                    : index > activeStep
                    ? "text-[#bfbfbf]"
                    : "text-white"
                }`}
              >
                {item.value}
              </p>
            </div>
            <p className="text-black font-semibold text-xs ml-2">
              {item.label}
            </p>
          </div>
          {item.value < steps?.length && (
            <div className="border-t-2 border-lightGray w-1/2"></div>
          )}
        </>
      ))}
    </div>
  );
};

export default DialogStepper;
