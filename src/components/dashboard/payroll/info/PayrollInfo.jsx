import { Dashlet } from "../../../../atomic/molecules/dashlets/dashlet";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Intent, NonIdealState } from "@blueprintjs/core";
import { connect } from "react-redux";
import { useState } from "react";
import {
  useGetPayoutsQuery,
  useProcessPayoutsMutation,
} from "../../../../store/slices/apiSlices/employer/payrollApiSlice";
import { DateDropdown } from "./DateDropdown";
import BrowserEdiTable from "../../../../atomic/organisms/csvUploads/BrowserEdiTable";
import { ONE_CLICK_HEADERS } from "../oneClickPayments/paymentFields";
import { initCSVUpload } from "../../../../store/slices/csvUploadSlice.ts";

// tech-debt: move to utilities or atoms
const Spacer = () => <>&nbsp;&nbsp;&nbsp;&nbsp;</>;

function mapStateToProps(state) {
  return {
    employerId: state.auth.user?.attributes.sub || "",
  };
}

export function _PayrollInfo({ employerId, dispatch }) {
  const [sendPayoutConfirmation] = useProcessPayoutsMutation();
  const today = new Date();
  const [date, setDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const { data, isLoading, error, refetch } = useGetPayoutsQuery({
    id: employerId,
    year: date.year,
    month: date.month,
    status: ["AWAITING_CONFIRMATION"],
  });
  let { data: awaitingConfirmationEntries, meta } = (data && data.body) ?? {
    data: [],
    meta: {},
  };

  if (awaitingConfirmationEntries.length) {
    console.log(awaitingConfirmationEntries);
    dispatch(
      initCSVUpload({
        data: awaitingConfirmationEntries.map((item) => {
          const mutableItem = Object.assign({}, item);
          mutableItem.payrollStatus = mutableItem.status;
          delete mutableItem.status;
          mutableItem.status = {};
          return mutableItem;
        }),
        fields: ONE_CLICK_HEADERS,
        fileName: `payout-info-${date.year}`,
        module: `payroll`,
      })
    );
  }
  const dateChanged = (updatedDate) => {
    setDate(updatedDate);
  };
  const processPayouts = () => {
    sendPayoutConfirmation({
      employerId,
      year: date.year,
      month: date.month,
    });
  };
  return (
    <>
      <Dashlet
        icon={<FontAwesomeIcon icon={faMoneyCheck} />}
        title={"Payout Details"}
        actions={
          <>
            <DateDropdown onChange={dateChanged} />
            <Spacer />
            <Button
              icon={"refresh"}
              loading={isLoading}
              onClick={() => refetch()}
            >
              Refresh data
            </Button>
            <Spacer />
            <Button
              icon={"bank-account"}
              intent={Intent.PRIMARY}
              onClick={processPayouts}
            >
              Process Payout
            </Button>
            <Spacer />
            <Button
              disabled={true}
              icon={"floppy-disk"}
              intent={Intent.SUCCESS}
            >
              Save Changes
            </Button>
          </>
        }
      >
        {awaitingConfirmationEntries && awaitingConfirmationEntries.length ? (
          <BrowserEdiTable
            tableName={`payout-info-${date.year}`}
            module={"payroll"}
            deletes={false}
            selection={false}
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
      </Dashlet>
    </>
  );
}

export const PayrollInfo = connect(mapStateToProps)(_PayrollInfo);
