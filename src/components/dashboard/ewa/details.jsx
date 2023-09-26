import { Button, Intent, NonIdealState, ProgressBar } from "@blueprintjs/core";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Spacer } from "../../../atomic/atoms/layouts/alignment";
import { Dashlet } from "../../../atomic/molecules/dashlets/dashlet";
import BrowserTable from "../../../atomic/organisms/browserTable";
import { MultiLineCell } from "../../../atomic/organisms/browserTable/cells";
import { useGetDisbursementsQuery } from "../../../store/slices/apiSlices/employer/ewaApiSlice";
import { initBrowserTable } from "../../../store/slices/browserTableSlice.ts";
import { getExcel } from "../../../utils/excelHandling";
import { DateDropdown } from "../payouts/info/DateDropdown";
import EmployeeTable from "../../../newComponents/EmployeeTable";
import PrimaryButton from "../../../newComponents/PrimaryButton";
import { Option, Select, Typography } from "@material-tailwind/react";
import StatisticsCard from "../../../newComponents/cards/StatisticsCard";
import { UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import TextInput from "../../../newComponents/TextInput";

function mapStateToProps(state) {
  return {
    employerId: state.auth.user?.attributes.sub || "",
  };
}

const DISBURSEMENT_FIELDS = [
  {
    header: "Employee Id",
    field: "employeeId",
  },
  {
    header: "Principal Employer",
    field: "principalEmployer",
  },
  {
    header: "Employee Name",
    field: "name",
  },
  {
    header: "Account Number",
    field: "bankAccountNumber",
  },
  {
    header: "Availed At",
    field: "availedAt",
  },
  {
    header: "Loan Amount",
    field: "loanAmount",
  },
  {
    header: "Due Date",
    field: "dueDate",
  },
  {
    header: "Status",
    field: "loanStatus",
  },
  {
    header: "Disbursement Date",
    field: "disbursedAt",
  },
  {
    header: "Pending Amount",
    field: "pendingAmount",
  },
  {
    header: "Total Paid Amount",
    field: "paidAmount",
  },
  {
    header: "Paid Amount",
    field: "payoutAmount",
  },
  {
    header: "Payment Status",
    field: "payoutStatus",
  },
  {
    header: "Payment Time",
    field: "payoutDate",
  },
  {
    header: "Payment Mode",
    field: "transferMode",
  },
].map((column) => ({
  ...column,
  Header: column.header,
  accessor: column.field,
}));

const DISBURSEMENTS_MODULE = "disbursements";
const _Disbursements = ({ employerId, dispatch }) => {
  const today = new Date();
  const [{ year, month }, setDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });

  const dateChanged = (updatedDate) => {
    setDate(updatedDate);
    // dataRefetch();
  };

  const key = `disbursements-info-historical-${year}-${month}`;
  const { data, isLoading, refetch, isFetching } = useGetDisbursementsQuery({
    id: employerId,
    year: year,
    month: month,
  });
  const [safeDisbursements, setSafeDisbursements] = useState([]);

  useEffect(() => {
    const disbursementsCurrent = data?.body ?? [];
    console.log(disbursementsCurrent);
    const safeDisbursementsCurrent = disbursementsCurrent.map((item) => {
      const mutableItem = Object.assign({}, item);
      mutableItem.loanStatus = mutableItem.status;
      mutableItem.pendingAmount =
        mutableItem.loanAmount - (mutableItem.paidAmount || 0);
      mutableItem.status = {};
      return mutableItem;
    });
    setSafeDisbursements(safeDisbursementsCurrent);
    if (safeDisbursementsCurrent.length) {
      dispatch(
        initBrowserTable({
          data: safeDisbursementsCurrent,
          fields: DISBURSEMENT_FIELDS,
          fileName: key,
          module: DISBURSEMENTS_MODULE,
        })
      );
    }
  }, [data]);

  const dataRefetch = () => {
    refetch();
  };
  const downloadExcel = () => {
    getExcel([{ headers: DISBURSEMENT_FIELDS }], safeDisbursements);
  };
  const statisticsCardsData = [
    {
      icon: UserGroupIcon,
      className: "col-span-2",
      title: "On Demand Withdrawal",
      data: [
        { label: "All Employees", value: 345, className: "text-primary" },
        { label: "All Employees", value: 345, className: "text-primary" },
      ],
      footer: {
        color: "text-green-500",
        value: "345",
        label: "Active Employees:",
      },
    },
    {
      icon: UserIcon,
      className: "col-span-2",
      title: "Offer Available",
      data: [
        { label: "Enrolled Employees", value: 45, className: "text-primary" },
        { label: "Enrolled Employees", value: 45, className: "text-primary" },
      ],

      footer: {
        color: "text-green-500",
        value: "45",
        label: "KYC Done:",
      },
    },
  ];
  return (
    <div className="mt-4">
      {/* <Dashlet
        icon={<FontAwesomeIcon icon={faWallet} />}
        title={"Disbursements"}
        actions={
          <>
            <DateDropdown onChange={dateChanged} />
            <Spacer />
            <Button icon={"refresh"} loading={false} onClick={dataRefetch}>
              Refresh data
            </Button>
            <Spacer />
            <Button
              icon={"download"}
              intent={Intent.SUCCESS}
              onClick={downloadExcel}
            >
              Download Excel
            </Button>
          </>
        }
      >
        {isLoading || isFetching ? (
          <div style={{ padding: "3em" }}>
            <ProgressBar animate stripes />
          </div>
        ) : safeDisbursements && safeDisbursements.length ? (
          <BrowserTable
            key={"ewa-info"}
            tableName={key}
            module={DISBURSEMENTS_MODULE}
            disableEdits={true}
            customCells={{
              transferMode: MultiLineCell,
              payoutDate: MultiLineCell,
              payoutAmount: MultiLineCell,
              payoutStatus: MultiLineCell,
            }}
          />
        ) : (
          <>
            <br />
            <NonIdealState
              icon={"property"}
              title={"No Disbursements"}
              description={
                <>Looks like no disbursements were made this month</>
              }
              layout={"horizontal"}
            />
          </>
        )}
      </Dashlet> */}

      <div className="mb-6 grid gap-y-10 gap-x-4 md:grid-cols-3 xl:grid-cols-5">
        {statisticsCardsData.map(({ icon, title, footer, span, ...rest }) => (
          <StatisticsCard
            span={span}
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-gray",
            })}
            footer={
              <Typography className="text-md text-black">
                {footer.label}
                <strong className={footer.color}> {footer.value}</strong>
              </Typography>
            }
          />
        ))}
      </div>

      <div className="w-full flex-row flex items-center justify-between">
        <TextInput label="Search for an employee" />
        <PrimaryButton
          title={"Advance Filter"}
          color="secondary"
          variant={"outlined"}
        />
        <PrimaryButton
          title={"Download"}
          color="secondary"
          variant={"outlined"}
        />
      </div>
      <div className="w-full flex-row flex items-center justify-between">
        <div className="w-72">
          <Select label="Select Date" className="rounded-md bg-white">
            <Option>Jan 2023</Option>
            <Option>Jan 2023</Option>
            <Option>Jan 2023</Option>
            <Option>Jan 2023</Option>
            <Option>Jan 2023</Option>
          </Select>
        </div>
        {/* <div className="flex-row flex items-center justify-between">
          <PrimaryButton title={"Send Salary Slip"} color="secondary" />
        </div> */}
      </div>
      <EmployeeTable />
      {/* <div className="w-full flex-row flex items-center justify-between">
        <TextInput />
        <PrimaryButton title={"Filter"} />
        <PrimaryButton title={"Download"} />
      </div> */}

      {/* <EmployerMetrics
        data={metricsData}
        primaryKey={"SUCCESS"}
        config={metricsConfig}
      /> */}
      {/* <Dashlet
        icon={"people"}
        title={"Employee Records"}
        actions={
          <>
            <Button icon={"refresh"} onClick={createHandler("refresh")}>
              Refresh
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              icon={"saved"}
              intent={Intent.SUCCESS}
              onClick={createHandler("download-excel")}
            >
              Download Excel
            </Button>
          </>
        }
      >
        <TabularViewTab handlers={handlers} />
      </Dashlet> */}
    </div>
  );
};
export const Disbursements = connect(mapStateToProps)(_Disbursements);
