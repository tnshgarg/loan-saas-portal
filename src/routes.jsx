import {
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import ComingSoon from "./pages/ComingSoon";
import AttendancePanel from "./pages/dashboard/AttendancePanel";
import CompanyDetails from "./pages/dashboard/CompanyDetails";
import { EmployeesPanel } from "./pages/dashboard/EmployeesPanel";
import { PayoutsPage } from "./pages/dashboard/PayoutsPage";
import PayslipsPanel from "./pages/dashboard/PayslipsPanel";
import Repayments from "./pages/dashboard/Repayments";
import { WithdrawalsPage } from "./pages/dashboard/WithdrawalsPage";
import Home from "./pages/dashboard/home";

const icon = {
  className: "w-6 h-6 text-inherit text-gray",
};

// Group related sections with comments
export const routes = [
  // Dashboard Routes
  {
    title: "Home",
    icon: <ClipboardDocumentListIcon {...icon} />,
    parentRoute: "/employer",
    parentElement: <Home />,
  },
  // Employees Routes
  {
    title: "Employees",
    icon: <BuildingOfficeIcon {...icon} />,
    parentRoute: "/employees",
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
    ],
  },
  // On Demand Salary Routes
  {
    title: "On Demand Salary",
    icon: <CurrencyDollarIcon {...icon} />,
    parentRoute: "/on-demand-salary",
    children: [
      {
        name: "Withdrawals",
        route: "/withdrawals",
        element: <WithdrawalsPage />,
      },
      {
        name: "Repayment",
        route: "/repayment",
        element: <Repayments />,
      },
      {
        name: "Commission Tracking",
        route: "/commission-tracking",
        element: <ComingSoon />,
      },
    ],
  },
  // Payouts Route
  {
    title: "Payouts",
    icon: <UserGroupIcon {...icon} />,
    parentRoute: "/payouts",
    parentElement: <PayoutsPage />,
  },
  // Company Route
  {
    title: "Company",
    icon: <StarIcon {...icon} />,
    parentRoute: "/company",
    parentElement: <CompanyDetails />,
  },
];

export default routes;
