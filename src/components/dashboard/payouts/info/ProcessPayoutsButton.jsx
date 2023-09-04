import { Button, Classes, Dialog, Intent } from "@blueprintjs/core";
import { useState } from "react";
import { connect } from "react-redux";
import { Spacer } from "../../../../atomic/atoms/layouts/alignment";
import { CSVUploadsStateMapper } from "../../../../atomic/organisms/browserTable";
import { FS } from "../../employee/onboarding/validations";
import { getTotalPayoutsAmount } from "../util";
function _ProcessPayoutsButton({
  data,
  employerId,
  month,
  year,
  provider,
  loading,
  disabled,
  updateHook: processPayouts,
}) {
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
      <Button
        disabled={loading || disabled}
        loading={loading}
        icon={"bank-account"}
        intent={Intent.PRIMARY}
        onClick={openOverrideDialog}
      >
        Process Payouts
      </Button>

      <Dialog
        isOpen={overrideDialog}
        onClose={closeOverrideDialog}
        title={`Payouts Summary`}
        icon={"error"}
        intent={Intent.DANGER}
      >
        <div className={Classes.DIALOG_BODY}>{getPayoutsSummary()}</div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              text="Cancel"
              intent={Intent.DANGER}
              onClick={closeOverrideDialog}
            />
            <Spacer />
            <Button
              text="Confirm"
              intent={Intent.SUCCESS}
              onClick={onClickConfirm}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}

export const ProcessPayoutsButton = connect(CSVUploadsStateMapper)(
  _ProcessPayoutsButton
);
