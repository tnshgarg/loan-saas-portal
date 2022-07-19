import AppNavigation from "./navbar";
import { AppSidebar } from "./sidebar";

import { THEME } from "../theme/base";
import { useLocation } from "react-router-dom";

const { sidebar, navbar } = THEME;
const NON_LAYOUT_ROUTES = [
  "/",
  "/sign-up",
  "/confirm-sign-up",
  "/login",
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
  return (
    <div style={{ position: "relative" }}>
      <AppSidebar />
      <AppNavigation sidebarWidth={sidebar.width} />
      <div
        style={{
          paddingLeft: sidebar.width,
          paddingTop: navbar.height,
          paddingBottom: "5em",
          maxHeight: `98vh`,
          overflow: "scroll",
        }}
      >
        <div style={{}}>{props.children}</div>
      </div>
    </div>
  );
}
