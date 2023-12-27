import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import PrimaryButton from "./PrimaryButton";

export default function RepaymentsDialog({ open, setOpen, repaymentsData }) {
  const handleOpen = () => setOpen(!open);
  console.log("repaymentsData", repaymentsData);

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Repayments Breakdown</DialogHeader>
      <DialogBody>
        {repaymentsData?.map((item, index) => (
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
          color="primary"
          onClick={handleOpen}
          className="mr-1"
        />
      </DialogFooter>
    </Dialog>
  );
}
