import { Routes, Route } from "react-router-dom";
// import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import routes from "../routes";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
} from "../contexts/SidebarContext";
import Sidenav from "./Sidenav";
import NAV_MENU from "./navigation";
import DashboardNavbar from "./DashboardNavbar";
import Home from "../pages/dashboard/home";
import Configurator from "./configurator";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <Sidenav routes={routes} brandImg={"/img/logo.png"} />
      <div className="p-8 xl:ml-80 bg-[#f2f2f2]">
        <DashboardNavbar />
        <Configurator />
        {/* <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton> */}

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
          <Route exact path={`/home`} element={<Home />} />
        </Routes> */}
        {/* <Home /> */}
        <div className="text-blue-gray-600">{/* <Footer /> */}</div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
