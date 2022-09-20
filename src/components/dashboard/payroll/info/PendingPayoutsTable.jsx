import {
  Card,
  H4,
  Intent,
  NonIdealState,
  ProgressBar,
  Tag,
} from "@blueprintjs/core";
import BrowserEdiTable from "../../../../atomic/organisms/csvUploads/BrowserEdiTable";
import { initCSVUpload } from "../../../../store/slices/csvUploadSlice.ts";
import { ONE_CLICK_HEADERS } from "../oneClickPayments/paymentFields";
import { useProcessPayoutsMutation } from "../../../../store/slices/apiSlices/employer/payrollApiSlice";
import { Dashlet } from "../../../../atomic/molecules/dashlets/dashlet";
import { Spacer } from "../../../../atomic/atoms/layouts/alignment";
import { createPayoutHash, SavePayoutButton } from "./SavePayoutButton";
import { ProcessPayoutsButton } from "./ProcessPayoutsButton";
import { VirtualAccountInfo } from "./VirtualAccountInfo";

export function PendingPayoutsTable({
  data: pendingPayouts,
  meta,
  employerId,
  year,
  month,
  loading,
  dispatch,
}) {
  const [sendPayoutConfirmation, { isLoading: isProcessing }] =
    useProcessPayoutsMutation();
  const key = `payout-info-pending-${year}-${month}`;
  const virtual_account = meta?.virtual_account;
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
  const totalAmount = pendingPayouts.reduce(
    (total, item) => total + item.amountPayable,
    0
  );
  const sufficientFunds =
    totalAmount > 0 && totalAmount < virtual_account.balance;
  return (
    <Dashlet
      icon={"time"}
      title={"Pending"}
      actions={
        <>
          {/*techdebt: move this to another component*/}
          {totalAmount ? (
            sufficientFunds ? (
              <Tag minimal intent={Intent.SUCCESS} icon={"tick"}>
                {totalAmount.toINR()} is available in account
              </Tag>
            ) : (
              <Tag minimal intent={Intent.DANGER} icon={"cross"}>
                {(totalAmount - virtual_account.balance).toINR()} needs to be
                transferred
              </Tag>
            )
          ) : (
            <Tag minimal icon={"clean"}>
              No Pending Payouts
            </Tag>
          )}
          <Spacer />
          <ProcessPayoutsButton
            employerId={employerId}
            tableName={key}
            month={month}
            year={year}
            module={"payouts-pending"}
            loading={loading}
            disabled={!sufficientFunds}
          />
          <Spacer />
          <SavePayoutButton
            employerId={employerId}
            tableName={key}
            module={"payouts-pending"}
            loading={loading}
          />
        </>
      }
    >
      <Card>
        <H4> Virtual Account Details </H4>
        {virtual_account && null ? (
          <VirtualAccountInfo {...virtual_account} />
        ) : (
          <NonIdealState icon={"error"}>
            There seems to be an issue with your virtual account contact
            <a href="mailto:support@unipe.co">support@unipe.co</a>
          </NonIdealState>
        )}
      </Card>
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
