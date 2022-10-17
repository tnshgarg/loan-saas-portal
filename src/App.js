import Amplify from "aws-amplify";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

import { EmployeesPanel } from "./components/dashboard/employee/EmployeesPanel";

import { history } from "./utils/history";
import BaseLayout from "./layout/base";
import { Onboard } from "./components/dashboard/employee/onboarding/Onboard";
import { AttendanceUpload } from "./components/dashboard/attendance/attendanceUpload";
import { SalaryUpload } from "./components/dashboard/payroll/salaryManagement/SalaryUpload";
import { PayrollInfo } from "./components/dashboard/payroll/info/PayrollInfo";
import { OneClickPayments } from "./components/dashboard/payroll/oneClickPayments/PaymentUpload";
import { Disbursements } from "./components/dashboard/ewa/details";

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
            <Route path="/attendance/import" element={<AttendanceUpload />} />
            <Route
              path="/payroll/one-click-payout"
              element={<OneClickPayments />}
            />
            <Route path="/payroll/salary" element={<SalaryUpload />} />
            <Route path="/payroll/info" element={<PayrollInfo />} />
            <Route path="/payroll/transactions" element={<PayrollInfo />} />

            <Route path="/ewa/info" element={<Disbursements />} />

            <Route path="*" element={<Invalid />} />
          </Routes>
        </BaseLayout>
      </Router>
    </div>
  );
};

export default App;
