import { BanknotesIcon } from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
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

const _WithdrawalsPage = ({ employerId, dispatch }) => {
  const today = new Date();
  const [{ year, month }, setDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });
  const [filteredData, setFilteredData] = useState([]);

  const TABLE_HEADERS = [
    { label: "Emp ID", value: "employeeId", sortable: true },
    { label: "Name", value: "name" },
    { label: "Withdrawn", value: "loanAmount" },
    { label: "Status", value: "status" },
    { label: "Disbursement date", value: "disbursedAt" },
    { label: "Due Date", value: "dueDate" },
    { label: "UTR number", value: "utr" },
    { label: "Bank Account", value: "bankAccountNumber" },
  ];

  const dateChanged = (updatedDate) => {
    setDate(updatedDate);
  };

  const key = `disbursements-info-historical-${year}-${month}`;
  const { data } = useGetDisbursementsQuery({
    id: employerId,
    year: year,
    month: month,
  });

  const responseFromQuery =
    useGetAllEmployeesPanelByEmployerIdQuery(employerId);
  const {
    data: EmployeesData,
    isFetching: isEmployeesFetching,
    isLoading: isEmployeesLoading,
  } = responseFromQuery;

  console.log("Dis:", data?.body);
  console.log("Employees Data:", EmployeesData?.body);

  useEffect(() => {
    if (data?.body) {
      setFilteredData(data?.body);
    }
  }, [data]);

  const { totalEwaAmount, activeEmployeesCount } = (
    EmployeesData?.body || []
  ).reduce(
    (result, employeeData) => {
      if (employeeData.ewaStatus === "ACTIVE") {
        result.totalEwaAmount += employeeData.ewa ?? 0;
        result.activeEmployeesCount += 1;
      }

      return result;
    },
    { totalEwaAmount: 0, activeEmployeesCount: 0 }
  );
  const totalLoanAmount = (data?.body || []).reduce((total, disbursement) => {
    return total + (disbursement.loanAmount || 0);
  }, 0);

  const totalEmployeesWithWithdrawals = data?.body?.length;

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
          value: totalEwaAmount,
          className: "text-black",
        },
        {
          label: "Employee Available ",
          value: activeEmployeesCount,
          className: "text-black",
        },
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
        mainData={data?.body || []}
        rowData={filteredData}
        setRowData={setFilteredData}
        tableHeaders={TABLE_HEADERS}
      />
    </div>
  );
};
export const WithdrawalsPage = connect(mapStateToProps)(_WithdrawalsPage);
