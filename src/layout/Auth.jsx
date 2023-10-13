import { Routes, Route } from "react-router-dom";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Login } from "../components/signUpLogin/Login";
import { Navbar } from "@material-tailwind/react";
import AuthNavbar from "./AuthNavbar";
import { SignUp } from "../components/signUpLogin/SignUp";
import { ResetPassword } from "../components/signUpLogin/ResetPassword";
import { ConfirmResetPassword } from "../components/signUpLogin/ConfirmResetPassword";

export function Auth() {
  const navbarRoutes = [
    {
      name: "sign up",
      path: "/sign-up",

      element: <SignUp />,
    },
    {
      name: "sign in",
      path: "/login",
      element: <Login />,
    },
    {
      name: "reset password",
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      name: "confirm reset password",
      path: "/confirm-reset-password",
      element: <ConfirmResetPassword />,
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#071437] via-[#041144] to-[#010d4f] px-36 py-8">
      <Routes>
        {navbarRoutes.map(({ path, element }) => (
          <Route exact path={path} element={element} />
        ))}
      </Routes>
      <div className="container absolute bottom-8 left-2/4 z-10 mx-auto -translate-x-2/4 text-white bg-white">
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default Auth;
