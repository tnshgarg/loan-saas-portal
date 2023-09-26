import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
  UserIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import StatisticsCard from "../../newComponents/cards/StatisticsCard";
// import  StatisticsChart  from "../../newComponents/charts/st";
import {
  // statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "../../data";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import BannerCard from "../../newComponents/cards/banner-card";
import WithdrawalsCard from "../../newComponents/cards/withdrawals-card";
import VideoCard from "../../newComponents/cards/video-card";
import DialogWrapper from "../../newComponents/DialogWrapper";

const statisticsCardsData = [
  {
    icon: UserGroupIcon,
    className: "col-span-2",
    title: "On Demand Withdrawal",
    data: [
      { label: "Total Amount", value: 45700, className: "text-black" },
      { label: "Employees", value: 567, className: "text-black" },
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
    title: "Company Name",
    data: [
      { label: "Completed Onboarding", value: 11345, className: "text-black" },
      { label: "Pending KYC", value: 5678, className: "text-black" },
    ],
    footer: {
      color: "text-green-500",
      value: "45",
      label: "KYC Done:",
    },
  },
];

export function Home() {
  return (
    <div className="mt-4">
      <div className="mb-6 grid gap-y-10 gap-x-6">
        <BannerCard />
      </div>
      <DialogWrapper />
      <div className="mb-6 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-6">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-gray",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}

        {/* <VideoCard /> */}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-6">
        {/* <WithdrawalsCard /> */}
        <Card className="overflow-hidden shadow-none xl:col-span-2">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6 flex flex-col"
          >
            <div className="flex flex-row w-full jusitfy-between items-center pt-0">
              <Typography className="mb-4 text-md">
                Recent Withdrawals
              </Typography>
            </div>
            {[1, 2, 3, 4].map((item, index) => (
              <ListItem className="bg-lightgray_01 mt-2">
                <ListItemPrefix>
                  <Avatar
                    size="sm"
                    variant="circular"
                    alt="candice"
                    src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                  />
                </ListItemPrefix>
                <div>
                  <Typography className="mb-1 text-md text-black font-medium">
                    Tania Andrew
                  </Typography>
                  <Typography className="text-xs text-gray">
                    14 Jan,2023
                  </Typography>
                </div>
                <ListItemSuffix>
                  <Typography className="mb-1 text-md text-black font-bold">
                    5000
                  </Typography>
                </ListItemSuffix>
              </ListItem>
            ))}
          </CardHeader>
        </Card>
        <Card className="overflow-hidden shadow-none xl:col-span-2">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Repayment Summary
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            {/* <List>
              <ListItem>Inbox</ListItem>
              <ListItem>Trash</ListItem>
              <ListItem>Settings</ListItem>
            </List> */}
          </CardBody>
        </Card>
      </div>

      {/* <div className="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div> */}
    </div>
  );
}

export default Home;
