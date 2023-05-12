import { Button, Intent, NonIdealState, ProgressBar } from "@blueprintjs/core";
import BrowserTable from "../../../../atomic/organisms/browserTable";
import { initBrowserTable } from "../../../../store/slices/browserTableSlice.ts";
import { FIELDS } from "../employeeSalary/employeeSalaryFields";
import { noValidation } from "../../employee/onboarding/validations";
import { REQUIRED_SUFFIX } from "../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { Dashlet } from "../../../../atomic/molecules/dashlets/dashlet";
import { getExcel } from "../../../../utils/excelHandling";

const HISTORICAL_PAYOUTS_HEADERS = FIELDS.concat([
  {
    header: "Account Number",
    field: "accountNumber",
    validations: noValidation,
  },
  {
    header: "IFSC",
    field: "ifsc",
    validations: noValidation,
  },
  {
    header: "URN",
    field: "bankReferenceNumber",
    validations: noValidation,
  },
  {
    header: "Payout Status",
    field: "payoutStatus",
    validations: noValidation,
  },
  {
    header: "Message",
    field: "message",
    validations: noValidation,
  },
]).map((column) => ({
  ...column,
  Header: column.header.replace(REQUIRED_SUFFIX, ""),
  accessor: column.field,
}));

export function HistoricalPayoutsTable({
  data,
  year,
  month,
  loading,
  dispatch,
}) {
  const key = `payout-info-historical-${year}-${month}`;
  const historicalPayouts = data.map((item) => {
    const mutableItem = Object.assign({}, item);
    mutableItem.payoutStatus = mutableItem.status;
    mutableItem.message = mutableItem?.context?.message;
    delete mutableItem.status;
    mutableItem.status = {};
    return mutableItem;
  });
  if (historicalPayouts.length) {
    console.log({ historicalPayouts });
    dispatch(
      initBrowserTable({
        data: historicalPayouts,
        fields: HISTORICAL_PAYOUTS_HEADERS,
        fileName: key,
        module: `payouts-historical`,
      })
    );
  }
  return (
    <Dashlet
      icon={<FontAwesomeIcon icon={faMoneyCheck} />}
      title={"History"}
      loading={loading}
      actions={
        <>
          <Button
            icon={"saved"}
            intent={Intent.SUCCESS}
            onClick={() =>
              getExcel(
                [{ headers: HISTORICAL_PAYOUTS_HEADERS }],
                historicalPayouts,
                "Payouts"
              )
            }
          >
            Download Excel
          </Button>
        </>
      }
    >
      <>
        {loading ? (
          <div style={{ padding: "3em" }}>
            <ProgressBar animate stripes />
          </div>
        ) : historicalPayouts && historicalPayouts.length ? (
          <BrowserTable
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
