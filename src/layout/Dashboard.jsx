import { Routes, Route } from "react-router-dom";
// import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import routes from "../routes";
import { useMaterialTailwindController } from "../contexts/SidebarContext";
import Sidenav from "./Sidenav";
import NAV_MENU from "./navigation";
import DashboardNavbar from "./DashboardNavbar";
import Home from "../pages/dashboard/Home";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <Sidenav routes={routes} brandImg={"/img/logo.png"} />
      <div className="p-8 xl:ml-80 bg-[#f2f2f2]">
        <DashboardNavbar />

        <Routes>
          {routes.map(({ title, children, parentRoute, parentElement }) =>
            !children ? (
              <Route exact path={`${parentRoute}`} element={parentElement} />
            ) : (
              children.map(({ path, element, route }) => (
                <Route
                  exact
                  path={`${parentRoute}${route}`}
                  element={element}
                />
              ))
            )
          )}
        </Routes>

        {/* <Routes>
          <Route exact path={`/`} element={<Home />} />
        </Routes> */}
        {/* <Home /> */}
        <div className="text-blue-gray-600">{/* <Footer /> */}</div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
