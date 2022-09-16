import { Dashlet } from "../../../../atomic/molecules/dashlets/dashlet";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Intent } from "@blueprintjs/core";
import { connect } from "react-redux";
import { useState } from "react";
import {
  useGetPayoutsQuery,
  useProcessPayoutsMutation,
} from "../../../../store/slices/apiSlices/employer/payrollApiSlice";
import { DateDropdown } from "./DateDropdown";
import { PendingPayoutsTable } from "./PendingPayoutsTable";
import { HistoricalPayoutsTable } from "./HistoricalPayoutsTable";

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
  const {
    data: pendingPayoutsData,
    isLoading: pendingPayoutsLoading,
    error: pendingPayoutserror,
    refetch: pendingPayoutsRefetch,
  } = useGetPayoutsQuery({
    id: employerId,
    year: date.year,
    month: date.month,
    status: ["AWAITING_CONFIRMATION"],
  });

  const {
    data: historicalPayoutsData,
    isLoading: historicalPayoutsLoading,
    error: historicalPayoutserror,
    refetch: historicalPayoutsRefetch,
  } = useGetPayoutsQuery({
    id: employerId,
    year: date.year,
    month: date.month,
    status: ["CONFIRMED", "INPROGRESS", "ERRORED", "ERROR", "SUCCESS"],
  });

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
              loading={pendingPayoutsLoading || historicalPayoutsLoading}
              onClick={() => {
                pendingPayoutsRefetch();
                historicalPayoutsRefetch();
              }}
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
        <div style={{ padding: "0.5em" }}>
          <PendingPayoutsTable
            data={pendingPayoutsData}
            {...{ date, dispatch }}
          />
          <HistoricalPayoutsTable
            data={historicalPayoutsData}
            {...{ date, dispatch }}
          />
        </div>
      </Dashlet>
    </>
  );
}

export const PayrollInfo = connect(mapStateToProps)(_PayrollInfo);
