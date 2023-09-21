import AppNavigation from "./navbar";
import Sidenav, { AppSidebar } from "./sidebar";

import { THEME } from "../theme/base";
import { Route, Routes, useLocation } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";
import NAV_MENU from "./navigation";

const { sidebar, navbar } = THEME;
const NON_LAYOUT_ROUTES = [
  "/",
  "/sign-up",
  "/confirm-sign-up",
  "auth/login",
  "/reset-password",
  "/confirm-reset-password",
];
export default function BaseLayout(props) {
  const location = useLocation();
  console.log(location.pathname, {
    maxHeight: `calc(100vh - ${navbar.height})`,
  });
  if (NON_LAYOUT_ROUTES.includes(location.pathname))
    return <>{props.children}</>;
  // return (
  //   <div style={{ position: "relative" }}>
  //     <AppSidebar />
  //     <AppNavigation sidebarWidth={sidebar.width} />
  //     <div
  //       style={{
  //         paddingLeft: sidebar.width,
  //         paddingTop: navbar.height,
  //         maxHeight: `calc(100vh)`,
  //         overflowY: "auto",
  //         overflowX: "hidden",
  //       }}
  //     >
  //       <div style={{}}>{props.children}</div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={NAV_MENU}
        // brandImg={
        //   sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        // }
      />
      <div className="p-4 xl:ml-80">
        {/* <DashboardNavbar /> */}
        {/* <Configurator /> */}
        {/* <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton> */}
        {/* <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div> */}
      </div>
    </div>
  );
}
