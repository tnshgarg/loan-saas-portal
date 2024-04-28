import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { FS } from "../components/dashboard/employee/onboarding/validations";
import { getTotalPayoutsAmount } from "../components/dashboard/payouts/util";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

const ProcessPayouts = ({
  data,
  employerId,
  month,
  year,
  provider,
  loading,
  disabled,
  updateHook: processPayouts,
}) => {
  const [overrideDialog, setOverrideDialog] = useState(false);

  const openOverrideDialog = () => {
    setOverrideDialog(true);
  };

  const closeOverrideDialog = () => {
    setOverrideDialog(false);
  };

  const onClickConfirm = () => {
    const payload = {
      employerId,
      year,
      month,
      timestamp: new Date().toISOString(),
    };
    const selected = data.filter((item) => item.status[FS.SELECTED]);
    if (selected.length) {
      payload.payouts = selected.map((item) => item._id);
    }
    payload["provider"] = provider;
    processPayouts(payload);
    closeOverrideDialog();
  };

  const getPayoutsSummary = () => {
    let totalPayouts = data.length;
    let netAmount = getTotalPayoutsAmount(data);

    const selected = data.filter((item) => item.status[FS.SELECTED]);
    if (selected.length) {
      totalPayouts = selected.length;
      netAmount = getTotalPayoutsAmount(selected);
    }

    return (
      <>
        <p>{`Total Payouts : ${totalPayouts}`}</p>
        <p>{`Net Amount : ${netAmount.toINR()}`}</p>
      </>
    );
  };
  return (
    <>
      <PrimaryButton
        title={"Process Payouts"}
        color="secondary"
        size={"sm"}
        className={"ml-0"}
        leftIcon={PaperAirplaneIcon}
        onClick={openOverrideDialog}
      />
      <Dialog open={overrideDialog} size={"sm"} handler={openOverrideDialog}>
        <DialogHeader>Process Payouts</DialogHeader>
        <DialogBody>{getPayoutsSummary()}</DialogBody>
        <DialogFooter>
          <PrimaryButton
            title={"Cancel"}
            color="secondary"
            size={"sm"}
            className={"ml-0"}
            onClick={closeOverrideDialog}
          />
          <PrimaryButton
            title={"Confirm"}
            color="primary"
            size={"sm"}
            className={"ml-0"}
            onClick={onClickConfirm}
          />
          {/* <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleOpen(null)}
          >
            <span>Confirm</span>
          </Button> */}
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ProcessPayouts;
