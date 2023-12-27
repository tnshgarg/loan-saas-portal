import { BanknotesIcon } from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { connect } from "react-redux";
import DateDropdown from "../../components/dashboard/payouts/info/DateDropdown.jsx";
import TableLayout from "../../layout/TableLayout.jsx";
import StatisticsCard from "../../newComponents/cards/StatisticsCard.jsx";
import { useGetAllEmployeesPanelByEmployerIdQuery } from "../../store/slices/apiSlices/employees/panelApiSlice.js";
import { useGetDisbursementsQuery } from "../../store/slices/apiSlices/employer/ewaApiSlice.js";

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
    { label: "Emp ID", value: "employeeId" },
    { label: "Name", value: "name" },
    { label: "Withdrawn", value: "loanAmount" },
    { label: "Status", value: "status" },
    { label: "Disbursement date", value: "disbursedAt" },
    { label: "Due Date", value: "dueDate" },
    { label: "UTR number", value: "utr" },
    { label: "Bank Account", value: "bankAccountNumber" },
    { label: "", value: "options" },
  ];

  const dateChanged = (updatedDate) => {
    setDate(updatedDate);
    // dataRefetch();
  };

  const key = `disbursements-info-historical-${year}-${month}`;
  const { data, isLoading, refetch, isFetching } = useGetDisbursementsQuery({
    id: employerId,
    year: 2023,
    month: 11,
  });

  const responseFromQuery =
    useGetAllEmployeesPanelByEmployerIdQuery(employerId);
  const {
    data: EmployeesData,
    isFetching: isEmployeesFetching,
    isLoading: isEmployeesLoading,
  } = responseFromQuery;

  console.log("Dis:", data?.body);
  const [filteredData, setFilteredData] = useState(data?.body);

  // const totalEwaAmount = EmployeesData?.body.reduce((total, employeeData) => {
  //   // Check if the status is "active" before adding the loan amount
  //   if (employeeData.ewaStatus === "ACTIVE") {
  //     return total + (employeeData.ewa? || 0);
  //   }

  //   return total;
  // }, 0);
  const totalLoanAmount = data?.body.reduce((total, disbursement) => {
    return total + (disbursement.loanAmount || 0);
  }, 0);

  const totalEmployeesWithWithdrawals = data?.body?.length;

  const dataRefetch = () => {
    refetch();
  };

  const statisticsCardsData = [
    {
      icon: BanknotesIcon,
      className: "col-span-2",
      title: "On Demand Withdrawal",
      data: [
        {
          label: "Total Amount",
          value: totalLoanAmount,
          className: "text-black",
        },
        {
          label: "Employees",
          value: totalEmployeesWithWithdrawals,
          className: "text-black",
        },
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
      <DateDropdown onChange={dateChanged} />

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
    </div>
  );
};
export const WithdrawalsPage = connect(mapStateToProps)(_WithdrawalsPage);
