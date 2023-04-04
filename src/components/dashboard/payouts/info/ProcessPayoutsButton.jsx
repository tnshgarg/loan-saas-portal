import { connect } from "react-redux";
import { Button, Intent } from "@blueprintjs/core";
import { FS } from "../../employee/onboarding/validations";
import { CSVUploadsStateMapper } from "../../../../atomic/organisms/browserTable";
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
  return (
    <>
      <Button
        disabled={loading || disabled}
        loading={loading}
        icon={"bank-account"}
        intent={Intent.PRIMARY}
        onClick={onClick}
      >
        Process Payouts
      </Button>
    </>
  );
}

export const ProcessPayoutsButton = connect(CSVUploadsStateMapper)(
  _ProcessPayoutsButton
);
