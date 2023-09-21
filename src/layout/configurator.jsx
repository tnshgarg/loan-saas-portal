import React from "react";
import { XMarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Switch,
  Typography,
  Chip,
  Avatar,
  Tabs,
  TabsHeader,
  Tab,
  TabPanel,
  TabsBody,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavColor,
  setSidenavType,
  setFixedNavbar,
} from "../contexts/SidebarContext";

function formatNumber(number, decPlaces) {
  decPlaces = Math.pow(10, decPlaces);

  const abbrev = ["K", "M", "B", "T"];

  for (let i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3);

    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;

      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      number += abbrev[i];

      break;
    }
  }

  return number;
}

export function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator, sidenavColor, sidenavType, fixedNavbar } =
    controller;
  const [stars, setStars] = React.useState(0);

  const sidenavColors = {
    blue: "from-blue-400 to-blue-600",
    "blue-gray": "from-blue-gray-800 to-blue-gray-900",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
  };

  React.useEffect(() => {
    const stars = fetch(
      "https://api.github.com/repos/creativetimofficial/material-tailwind-dashboard-react"
    )
      .then((response) => response.json())
      .then((data) => setStars(formatNumber(data.stargazers_count, 1)));
  }, []);

  const [activeTab, setActiveTab] = React.useState("html");
  const data = [
    {
      label: "Profile",
      value: "html",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Employment",
      value: "react",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Govt. Id",
      value: "vue",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "EPFO",
      value: "angular",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "ESIC",
      value: "svelte",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "Family",
      value: "svelte",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "Address",
      value: "svelte",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-[44rem] bg-white shadow-lg transition-transform duration-300 backdrop-opacity-50 ${
        openConfigurator ? "translate-x-0" : "translate-x-[44rem]"
      }`}
    >
      <div className="flex flex-row items-start justify-between p-4 m-2 bg-gradient-to-r from-[#ebf9d9] to-[#f5fdc8] mt-4 rounded-md">
        <Avatar
          src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png"
          alt="avatar"
          size="xxl"
        />
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full items-start justify-between">
            <div className="flex flex-col ml-4">
              <Typography>Guest User!</Typography>
              <Typography>Guest User!</Typography>
            </div>

            <IconButton
              variant="text"
              color="blue-gray"
              onClick={() => setOpenConfigurator(dispatch, false)}
            >
              <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
            </IconButton>
          </div>
        </div>
      </div>
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-b border-t border-blue-gray-50 bg-transparent p-0 mt-4"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-[#016bff] shadow-none rounded-none",
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={`text-xs py-2 ${
                activeTab === value ? `text-[#016bff]` : `text-gray`
              }`}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value} className="p-8">
              <div className="flex flex-row w-full items-center justify-between">
                <Typography className="text-sm text-gray">
                  Profile Details
                </Typography>
                <Button size="md" className="bg-[#016bff] m-0 rounded-md">
                  {/* <PencilIcon /> */}
                  Edit Details
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                  <div>
                    <Typography className="text-xs text-gray mt-8">
                      Field
                    </Typography>
                    <Typography className="text-md text-black font-bold">
                      Value
                    </Typography>
                  </div>
                ))}
              </div>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </aside>
  );
}

Configurator.displayName = "/src/widgets/layout/configurator.jsx";

export default Configurator;
