import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave, faMoneyBill1Wave, faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { THEME } from "../theme/base";


const { sidebar: { iconSize } } = THEME;

function SidebarIcon(props) {
  const { icon } = props;
  return <FontAwesomeIcon icon={icon} style={{ fontSize: iconSize }} />;
}

function MenuIcon(props) {
  const { icon } = props;
  return <FontAwesomeIcon icon={icon} style={{ fontSize: "1.2em" }} />;
}

const NAV_MENU = [
  {
    name: "Employer",
    icon: "person",
    route: "/user",
    children: [
      {
        name: "Profile",
        icon: "id-number",
        route: "/profile"
      },
      {
        name: "Registration",
        icon: "form",
        route: "/register-form"
      }
    ]

  }, {
    name: "Employees",
    icon: "people",
    route: "/employees",
    children: [
      {
        name: "Onboard",
        icon: "new-person",
        route: "/onboard"
      }, {
        name: "Dashboard",
        icon: "office",
        route: "/dashboard"
      }, {
        name: "Data Import",
        icon: "cloud-upload",
        route: "/import"
      }
    ]
  }, {
    name: "Payroll",
    icon: <SidebarIcon icon={faMoneyBillWave} />,
    route: "/payroll",
    children: [
      {
        name: "One Click Payout",
        icon: <MenuIcon icon={faMoneyBill1Wave} />,
        route: "/payout"
      },
      {
        name: "Payout Details",
        icon: <MenuIcon icon={faMoneyCheck} />,
        route: "/info"
      }
    ]
  }, {
    name: "Attendance",
    icon: "timeline-events",
    route: "/attendance",
    children: [
      {
        name: "Data Import",
        icon: "cloud-upload",
        route: "/import"
      }
    ]
  }, {
    name: "Calculator",
    icon: "calculator",
    route: "/calculator",
    children: [
      {
        name: "Salary",
        icon: "cloud-upload",
        route: "/salary"
      }
    ]
  }
];

function setCompleteRoute(items = NAV_MENU, path = "") {
  items.forEach((item) => {
    item.fullRoute = path + item.route;
    if (item.children)
      setCompleteRoute(item.children, item.fullRoute);
  });
}

function makeBreadCrumbs(items = NAV_MENU, previousCrumbs = []) {
  let breadCrumbs = {};
  items.forEach((item) => {
    const crumbs = previousCrumbs.concat([item]);
    breadCrumbs[item.fullRoute] = crumbs;
    if (item.children)
      breadCrumbs = Object.assign(breadCrumbs, makeBreadCrumbs(item.children, crumbs));
  });
  return breadCrumbs;
}

setCompleteRoute();

export const BREAD_CRUMBS = makeBreadCrumbs();
export default NAV_MENU;