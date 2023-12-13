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

const CommissionTracking = () => {
  const [filteredData, setFilteredData] = useState([]);

  const statisticsCardsData = [
    {
      icon: DocumentTextIcon,
      className: "col-span-2",
      title: "Commission Earned",
      data: [
        { label: "Total Earned", value: "₹4570", className: "text-black" },
        { label: "Yet to be paid  ", value: "₹567", className: "text-black" },
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
  return (
    <div className="mt-4">
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
          />
        ))}
      </div>

      <div className="w-full flex-row flex items-center justify-between">
        <div className="w-1/2 flex flex-row bg-gray">
          <PrimaryButton
            title={"Commission Earned"}
            color="secondary"
            // variant={"outlined"}
            size={"sm"}
            className={"w-full m-0 rounded-none"}
          />
          <PrimaryButton
            title={"Past Payments"}
            color="secondary"
            variant={"outlined"}
            size={"sm"}
            className={"w-full m-0 rounded-none"}
          />
        </div>

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

      <DisbursementsTable />
    </div>
  );
};

export default CommissionTracking;
