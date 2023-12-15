import React, { useState } from "react";
import SearchInput from "../../newComponents/SearchInput";
import PrimaryButton from "../../newComponents/PrimaryButton";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useGetDisbursementsQuery } from "../../store/slices/apiSlices/employer/ewaApiSlice";
import StatisticsCard from "../../newComponents/cards/StatisticsCard";
import { Typography } from "@material-tailwind/react";
import DisbursementsTable from "../../newComponents/DisbursementsTable";
import { DateDropdown } from "../../components/dashboard/payouts/info/DateDropdown";
import WithdrawalsCard from "../../newComponents/cards/withdrawals-card";
import RepaymentsTable from "../../newComponents/RepaymentsTable";
import TableLayout from "../../layout/TableLayout";
import LoadingIndicator from "../../newComponents/LoadingIndicator";

const Repayments = () => {
  const [filteredData, setFilteredData] = useState([]);
  const TABLE_HEADERS = [
    { label: "Emp ID", value: "employerEmployeeId" },
    { label: "Name", value: "employeeName" },
    { label: "EWA", value: "ewa" },
    { label: "Mobile", value: "mobile" },
    { label: "EWA Status", value: "ewaStatus" },
    { label: "Email", value: "email" },
    { label: "DOB", value: "dob" },
    { label: "Designation", value: "designation" },
    { label: "Employeer", value: "principalEmployer" },
    { label: "Emp Status", value: "active" },
    { label: "", value: "options" },
  ];

  const statisticsCardsData = [
    {
      icon: DocumentTextIcon,
      className: "col-span-2",
      title: "Repayment Summary",
      data: [
        { label: "Amount Due", value: "₹4,57,000", className: "text-black" },
        { label: "Due Employees", value: 567, className: "text-black" },
      ],
    },
    // {
    //   icon: BanknotesIcon,
    //   className: "col-span-2",
    //   title: "Offer Available",
    //   data: [
    //     {
    //       label: "Amount Available",
    //       value: "₹4,57,000",
    //       className: "text-black",
    //     },
    //     { label: "Employee Available ", value: 567, className: "text-black" },
    //   ],
    // },
  ];

  // if (isLoading || isFetching) return <LoadingIndicator />;
  return (
    <div className="mt-4">
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
              <div className="flex flex-row items-center">
                <PrimaryButton
                  title={"Pay Now"}
                  color={"primary"}
                  size={"sm"}
                  className={"w-1/3 m-0 ml-0"}
                />
                <Typography className="text-xs ml-5 text-warning">
                  Payment due in 2 days
                </Typography>
              </div>
            }
          />
        ))}
        <WithdrawalsCard title={"Repayment Summary"} className={"col-span-2"} />
      </div>

      <div className="w-full flex-row flex items-center justify-between">
        <SearchInput
          label="Search by Name, Phone, Employee ID and Email ID"
          data={filteredData}
          setData={setFilteredData}
          mainData={[]}
        />
        <PrimaryButton
          title={"Filter"}
          color="secondary"
          variant={"outlined"}
          size={"sm"}
        />
        <PrimaryButton
          title={"Download"}
          color="secondary"
          variant={"outlined"}
          size={"sm"}
          className={"ml-0"}
        />
      </div>
      {/* 
      <TableLayout
        // mainData={data?.body}
        // rowData={filteredData}
        // setRowData={setFilteredData}
        // tableHeaders={TABLE_HEADERS}
      /> */}

      <RepaymentsTable />
    </div>
  );
};

export default Repayments;
