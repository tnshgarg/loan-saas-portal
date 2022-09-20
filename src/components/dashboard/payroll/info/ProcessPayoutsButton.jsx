import { connect } from "react-redux";
import { Button, Intent } from "@blueprintjs/core";
import { CSVUploadsStateMapper } from "../../../../atomic/organisms/csvUploads/BrowserEdiTable";
import { useProcessPayoutsMutation } from "../../../../store/slices/apiSlices/employer/payrollApiSlice";
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
}) {
  const [processPayouts, { isLoading }] = useProcessPayoutsMutation();
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
    processPayouts(selected);
  };
  return (
    <>
      <Button
        disabled={loading || isLoading || disabled}
        loading={isLoading}
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
