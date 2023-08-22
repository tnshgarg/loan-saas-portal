import { Amplify } from "aws-amplify";
import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Overview from "./components/dashboard/overview/Overview";
import RegisterForm from "./components/dashboard/registerForm/RegisterForm";

import { Invalid } from "./components/invalid";

import {
  ConfirmResetPassword,
  ConfirmSignUp,
  Login,
  ResetPassword,
  SignUp,
} from "./components/signUpLogin/index";

import { EmployeesPanel } from "./components/dashboard/employee/panel/EmployeesPanel";

import { AttendanceDataUploadPanel } from "./components/dashboard/attendance/dataUpload/attendanceDataUploadPanel";
import { EmployeesBulkUpdatesPanel } from "./components/dashboard/employee/bulkUpdates/bulkUpdatesPanel";
import { Onboard } from "./components/dashboard/employee/onboarding/Onboard";
import { Disbursements } from "./components/dashboard/ewa/details";
import { EmployeeSalaryPayments } from "./components/dashboard/payouts/employeeSalary/salaryPaymentUpload";
import { PayrollInfo } from "./components/dashboard/payouts/info/PayrollInfo";
import { OneClickPayouts } from "./components/dashboard/payouts/oneClickPayouts/oneClickPayoutsUpload";
import { SalaryUpload } from "./components/dashboard/payouts/salaryManagement/SalaryUpload";
import { PayslipsDataUploadPanel } from "./components/dashboard/payslips/dataUpload/payslipsDataUploadPanel";
import { PayslipsPanel } from "./components/dashboard/payslips/info/payslipsPanel";
import { EmployerUnapproved } from "./components/employerUnapproved";
import BaseLayout from "./layout/base";
import { history } from "./utils/history";

const App = () => {
  useEffect(() => {
    Amplify.configure({
      Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      },
    });
  });

  return (
    <div>
      <Router history={history}>
        <BaseLayout>
          <br />
          <br />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/confirm-sign-up" element={<ConfirmSignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/confirm-reset-password"
              element={<ConfirmResetPassword />}
            />
            <Route path="/employer/overview" element={<Overview />} />
            <Route path="/employer/register-form" element={<RegisterForm />} />
            <Route path="/employees/onboard" element={<Onboard />} />
            <Route path="/employees/panel" element={<EmployeesPanel />} />
            <Route
              path="/employees/bulk-updates"
              element={<EmployeesBulkUpdatesPanel />}
            />
            <Route
              path="/payroll/one-click-payout"
              element={<OneClickPayouts />}
            />
            <Route
              path="/payroll/employee-salary"
              element={<EmployeeSalaryPayments />}
            />
            <Route path="/payroll/salary" element={<SalaryUpload />} />
            <Route path="/payroll/info" element={<PayrollInfo />} />
            <Route path="/payroll/transactions" element={<PayrollInfo />} />

            <Route
              path="/payslips/data-upload"
              element={<PayslipsDataUploadPanel />}
            />
            <Route path="/payslips/info" element={<PayslipsPanel />} />

            <Route path="/ewa/info" element={<Disbursements />} />

            <Route
              path="/attendance/data-upload"
              element={<AttendanceDataUploadPanel />}
            />

            <Route path="/unapproved" element={<EmployerUnapproved />} />
            <Route path="*" element={<Invalid />} />
          </Routes>
        </BaseLayout>
      </Router>
    </div>
  );
};

export default App;
