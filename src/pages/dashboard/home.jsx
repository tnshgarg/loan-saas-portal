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
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
  UserIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import StatisticsCard from "../../widgets/cards/statistics-card";
// import  StatisticsChart  from "../../widgets/charts/st";
import {
  // statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "../../data";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import BannerCard from "../../widgets/cards/banner-card";
import WithdrawalsCard from "../../widgets/cards/withdrawals-card";
import VideoCard from "../../widgets/cards/video-card";

const statisticsCardsData = [
  {
    icon: UserGroupIcon,
    span: 2,
    title: "On Demand Withdrawal",
    data: [
      { label: "Total Amount", value: 45700, color: "black" },
      { label: "Employees", value: 567, color: "black" },
    ],
    footer: {
      color: "text-green-500",
      value: "345",
      label: "Active Employees:",
    },
  },
  {
    icon: UserIcon,
    span: 2,
    title: "Company Name",
    data: [
      { label: "Completed Onboarding", value: 11345, color: "black" },
      { label: "Pending KYC", value: 5678, color: "black" },
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
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Recent Withdrawals
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <>
                  {/* <Typography variant="h6" color="blue-gray" className="mb-1">
                    View All
                  </Typography> */}
                  <IconButton size="sm" variant="text" color="blue-gray">
                    <ChevronRightIcon
                      strokeWidth={3}
                      fill="currenColor"
                      className="h-6 w-6"
                    />
                  </IconButton>
                </>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          {/* <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <List>
              <ListItem>
                <ListItemPrefix>
                  <Avatar
                    variant="circular"
                    alt="candice"
                    src="/img/face-1.jpg"
                  />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Tania Andrew
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    Software Engineer @ Material Tailwind
                  </Typography>
                </div>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <Avatar
                    variant="circular"
                    alt="alexander"
                    src="/img/face-2.jpg"
                  />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Alexander
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    Backend Developer @ Material Tailwind
                  </Typography>
                </div>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <Avatar variant="circular" alt="emma" src="/img/face-3.jpg" />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Emma Willever
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    UI/UX Designer @ Material Tailwind
                  </Typography>
                </div>
              </ListItem>
            </List>
          </CardBody> */}
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
