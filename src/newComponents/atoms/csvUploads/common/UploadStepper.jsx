import { DialogBody } from "@material-tailwind/react";
import React from "react";
import DialogStepper from "../../../DialogStepper";

const UploadStepper = ({ headerImage, children, active, title }) => {
  let labels = children.map((item) => item.props.label);
  console.log({ children });
  let activeChild = (children || [])[active];
  return (
    <DialogBody>
      <div className="w-full overflow-y-auto flex flex-col items-center">
        <img src={headerImage} className="h-12 w-12" />
        <p className="text-md text-black font-semibold my-4 mb-8">{title}</p>
        <DialogStepper labels={labels} active={active} />
        {activeChild || <></>}
      </div>
    </DialogBody>
  );
};

export const UploadStep = ({ children, label, step }) => <>{children}</>;

export default UploadStepper;
