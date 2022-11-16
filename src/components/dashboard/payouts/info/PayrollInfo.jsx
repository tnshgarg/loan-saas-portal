import { Dashlet } from "../../../../atomic/molecules/dashlets/dashlet";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  HTMLSelect,
  Intent,
  PopoverPosition,
} from "@blueprintjs/core";
import { useState } from "react";
import { connect } from "react-redux";
import { Spacer } from "../../../../atomic/atoms/layouts/alignment";
import { useGetPayoutsQuery } from "../../../../store/slices/apiSlices/employer/payrollApiSlice";
import { DateDropdown } from "./DateDropdown";
import { HistoricalPayoutsTable } from "./HistoricalPayoutsTable";
import { PayoutsSummary } from "./PayoutsSummary";
import { Popover2 } from "@blueprintjs/popover2";
import { PendingPayoutsTable } from "./PendingPayoutsTable";

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
    month: today.getMonth() + 1,
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
  const [provider, setProvider] = useState("cashfree");
  // techdebt: error handling
  const { data, isLoading, refetch, isFetching } = useGetPayoutsQuery({
    id: employerId,
    year: year,
    month: month,
    provider,
  });
  let meta = data?.body?.meta;

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
            <Popover2
              position={PopoverPosition.BOTTOM}
              content={
                <Card>
                  Provider
                  <Spacer />
                  <HTMLSelect
                    options={["cashfree", "razorpay"]}
                    onChange={(item) => setProvider(item.target.value)}
                  />
                </Card>
              }
            >
              <Button intent={Intent.NONE} icon={"cog"} />
            </Popover2>
            <Spacer />
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
        {...{ employerId, year, month, dispatch, meta, provider }}
        data={entries["PENDING"]}
        loading={isLoading || isFetching}
      />
      <HistoricalPayoutsTable
        {...{ year, month, dispatch }}
        data={entries["HISTORY"]}
        loading={isLoading || isFetching}
      />
    </>
  );
}

export const PayrollInfo = connect(mapStateToProps)(_PayrollInfo);
