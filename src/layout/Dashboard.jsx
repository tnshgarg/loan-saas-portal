import { Routes, Route, Navigate } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";
import routes from "../routes";
import { useMaterialTailwindController } from "../contexts/SidebarContext";
import Sidenav from "./Sidenav";
import NAV_MENU from "./navigation";
import DashboardNavbar from "./DashboardNavbar";
import Home from "../pages/dashboard/Home";
import { useSelector } from "react-redux";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const auth = useSelector((state) => state.auth);

  if (Object.keys(auth).length === 0 || !auth.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-[#F8F6F7]">
      <Sidenav routes={routes} brandImg="/img/logo.png" />
      <div className="p-8 xl:ml-80">
        <DashboardNavbar />

        <Routes>
          {routes.map(({ title, children, parentRoute, parentElement }) =>
            !children ? (
              <Route
                key={parentRoute}
                exact
                path={parentRoute}
                element={parentElement}
              />
            ) : (
              children.map(({ path, element, route }) => (
                <Route
                  key={`${parentRoute}${route}`}
                  exact
                  path={`${parentRoute}${route}`}
                  element={element}
                />
              ))
            )
          )}
        </Routes>

        <div className="text-blue-gray-600">{/* <Footer /> */}</div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
