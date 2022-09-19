import { Dashlet } from "../../../../atomic/molecules/dashlets/dashlet";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@blueprintjs/core";
import { connect } from "react-redux";
import { useState } from "react";
import { DateDropdown } from "./DateDropdown";
import { PendingPayoutsTable } from "./PendingPayoutsTable";
import { HistoricalPayoutsTable } from "./HistoricalPayoutsTable";
import { PayoutsSummary } from "./PayoutsSummary";
import { Spacer } from "../../../../atomic/atoms/layouts/alignment";
import { useGetPayoutsQuery } from "../../../../store/slices/apiSlices/employer/payrollApiSlice";

// tech-debt: move to utilities or atoms

function mapStateToProps(state) {
  return {
    employerId: state.auth.user?.attributes.sub || "",
  };
}

export function _PayrollInfo({ employerId, dispatch }) {
  const today = new Date();
  const [{ year, month }, setDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const dateChanged = (updatedDate) => {
    setDate(updatedDate);
    // dataRefetch();
  };

  const entries = {
    ALL: [],
    PENDING: [],
    HISTORY: [],
  };
  // techdebt: error handling
  const { data, isLoading, refetch, isFetching } = useGetPayoutsQuery({
    id: employerId,
    year: year,
    month: month,
  });
  if (data && data.body && data.body.data) {
    data.body.data.forEach((item) => {
      entries["ALL"].push(item);

      (item["status"] === "AWAITING_CONFIRMATION"
        ? entries["PENDING"]
        : entries["HISTORY"]
      ).push(item);
    });
  }
  const dataRefetch = () => {
    refetch();
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
            <Button icon={"refresh"} loading={false} onClick={dataRefetch}>
              Refresh data
            </Button>
          </>
        }
      />
      <PayoutsSummary
        {...{ year, month, dispatch }}
        data={entries["ALL"]}
        loading={isLoading || isFetching}
      />
      <PendingPayoutsTable
        {...{ employerId, year, month, dispatch }}
        data={entries["PENDING"]}
      />
      <HistoricalPayoutsTable
        {...{ year, month, dispatch }}
        data={entries["HISTORY"]}
      />
    </>
  );
}

export const PayrollInfo = connect(mapStateToProps)(_PayrollInfo);
