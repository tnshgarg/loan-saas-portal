import { DocumentTextIcon } from "@heroicons/react/24/outline";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DateDropdown from "../../components/dashboard/payouts/info/DateDropdown";
import TableLayout from "../../layout/TableLayout";
import ComingSoonDialog from "../../newComponents/ComingSoonDialog";
import PrimaryButton from "../../newComponents/PrimaryButton";
import RepaymentsDialog from "../../newComponents/RepaymentsDialog";
import StatisticsCard from "../../newComponents/cards/StatisticsCard";
import WithdrawalsCard from "../../newComponents/cards/withdrawals-card";
import { useGetRepaymentsQuery } from "../../store/slices/apiSlices/employer/ewaApiSlice";

const TABLE_HEADERS = [
  { label: "Emp ID", value: "employeeId" },
  { label: "Name", value: "name" },
  { label: "Loan Amount", value: "loanAmount" },
  { label: "Status", value: "status" },
  { label: "Disbursement Date", value: "availedAt" },
  { label: "Due Date", value: "dueDate" },
  { label: "Pending Amount", value: "pendingAmount" },
  { label: "Repaid Amount", value: "paidAmount" },
  { label: "Repayment Date", value: "repaymentDate" },
];

const Repayments = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [comingSoonModal, setComingSoonModal] = useState(false);
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [{ year, month }, setDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });
  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

  const { data } = useGetRepaymentsQuery({
    id: employerId,
    year: year,
    month: month,
  });

  console.log("Repayments:", data?.body);

  const dueEmployees = data?.body.filter(
    (repayment) => repayment.status === "PENDING"
  );
  const dueEmployeesCount = dueEmployees?.length;

  const amountDue = data?.body.reduce((totalDue, repayment) => {
    if (repayment.status === "PENDING") {
      return totalDue + repayment.pendingAmount;
    }
    return totalDue;
  }, 0);

  const repaymentDueDays = (() => {
    const currentDate = new Date();
    let minDaysLeft = Infinity;

    if (data?.body.length == 0) return `No Data Present`;

    data?.body.forEach((item) => {
      const repaymentDate = new Date(item.dueDate);
      const diffInMs = repaymentDate - currentDate;
      const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

      if (diffInDays < minDaysLeft) {
        minDaysLeft = diffInDays;
      }
    });

    if (minDaysLeft < 0) return `Payment Overdue`;

    return `Payment Due in ${minDaysLeft} days`;
  })();

  const statisticsCardsData = [
    {
      icon: DocumentTextIcon,
      className: "col-span-2",
      title: "Repayment Summary",
      data: [
        {
          label: "Amount Due",
          value: amountDue,
          className: "text-black",
          repaymentDays: repaymentDueDays,
        },
        {
          label: "Due Employees",
          value: dueEmployeesCount,
          className: "text-black",
        },
      ],
    },
  ];

  const dateChanged = (updatedDate) => {
    setDate(updatedDate);
  };

  const handleComingSoonModal = () => setComingSoonModal(true);

  return (
    <div className="mt-4">
      <DateDropdown onChange={dateChanged} />
      <div className="mb-6 mt-4 grid gap-y-10 gap-x-4 md:grid-cols-3 xl:grid-cols-5">
        {statisticsCardsData.map(
          ({ icon, title, footer, span, data, ...rest }) => (
            <StatisticsCard
              span={span}
              key={title}
              {...rest}
              data={data}
              title={title}
              icon={React.createElement(icon, {
                className: "w-6 h-6 text-gray",
              })}
              footer={
                <div className="flex flex-row items-center">
                  <PrimaryButton
                    title={"Pay Now"}
                    col
                    size={"sm"}
                    className={"w-1/3 m-0 ml-0 bg-black"}
                    onClick={handleComingSoonModal}
                  />
                  <Typography className="text-xs ml-5 text-warning">
                    {data[0].repaymentDays}
                  </Typography>
                </div>
              }
            />
          )
        )}
        {data?.body.length > 0 && (
          <WithdrawalsCard
            title={"Repayment Summary"}
            className={"col-span-2"}
            data={data?.body}
            payNowAction={handleComingSoonModal}
          />
        )}
      </div>

      <TableLayout
        mainData={data?.body}
        rowData={filteredData || []}
        setRowData={setFilteredData}
        tableHeaders={TABLE_HEADERS}
        renderActionItems={(item, index) => (
          <Menu>
            <MenuHandler>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </MenuHandler>
            <MenuList>
              <MenuItem
                onClick={() => {
                  setActiveIndex(index);
                  setOpen(true);
                }}
              >
                View Payments
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      />

      <RepaymentsDialog
        open={open}
        setOpen={setOpen}
        repaymentsData={data?.body[activeIndex]?.breakdown}
      />

      <ComingSoonDialog open={comingSoonModal} setOpen={setComingSoonModal} />
    </div>
  );
};

export default Repayments;
