import { Intent } from "@blueprintjs/core";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { AppToaster } from "../contexts/ToastContext";
import { useSendPayslipsMutation } from "../store/slices/apiSlices/employer/payslipsApiSlice";
import PrimaryButton from "./PrimaryButton";

const SendPayslipsDialog = ({ open, setOpen, payslipsData }) => {
  const handleOpen = () => setOpen(!open);
  const [sendPayslips] = useSendPayslipsMutation();
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);

  useEffect(() => {
    getTotalPaidAmount();
  }, [payslipsData]);

  const getTotalPaidAmount = async () => {
    if (payslipsData) {
      const paidAmount = await payslipsData.reduce(
        (sum, item) => sum + item.earning,
        0
      );
      setTotalPaidAmount(paidAmount);
    }
  };

  const sendSalarySlips = async () => {
    try {
      const unipeEmployeeIds = await payslipsData.map(
        (item) => item.unipeEmployeeId
      );

      const response = await sendPayslips({
        payslips: unipeEmployeeIds,
      });

      setOpen(false);
      if (response.data.status == 200) {
        AppToaster.show({
          intent: Intent.SUCCESS,
          message: response.data.message,
        });
      } else {
        AppToaster.show({
          intent: Intent.DANGER,
          message: "Could Not Upload Payslips, Please Try Again",
        });
      }
    } catch (error) {
      console.error("Error sending salary slips:", error);
    }
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Send Salary Slips</DialogHeader>
      <DialogBody>
        {
          <div className="w-full border border-lightgray_01 p-4 rounded-md my-2">
            <Typography className="text-sm font-semibold">
              Total Paid Amount: {totalPaidAmount}
            </Typography>
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
        <PrimaryButton
          title={"Send"}
          color="primary"
          onClick={sendSalarySlips}
          className="mr-1"
        />
      </DialogFooter>
    </Dialog>
  );
};

export default SendPayslipsDialog;
