import {
  Button,
  Card,
  H4,
  Intent,
  NonIdealState,
  ProgressBar,
  Tag,
} from "@blueprintjs/core";
import { Spacer } from "../../../../atomic/atoms/layouts/alignment";
import { Dashlet } from "../../../../atomic/molecules/dashlets/dashlet";
import BrowserTable from "../../../../atomic/organisms/browserTable";
import {
  useFetchInstrumentMutation,
  useProcessPayoutsMutation,
  useUpdatePayoutsMutation,
} from "../../../../store/slices/apiSlices/employer/payrollApiSlice";
import { initBrowserTable } from "../../../../store/slices/browserTableSlice.ts";
import { ONE_CLICK_HEADERS } from "../employeeSalary/employeeSalaryFields";
import { ProcessPayoutsButton } from "./ProcessPayoutsButton";
import { SavePayoutButton, createPayoutHash } from "./SavePayoutButton";
import { VirtualAccountInfo } from "./VirtualAccountInfo";

export function PendingPayoutsTable({
  data: pendingPayouts,
  meta,
  employerId,
  year,
  month,
  loading,
  dispatch,
  provider,
}) {
  const [sendPayoutConfirmation, { isLoading: isProcessing }] =
    useProcessPayoutsMutation();
  const [updatePayouts, { isLoading: isSaving }] = useUpdatePayoutsMutation();
  const [fetchInstrument] = useFetchInstrumentMutation();
  const key = `payout-info-pending-${year}-${month}`;
  const virtual_account = meta?.virtual_account;
  if (pendingPayouts.length) {
    console.log(pendingPayouts);
    dispatch(
      initBrowserTable({
        data: pendingPayouts.map((item) => {
          const mutableItem = Object.assign({}, item);
          mutableItem.payrollStatus = mutableItem.status;
          delete mutableItem.status;
          delete mutableItem.message;
          delete mutableItem.errorReason;
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
    (total, item) => total + item.amount,
    0
  );

  const refetchInstrument = () => {
    fetchInstrument({
      employerId,
    });
  };
  const sufficientFunds =
    totalAmount > 0 && totalAmount < virtual_account?.balance;
  const providerLabel = {
    cashfree: (
      <Tag intent={Intent.WARNING} minimal large>
        Cashfree
      </Tag>
    ),
    razorpay: (
      <Tag intent={Intent.PRIMARY} minimal large>
        Razorpay
      </Tag>
    ),
  };
  return (
    <Dashlet
      icon={"time"}
      title={"Pending"}
      loading={loading}
      actions={
        <>
          {/*techdebt: move this to another component*/}
          <div style={{ display: "inline-block" }}>
            {totalAmount ? (
              sufficientFunds ? (
                <Tag minimal intent={Intent.SUCCESS} icon={"tick"}>
                  {(totalAmount || 0).toINR()} is available in account
                </Tag>
              ) : (
                <Tag minimal intent={Intent.DANGER} icon={"cross"}>
                  shortfall of{" "}
                  {(totalAmount - (virtual_account?.balance ?? 0)).toINR()} INR
                  in Account
                </Tag>
              )
            ) : (
              <Tag minimal icon={"clean"}>
                No Pending Payouts
              </Tag>
            )}
          </div>
          <Spacer />
          <ProcessPayoutsButton
            employerId={employerId}
            tableName={key}
            month={month}
            year={year}
            provider={provider}
            module={"payouts-pending"}
            loading={loading || isProcessing}
            disabled={!sufficientFunds}
            updateHook={sendPayoutConfirmation}
          />
          <Spacer />
          <SavePayoutButton
            employerId={employerId}
            tableName={key}
            module={"payouts-pending"}
            loading={loading}
            saveHook={updatePayouts}
          />
        </>
      }
    >
      <Card>
        <H4> Payout Account Details {providerLabel[provider]}</H4>
        {virtual_account ? (
          <VirtualAccountInfo {...virtual_account} employerId={employerId} />
        ) : (
          <NonIdealState icon={"error"}>
            There seems to be an issue with your virtual account contact
            <a href="mailto:support@unipe.co">support@unipe.co</a>
            or
            <Button onClick={refetchInstrument}>Try Refreshing Details</Button>
          </NonIdealState>
        )}
      </Card>
      {loading || isProcessing || isSaving ? (
        <div style={{ padding: "3em" }}>
          <ProgressBar animate stripes />
        </div>
      ) : pendingPayouts && pendingPayouts.length ? (
        <BrowserTable
          key={key}
          tableName={key}
          module={"payouts-pending"}
          deletes={true}
          selection={true}
        />
      ) : (
        <>
          <br />
          <NonIdealState
            icon={"property"}
            title={"No Pending Payouts"}
            description={
              <>
                Looks like no entries are pending confirmation, please upload
                payouts or check the history xtab
              </>
            }
            layout={"horizontal"}
          />
        </>
      )}
    </Dashlet>
  );
}
