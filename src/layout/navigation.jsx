import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faBuildingColumns,
  faCalendarDays,
  faChartLine,
  faMoneyBillWave,
  faMoneyBill1Wave,
  faMoneyCheck,
  faUsers,
  faListCheck,
  faFileArrowUp,
  faCalculator,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { THEME } from "../theme/base";

const {
  sidebar: { iconSize, iconPadding },
} = THEME;

function SidebarIcon(props) {
  const { icon } = props;
  return (
    <FontAwesomeIcon
      icon={icon}
      style={{ fontSize: iconSize, padding: iconPadding }}
    />
  );
}

function MenuIcon(props) {
  const { icon } = props;
  return (
    <FontAwesomeIcon
      icon={icon}
      style={{ fontSize: iconSize, padding: iconPadding }}
    />
  );
}

const NAV_MENU = [
  {
    name: "Employer",
    icon: <SidebarIcon icon={faBuildingColumns} />,
    route: "/employer",
    children: [
      {
        name: "Overview",
        icon: <MenuIcon icon={faChartLine} />,
        route: "/overview",
      },
      {
        name: "Registration",
        icon: <MenuIcon icon={faListCheck} />,
        route: "/register-form",
      },
    ],
  },
  {
    name: "Employees",
    icon: <SidebarIcon icon={faUsers} />,
    route: "/employees",
    children: [
      {
        name: "Onboard",
        icon: <MenuIcon icon={faFileArrowUp} />,
        route: "/onboard",
      },
      {
        name: "Panel",
        icon: <MenuIcon icon={faAddressBook} />,
        route: "/panel",
      },
    ],
  },
  {
    name: "Payroll",
    icon: <SidebarIcon icon={faMoneyBillWave} />,
    route: "/payroll",
    children: [
      {
        name: "One Click Payout",
        icon: <MenuIcon icon={faMoneyBill1Wave} />,
        route: "/one-click-payout",
      },
      {
        name: "Payout Details",
        icon: <MenuIcon icon={faMoneyCheck} />,
        route: "/info",
      },
    ],
  },
  {
    name: "Attendance",
    icon: <SidebarIcon icon={faCalendarDays} />,
    route: "/attendance",
    children: [
      {
        name: "Data Import",
        icon: <MenuIcon icon={faFileArrowUp} />,
        route: "/import",
      },
    ],
  },
  {
    name: "Calculator",
    icon: <SidebarIcon icon={faCalculator} />,
    route: "/calculator",
    children: [
      {
        name: "Salary",
        icon: <MenuIcon icon={faMoneyBill} />,
        route: "/salary",
      },
    ],
  },
];

function setCompleteRoute(items = NAV_MENU, path = "") {
  items.forEach((item) => {
    item.fullRoute = path + item.route;
    if (item.children) setCompleteRoute(item.children, item.fullRoute);
  });
}

function makeBreadCrumbs(items = NAV_MENU, previousCrumbs = []) {
  let breadCrumbs = {};
  items.forEach((item) => {
    const crumbs = previousCrumbs.concat([item]);
    breadCrumbs[item.fullRoute] = crumbs;
    if (item.children)
      breadCrumbs = Object.assign(
        breadCrumbs,
        makeBreadCrumbs(item.children, crumbs)
      );
  });
  return breadCrumbs;
}

setCompleteRoute();

export const BREAD_CRUMBS = makeBreadCrumbs();
export default NAV_MENU;
