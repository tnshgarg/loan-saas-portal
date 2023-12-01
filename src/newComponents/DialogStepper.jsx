import React from "react";

const DialogStepper = ({ labels, active }) => {
  const numLength = labels?.length;
  return (
    <div className="flex flex-row items-center justify-between w-full px-8 py-8">
      {labels?.map((item, index) => (
        <>
          <div className="w-full flex flex-row items-center justify-center">
            <div
              className={`h-5 w-5 rounded-md flex flex-col items-center justify-center border-2 ${
                active == index
                  ? "bg-white border-primary"
                  : index > active
                  ? "bg-white border-[#bfbfbf]"
                  : "bg-primary"
              }`}
            >
              <p
                className={`text-xs font-semibold ${
                  active == index
                    ? "text-primary"
                    : index > active
                    ? "text-[#bfbfbf]"
                    : "text-white"
                }`}
              >
                {index + 1}
              </p>
            </div>
            <p className="text-black font-semibold text-xs ml-2">{item}</p>
          </div>
          {index < numLength - 1 && (
            <div className="border-t-2 border-lightGray w-1/2"></div>
          )}
        </>
      ))}
    </div>
  );
};

export default DialogStepper;
