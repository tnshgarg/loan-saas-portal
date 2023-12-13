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
import React, { useState } from "react";
import { connect } from "react-redux";
import { Spacer } from "../../../../atomic/atoms/layouts/alignment";
import { useGetPayoutsQuery } from "../../../../store/slices/apiSlices/employer/payrollApiSlice";
import { DateDropdown } from "./DateDropdown";
import {
  HISTORICAL_PAYOUTS_HEADERS,
  HistoricalPayoutsTable,
} from "./HistoricalPayoutsTable";
import { PayoutsSummary } from "./PayoutsSummary";
import { Popover2 } from "@blueprintjs/popover2";
import { PendingPayoutsTable } from "./PendingPayoutsTable";
import TableLayout from "../../../../layout/TableLayout";
import PayslipsUpload from "../../../../newComponents/PayslipsUpload";
import PrimaryButton from "../../../../newComponents/PrimaryButton";
import {
  ArrowUpTrayIcon,
  BanknotesIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
  BuildingLibraryIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Checkbox, Switch, Typography } from "@material-tailwind/react";
import StatisticsCard from "../../../../newComponents/cards/StatisticsCard";
import PayoutsUpload from "../../../../newComponents/PayoutsUpload";

// tech-debt: move to utilities or atoms

function mapStateToProps(state) {
  return {
    employerId: state.auth.user?.attributes.sub || "",
  };
}

export function _PayrollInfo({ employerId, dispatch }) {
  const TABLE_HEADERS = [
    { label: "Emp ID", value: "employerEmployeeId" },
    { label: "Name", value: "employeeName" },
    { label: "Mobile Number", value: "mobile" },
    { label: "Year", value: "year" },
    { label: "Month", value: "month" },
    { label: "Amount Payable", value: "amount" },
    { label: "Remarks", value: "remarks" },
    { label: "Account Number", value: "totalHalfDays" },
    { label: "IFSC", value: "totalHalfDays" },
    { label: "URN", value: "totalHolidays" },
    { label: "Payout Status", value: "payoutStatus" },
    { label: "Message", value: "status" },
  ];
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    setOpen(true);
  };
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
  console.log("meta", meta);
  console.log("entries", entries);
  const [filteredData, setFilteredData] = useState(entries["ALL"]);
  const metrics = {},
    totals = {};
  if (entries["ALL"]) {
    entries["ALL"].forEach((item) => {
      metrics[item.status] = (metrics[item.status] ?? 0) + 1;
      totals[item.status] =
        (totals[item.status] ?? 0) + parseInt(item["amount"]);
    });
  }

  const dataRefetch = () => {
    refetch();
  };
  const [checked, setChecked] = useState(true);
  let {
    accountHolderName,
    accountNumber,
    balance,
    balance_updated_on,
    bankName,
    ifsc,
    verifyStatus,
  } = meta?.virtual_account ?? {};

  if (checked) {
    accountNumber = "**********" + accountNumber?.slice(10);
    ifsc = "**********" + ifsc?.slice(8);
  }

  const statisticsCardsData = [
    {
      icon: BuildingLibraryIcon,
      className: "col-span-3",
      title: "Account Details",
      data: [
        {
          label: "Account Number",
          value: accountNumber,
          className: "text-primary text-[14px] font-semibold",
        },
        {
          label: "IFSC",
          value: ifsc,
          className: "text-primary text-[14px] font-semibold",
        },
        {
          label: "Balance",
          value: (balance ?? 0).toINR() + " INR",
          className: "text-primary text-[14px] font-semibold",
        },
      ],
      footer: {
        color: "text-gray",
        value: new Date(balance_updated_on).toString().split("GMT")[0],
        label: "Updated On: ",
        checkedButton: true,
      },
    },
    {
      icon: BanknotesIcon,
      className: "col-span-3",
      title: "Payout Details",
      data: [
        {
          label: "Processing",
          value:
            (totals["CONFIRMED"] ?? 0) +
            (totals["INPROGRESS"] ?? 0).toINR() +
            " INR",
          className: "text-warning text-[14px] font-semibold",
        },
        {
          label: "Completed",
          value: (totals["SUCCESS"] ?? 0).toINR() + " INR",
          className: "text-primary text-[14px] font-semibold",
        },
        {
          label: "Errors",
          value: (totals["ERROR"] ?? 0).toINR() + " INR",
          className: "text-danger text-[14px] font-semibold",
        },
      ],
      footer: {
        color: "text-green-500",
        value: 0,
        label: "Errors: ",
      },
    },
  ];

  return (
    <div className="mt-4">
      <div className="mb-6 grid gap-y-10 gap-x-4 md:grid-cols-2 xl:grid-cols-6">
        {statisticsCardsData.map(
          ({ icon, title, footer, className, ...rest }) => (
            <StatisticsCard
              className={className}
              key={title}
              {...rest}
              title={title}
              icon={React.createElement(icon, {
                className: "w-6 h-6 text-gray",
              })}
              footer={
                <div className="flex flex-row w-full items-center justify-between">
                  <Typography className="text-xs text-black">
                    {footer.label}
                    <strong className={footer.color}> {footer.value}</strong>
                  </Typography>
                  {footer.checkedButton && (
                    <Switch
                      label="Hide Details"
                      ripple={false}
                      checked={checked}
                      labelProps={{ className: "text-xs" }}
                      onChange={(e) => {
                        setChecked(e.target.checked);
                      }}
                      className={checked ? "bg-secondary" : "bg-lightGray"}
                      // containerProps={{
                      //   className: "w-11 h-4",
                      // }}
                      // circleProps={{
                      //   className: "border-none",
                      // }}
                    />
                  )}
                </div>
              }
            />
          )
        )}
      </div>
      {/* <Dashlet
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
                    value={provider}
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
      /> */}
      <div className="w-full flex-row flex items-center justify-between">
        <DateDropdown />
        <div className="flex-row flex items-center justify-between">
          <PrimaryButton
            title={"Upload Salary Data"}
            color="primary"
            size={"sm"}
            onClick={() => setOpen(true)}
            leftIcon={ArrowUpTrayIcon}
          />
          <PrimaryButton
            title={"Upload Payments"}
            color="primary"
            size={"sm"}
            onClick={() => setOpen(true)}
            leftIcon={ArrowUpTrayIcon}
          />
          <PrimaryButton
            title={"Process Payouts"}
            color="secondary"
            size={"sm"}
            className={"ml-0"}
            leftIcon={PaperAirplaneIcon}
          />
        </div>
      </div>

      <TableLayout
        mainData={data?.body}
        rowData={filteredData?.data}
        setRowData={setFilteredData}
        tableHeaders={TABLE_HEADERS}
      />
      <PayoutsUpload
        setOpen={setOpen}
        handleOpen={handleOpen}
        open={open}
        payslipsData={data?.body}
      />
    </div>
  );
}

export const PayrollInfo = connect(mapStateToProps)(_PayrollInfo);
