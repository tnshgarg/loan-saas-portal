import { connect } from "react-redux";
import { Button, Intent } from "@blueprintjs/core";
import { CSVUploadsStateMapper } from "../../../../atomic/organisms/csvUploads/BrowserEdiTable";
import { FS } from "../../employee/onboarding/validations";

function _ProcessPayoutsButton({
  data,
  employerId,
  month,
  year,
  tableName,
  module,
  loading,
  disabled,
  updateHook: processPayouts,
}) {
  const onClick = () => {
    const payload = {
      employerId,
      year,
      month,
    };
    const selected = data.filter((item) => item.status[FS.SELECTED]);
    if (selected.length) {
      payload.payouts = selected.map((item) => item._id);
    }
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
