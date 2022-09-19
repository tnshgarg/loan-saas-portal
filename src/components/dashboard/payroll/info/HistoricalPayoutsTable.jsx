import { NonIdealState, ProgressBar } from "@blueprintjs/core";
import BrowserEdiTable from "../../../../atomic/organisms/csvUploads/BrowserEdiTable";
import { initCSVUpload } from "../../../../store/slices/csvUploadSlice.ts";
import { FIELDS } from "../oneClickPayments/paymentFields";
import { noValidation } from "../../employee/onboarding/validations";
import { REQUIRED_SUFFIX } from "../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { Dashlet } from "../../../../atomic/molecules/dashlets/dashlet";

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

export function HistoricalPayoutsTable({
  data: historicalPayouts,
  year,
  month,
  loading,
  dispatch,
}) {
  const key = `payout-info-historical-${year}-${month}`;

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
        fileName: key,
        module: `payouts-historical`,
      })
    );
  }
  return (
    <Dashlet icon={<FontAwesomeIcon icon={faMoneyCheck} />} title={"History"}>
      <>
        {loading ? (
          <div style={{ padding: "3em" }}>
            <ProgressBar animate stripes />
          </div>
        ) : historicalPayouts && historicalPayouts.length ? (
          <BrowserEdiTable
            disableEdits={true}
            key={key}
            tableName={key}
            module={"payouts-historical"}
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
    </Dashlet>
  );
}
