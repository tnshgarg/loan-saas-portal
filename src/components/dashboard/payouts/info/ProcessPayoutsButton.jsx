import { Button, Intent } from "@blueprintjs/core";
import { Classes, Popover2 } from "@blueprintjs/popover2";
import { connect } from "react-redux";
import { Spacer } from "../../../../atomic/atoms/layouts/alignment";
import { CSVUploadsStateMapper } from "../../../../atomic/organisms/browserTable";
import { FS } from "../../employee/onboarding/validations";
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
  const onClick = () => {
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
  };

  const getPayoutsSummary = () => {
    const selected = data.filter((item) => item.status[FS.SELECTED]);
    const totalPayouts = selected.length;
    const netAmount = selected.reduce((totalPayoutsAmount, currentPayout) => {
      const currentPayoutAmount = parseInt(currentPayout.amount);
      return totalPayoutsAmount + currentPayoutAmount;
    }, 0);

    return (
      <>
        <p>{`Total Payouts : ${totalPayouts}`}</p>
        <p>{`Net Amount : ${netAmount.toINR()}`}</p>
      </>
    );
  };

  return (
    <>
      <Popover2
        interactionKind="click"
        popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
        placement="bottom"
        content={
          <div>
            <h3>Payouts Summary</h3>
            {getPayoutsSummary()}
            <Button
              className={Classes.POPOVER2_DISMISS}
              text="Cancel"
              intent={Intent.DANGER}
            />
            <Spacer />
            <Button
              className={Classes.POPOVER2_DISMISS}
              text="Confirm"
              intent={Intent.SUCCESS}
              onClick={onClick}
            />
          </div>
        }
        renderTarget={({ isOpen, ref, ...targetProps }) => (
          <Button
            {...targetProps}
            elementRef={ref}
            disabled={loading || disabled}
            loading={loading}
            icon={"bank-account"}
            intent={Intent.PRIMARY}
            text="Process Payouts"
          />
        )}
      />
    </>
  );
}

export const ProcessPayoutsButton = connect(CSVUploadsStateMapper)(
  _ProcessPayoutsButton
);
