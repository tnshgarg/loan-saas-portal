import { Button, Intent, NonIdealState, ProgressBar } from "@blueprintjs/core";
import BrowserEdiTable from "../../../../atomic/organisms/csvUploads/BrowserEdiTable";
import { initCSVUpload } from "../../../../store/slices/csvUploadSlice.ts";
import { ONE_CLICK_HEADERS } from "../oneClickPayments/paymentFields";
import { useProcessPayoutsMutation } from "../../../../store/slices/apiSlices/employer/payrollApiSlice";
import { Dashlet } from "../../../../atomic/molecules/dashlets/dashlet";
import { Spacer } from "../../../../atomic/atoms/layouts/alignment";
import { createPayoutHash, SavePayoutButton } from "./SavePayoutButton";

export function PendingPayoutsTable({
  data: pendingPayouts,
  employerId,
  year,
  month,
  loading,
  dispatch,
}) {
  const [sendPayoutConfirmation, { isLoading: isProcessing }] =
    useProcessPayoutsMutation();
  const key = `payout-info-pending-${year}-${month}`;
  if (pendingPayouts.length) {
    console.log(pendingPayouts);
    dispatch(
      initCSVUpload({
        data: pendingPayouts.map((item) => {
          const mutableItem = Object.assign({}, item);
          mutableItem.payrollStatus = mutableItem.status;
          delete mutableItem.status;
          mutableItem.status = {};
          mutableItem.initialHash = createPayoutHash(item);
          return mutableItem;
        }),
        fields: ONE_CLICK_HEADERS,
        fileName: key,
        module: `payouts-pending`,
      })
    );
  }

  const processPayouts = () => {
    sendPayoutConfirmation({
      employerId,
      year: year,
      month: month,
    });
  };

  return (
    <Dashlet
      icon={"time"}
      title={"Pending"}
      actions={
        <>
          <Button
            icon={"bank-account"}
            intent={Intent.PRIMARY}
            onClick={processPayouts}
            loading={loading || isProcessing}
          >
            Process Payout
          </Button>
          <Spacer />
          <SavePayoutButton
            tableName={key}
            module={"payouts-pending"}
            loading={loading}
          />
        </>
      }
    >
      {pendingPayouts && pendingPayouts.length ? (
        <BrowserEdiTable
          key={key}
          tableName={key}
          module={"payouts-pending"}
          deletes={true}
          selection={true}
        />
      ) : loading ? (
        <div style={{ padding: "3em" }}>
          <ProgressBar animate stripes />
        </div>
      ) : (
        <NonIdealState
          icon={"property"}
          title={"No Pending Payouts"}
          description={
            <>
              Looks like no entries are pending confirmation, please upload
              payouts or check the history tab
            </>
          }
          layout={"horizontal"}
        />
      )}
    </Dashlet>
  );
}
