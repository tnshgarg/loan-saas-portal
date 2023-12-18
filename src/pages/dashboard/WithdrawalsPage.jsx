import { BanknotesIcon } from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { DateDropdown } from "../../components/dashboard/payouts/info/DateDropdown.jsx";
import TableLayout from "../../layout/TableLayout.jsx";
import StatisticsCard from "../../newComponents/cards/StatisticsCard.jsx";
import { useGetDisbursementsQuery } from "../../store/slices/apiSlices/employer/ewaApiSlice.js";
import { initBrowserTable } from "../../store/slices/browserTableSlice.ts";
import { getExcel } from "../../utils/excelHandling.js";

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
const _WithdrawalsPage = ({ employerId, dispatch }) => {
  const today = new Date();
  const [{ year, month }, setDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });

  const TABLE_HEADERS = [
    { label: "Emp ID", value: "employerEmployeeId" },
    { label: "Name", value: "name" },
    { label: "Withdrawn", value: "ewa" },
    { label: "Status", value: "totalPresentDays" },
    { label: "Disbursement date", value: "totalHalfDays" },
    { label: "Due Date", value: "totalHolidays" },
    { label: "UTR number", value: "totalHolidays" },
    { label: "Bank Account", value: "totalHolidays" },
    { label: "", value: "options" },
  ];

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

  console.log("Dis:", data?.body);
  const [filteredData, setFilteredData] = useState(data?.body);

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
      icon: BanknotesIcon,
      className: "col-span-2",
      title: "On Demand Withdrawal",
      data: [
        { label: "Total Amount", value: "₹4,57,000", className: "text-black" },
        { label: "Employees", value: 567, className: "text-black" },
      ],
    },
    {
      icon: BanknotesIcon,
      className: "col-span-2",
      title: "Offer Available",
      data: [
        {
          label: "Amount Available",
          value: "₹4,57,000",
          className: "text-black",
        },
        { label: "Employee Available ", value: 567, className: "text-black" },
      ],
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

      <DateDropdown />

      <div className="mb-6 mt-4 grid gap-y-10 gap-x-4 md:grid-cols-3 xl:grid-cols-5">
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
              footer && (
                <Typography className="text-md text-black">
                  {footer.label}
                  <strong className={footer.color}> {footer.value}</strong>
                </Typography>
              )
            }
          />
        ))}
      </div>

      <TableLayout
        mainData={data?.body}
        rowData={filteredData}
        setRowData={setFilteredData}
        tableHeaders={TABLE_HEADERS}
      />

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
export const WithdrawalsPage = connect(mapStateToProps)(_WithdrawalsPage);
