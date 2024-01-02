import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useSendPayslipsMutation } from "../store/slices/apiSlices/employer/payslipsApiSlice";
import PrimaryButton from "./PrimaryButton";

const SendPayslipsDialog = ({ open, setOpen, payslipsData }) => {
  const handleOpen = () => setOpen(!open);
  console.log("payslipsDialogData", payslipsData);

  const SendSalarySlips = async () => {
    try {
      const response = await useSendPayslipsMutation();
      // Handle the response if needed
      console.log(response);
    } catch (error) {
      // Handle errors
      console.error("Error sending salary slips:", error);
    }
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Send Salary Slips</DialogHeader>
      <DialogBody>
        {payslipsData?.map((item, index) => (
          <div className="w-full border border-lightgray_01 p-4 rounded-md my-2">
            <Typography className="text-sm font-semibold">
              Paid Amount: {item.paidAmount}
            </Typography>
          </div>
        ))}
      </DialogBody>
      <DialogFooter>
        <PrimaryButton
          title={"Close"}
          color="secondary"
          onClick={handleOpen}
          className="mr-1"
        />
        <PrimaryButton
          title={"Send"}
          color="primary"
          onClick={handleOpen}
          className="mr-1"
        />
      </DialogFooter>
    </Dialog>
  );
};

export default SendPayslipsDialog;
