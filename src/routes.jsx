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
import { PayslipsPanel } from "./components/dashboard/payslips/info/payslipsPanel";
import Repayments from "./pages/dashboard/Repayments";
import CommissionTracking from "./pages/dashboard/CommissionTracking";
import CompanyDetails from "./pages/dashboard/CompanyDetails";
import ComingSoon from "./pages/ComingSoon";
import { PayoutsPage } from "./pages/dashboard/PayoutsPage";
import { WithdrawalsPage } from "./pages/dashboard/WithdrawalsPage";

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
