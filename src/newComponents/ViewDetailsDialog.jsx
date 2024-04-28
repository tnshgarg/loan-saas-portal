import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import PrimaryButton from "./PrimaryButton";

function ViewDetailsDialog({ data, open, setOpen }) {
  const handleOpen = () => setOpen(!open);

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Salary Details</DialogHeader>
      <DialogBody>
        {
          <div className="flex flex-wrap justify-between">
            <div className="w-full border border-lightgray_01 p-4 max-w-[49%] rounded-md my-2">
              <Typography className="text-sm font-semibold">
                HRA: {data.hra}
              </Typography>
            </div>
            <div className="w-full border border-lightgray_01 p-4 max-w-[49%] rounded-md my-2">
              <Typography className="text-sm font-semibold">
                Basic Salary: {data.basicSalary}
              </Typography>
            </div>
            <div className="w-full border border-lightgray_01 p-4 max-w-[49%] rounded-md my-2">
              <Typography className="text-sm font-semibold">
                Other Allowance: {data.otherAllowance}
              </Typography>
            </div>
            <div className="w-full border border-lightgray_01 p-4 max-w-[49%] rounded-md my-2">
              <Typography className="text-sm font-semibold">
                Tax Deductions: {data.taxDeducted}
              </Typography>
            </div>
            <div className="w-full border border-lightgray_01 p-4 max-w-[49%] rounded-md my-2">
              <Typography className="text-sm font-semibold">
                PF Contribution: {data.pfContribution}
              </Typography>
            </div>
            <div className="w-full border border-lightgray_01 p-4 max-w-[49%] rounded-md my-2">
              <Typography className="text-sm font-semibold">
                Professional Tax: {data.professionalTax}
              </Typography>
            </div>
            <div className="w-full border border-lightgray_01 p-4 max-w-[49%] rounded-md my-2">
              <Typography className="text-sm font-semibold">
                Other Deductions: {data.otherDeductions}
              </Typography>
            </div>
            <div className="w-full border border-lightgray_01 p-4 max-w-[49%] rounded-md my-2">
              <Typography className="text-sm font-semibold">
                Total Deductions: {data.totalDeductions}
              </Typography>
            </div>
            <div className="w-full border border-lightgray_01 p-4 max-w-[100%] rounded-md my-2">
              <Typography className="text-sm font-semibold">
                Net Pay Post Tax: {data.netPayPostTax}
              </Typography>
            </div>
          </div>
        }
      </DialogBody>
      <DialogFooter>
        <PrimaryButton
          title={"Close"}
          color="secondary"
          onClick={handleOpen}
          className="mr-1"
        />
      </DialogFooter>
    </Dialog>
  );
}

export default ViewDetailsDialog;
