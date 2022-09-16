import { H4, NonIdealState } from "@blueprintjs/core";
import BrowserEdiTable from "../../../../atomic/organisms/csvUploads/BrowserEdiTable";
import { initCSVUpload } from "../../../../store/slices/csvUploadSlice.ts";
import { FIELDS, ONE_CLICK_HEADERS } from "../oneClickPayments/paymentFields";
import { noValidation } from "../../employee/onboarding/validations";
import { REQUIRED_SUFFIX } from "../util";

const HISTORICAL_PAYOUTS_HEADERS = FIELDS.concat([
  {
    header: "Payout Status",
    field: "payoutStatus",
    validations: noValidation,
  },
]).map((column) => ({
  ...column,
  Header: column.header.replace(REQUIRED_SUFFIX, ""),
  accessor: column.field,
}));

export function HistoricalPayoutsTable({ data, date, dispatch }) {
  console.log({ historical: data });
  let { data: historicalPayouts, meta } = (data && data.body) ?? {
    data: [],
    meta: {},
  };
  if (historicalPayouts.length) {
    console.log(historicalPayouts);
    dispatch(
      initCSVUpload({
        data: historicalPayouts.map((item) => {
          const mutableItem = Object.assign({}, item);
          mutableItem.payoutStatus = mutableItem.status;
          delete mutableItem.status;
          mutableItem.status = {};
          return mutableItem;
        }),
        fields: HISTORICAL_PAYOUTS_HEADERS,
        fileName: `payout-info-historical-${date.year}`,
        module: `payroll`,
      })
    );
  }
  return (
    <>
      <H4>Pending Payouts</H4>
      {historicalPayouts && historicalPayouts.length ? (
        <BrowserEdiTable
          tableName={`payout-info-historical-${date.year}`}
          module={"payroll"}
        />
      ) : (
        <NonIdealState
          icon={"property"}
          title={"No Payouts"}
          description={<>Looks like no entries for payouts</>}
          layout={"horizontal"}
        />
      )}
    </>
  );
}
