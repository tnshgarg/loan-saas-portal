import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "On Demand Withdrawal",
    value: "₹4,57,000",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "pink",
    icon: UserIcon,
    title: "Today's Users",
    value: "2,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  // {
  //   color: "green",
  //   icon: UserPlusIcon,
  //   title: "New Clients",
  //   value: "3,462",
  //   footer: {
  //     color: "text-red-500",
  //     value: "-2%",
  //     label: "than yesterday",
  //   },
  // },
];

export default statisticsCardsData;
