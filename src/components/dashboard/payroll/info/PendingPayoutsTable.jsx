import { H4, NonIdealState } from "@blueprintjs/core";
import BrowserEdiTable from "../../../../atomic/organisms/csvUploads/BrowserEdiTable";
import { initCSVUpload } from "../../../../store/slices/csvUploadSlice.ts";
import { ONE_CLICK_HEADERS } from "../oneClickPayments/paymentFields";

export function PendingPayoutsTable({ data, date, dispatch }) {
  console.log({ pending: data });
  let { data: pendingPayouts, meta } = (data && data.body) ?? {
    data: [],
    meta: {},
  };
  if (pendingPayouts.length) {
    console.log(pendingPayouts);
    dispatch(
      initCSVUpload({
        data: pendingPayouts.map((item) => {
          const mutableItem = Object.assign({}, item);
          mutableItem.payrollStatus = mutableItem.status;
          delete mutableItem.status;
          mutableItem.status = {};
          return mutableItem;
        }),
        fields: ONE_CLICK_HEADERS,
        fileName: `payout-info-pending-${date.year}`,
        module: `payroll`,
      })
    );
  }
  return (
    <>
      <H4>Pending Payouts</H4>
      {pendingPayouts && pendingPayouts.length ? (
        <BrowserEdiTable
          tableName={`payout-info-pending-${date.year}`}
          module={"payroll"}
          deletes={true}
          selection={true}
        />
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
    </>
  );
}
