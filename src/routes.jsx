// import {
//   HomeIcon,
//   UserCircleIcon,
//   TableCellsIcon,
//   BellIcon,
//   ArrowRightOnRectangleIcon,
//   UserPlusIcon,
// } from "@heroicons/react/24/solid";
// import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
// import { SignIn, SignUp } from "@/pages/auth";

// const icon = {
//   className: "w-5 h-5 text-inherit",
// };

// export const routes = [
//   {
//     layout: "dashboard",
//     pages: [
//       {
//         icon: <HomeIcon {...icon} />,
//         name: "Home",
//         path: "/home",
//         element: <Home />,
//       },
//       {
//         icon: <UserCircleIcon {...icon} />,
//         name: "profile",
//         path: "/profile",
//         element: <Profile />,
//       },
//       {
//         icon: <TableCellsIcon {...icon} />,
//         name: "tables",
//         path: "/tables",
//         element: <Tables />,
//       },
//       {
//         icon: <BellIcon {...icon} />,
//         name: "notifactions",
//         path: "/notifactions",
//         element: <Notifications />,
//       },
//     ],
//   },
//   {
//     title: "auth pages",
//     layout: "auth",
//     pages: [
//       {
//         icon: <ArrowRightOnRectangleIcon {...icon} />,
//         name: "sign in",
//         path: "/sign-in",
//         element: <SignIn />,
//       },
//       {
//         icon: <UserPlusIcon {...icon} />,
//         name: "sign up",
//         path: "/sign-up",
//         element: <SignUp />,
//       },
//     ],
//   },
// ];

// export default routes;

import Overview from "./components/dashboard/overview/Overview";
import Home from "./pages/dashboard/Home";
import RegisterForm from "./components/dashboard/registerForm/RegisterForm";
import {
  BuildingOfficeIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
  StarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { EmployeesPanel } from "./components/dashboard/employee/panel/EmployeesPanel";
import { EmployeesBulkUpdatesPanel } from "./components/dashboard/employee/bulkUpdates/bulkUpdatesPanel";
import { Onboard } from "./components/dashboard/employee/onboarding/Onboard";
import { AttendancePanel } from "./components/dashboard/attendance/info/attendancePanel";
import { PayrollInfo } from "./components/dashboard/payouts/info/PayrollInfo";
import { Disbursements } from "./components/dashboard/ewa/details";
import { PayslipsPanel } from "./components/dashboard/payslips/info/payslipsPanel";

const icon = {
  className: "w-6 h-6 text-inherit color-gray",
};

export const routes = [
  {
    title: "Home",
    icon: <ClipboardDocumentListIcon {...icon} />,
    parentRoute: "/employer",
    parentElement: <Home />,
    // children: [
    //   {
    //     name: "Overview",

    //     route: "/overview",
    //     element: <Home />,
    //   },
    //   {
    //     name: "Registration",

    //     route: "/register-form",
    //     element: <RegisterForm />,
    //   },
    // ],
  },
  {
    title: "Employees",
    icon: <BuildingOfficeIcon {...icon} />,
    parentRoute: "/employees",
    // parentElement: <EmployeesPanel />,
    children: [
      {
        name: "All Employees",

        route: "/panel",
        element: <EmployeesPanel />,
      },
      {
        name: "Attendance",

        route: "/attendance",
        element: <AttendancePanel />,
      },
      {
        name: "Salary Slip",

        route: "/payslip",
        element: <PayslipsPanel />,
      },
      // {
      //   name: "All Employees",

      //   route: "/onboard",
      //   element: <Onboard />,
      // },
      // {
      //   name: "Panel",

      //   route: "/panel",
      //   element: <EmployeesPanel />,
      // },
      // {
      //   name: "Bulk Updates",

      //   route: "/bulk-updates",
      //   element: <EmployeesBulkUpdatesPanel />,
      // },
    ],
  },
  {
    title: "On Demand Salary",
    icon: <CurrencyDollarIcon {...icon} />,
    parentRoute: "/disbursements",
    parentElement: <Disbursements />,
  },
  {
    title: "Payouts",
    icon: <UserGroupIcon {...icon} />,
    parentRoute: "/payroll",
    parentElement: <PayrollInfo />,
  },
  {
    title: "Company",
    icon: <StarIcon {...icon} />,
    parentRoute: "/company",
    parentElement: <RegisterForm />,
  },
  // {
  //   title: "Payouts",
  //   // icon: <SidebarIcon icon={faMoneyBillWave} />,
  //   parentRoute: "/payroll",
  //   children: [
  //     {
  //       name: "Employee Salary",

  //       route: "/employee-salary",
  //     },
  //     {
  //       name: "One Click Payout",

  //       route: "/one-click-payout",
  //     },
  //     {
  //       name: "Payout Processing",

  //       route: "/info",
  //     },
  //   ],
  // },
  // {
  //   title: "Payslips",
  //   // icon: <SidebarIcon icon={faFileInvoice} />,
  //   route: "/payslips",
  //   children: [
  //     {
  //       name: "Data Upload",
  //       // icon: <MenuIcon icon={faFileArrowUp} />,
  //       route: "/data-upload",
  //     },
  //     {
  //       name: "View Payslips",
  //       // icon: <MenuIcon icon={faRectangleList} />,
  //       route: "/info",
  //     },
  //   ],
  // },
  // {
  //   title: "EWA",
  //   // icon: <SidebarIcon icon={faPaperPlane} />,
  //   route: "/ewa",
  //   children: [
  //     {
  //       name: "Disbursements",
  //       // icon: <MenuIcon icon={faWallet} />,
  //       route: "/info",
  //     },
  //   ],
  // },
  // {
  //   title: "Attendance",
  //   // icon: <SidebarIcon icon={faCalendarDays} />,
  //   route: "/attendance",
  //   children: [
  //     {
  //       name: "Data Upload",
  //       // icon: <MenuIcon icon={faFileArrowUp} />,
  //       route: "/data-upload",
  //     },
  //     {
  //       name: "View Attendance Data",
  //       // icon: <MenuIcon icon={faRectangleList} />,
  //       route: "/info",
  //     },
  //   ],
  // },
  // {
  //   title: "Calculator",
  //   // icon: <SidebarIcon icon={faCalculator} />,
  //   route: "/calculator",
  //   children: [
  //     {
  //       name: "Salary",
  //       // icon: <MenuIcon icon={faMoneyBill} />,
  //       route: "/salary",
  //     },
  //   ],
  // },
];

export default routes;
