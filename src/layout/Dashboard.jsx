import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { useMaterialTailwindController } from "../contexts/SidebarContext";
import LoadingIndicator from "../newComponents/LoadingIndicator";
import routes from "../routes";
import DashboardNavbar from "./DashboardNavbar";
import Sidenav from "./Sidenav";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const auth = useSelector((state) => state.auth);
  const allSlices = useSelector((state) => state);

  const ignoredKeywords = ["upload", "polling"];

  // const isSomeApiPending = Object.values(allSlices).some((slice) => {
  //   const isSlicePending =
  //     slice?.queries &&
  //     Object.values(slice.queries).some((query) => {
  //       // Check if the query status is pending and doesn't contain ignored keywords
  //       return query?.status === "pending";
  //     });

  //   return isSlicePending;
  // });

  // console.log("isSomeApiPending", isSomeApiPending);

  if (Object.keys(auth).length === 0 || !auth.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-[#F8F6F7]">
      <Sidenav routes={routes} brandImg="/img/logo.png" />
      <div className="p-8 xl:ml-80">
        <DashboardNavbar />

        {false ? (
          <LoadingIndicator />
        ) : (
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
        )}

        <div className="text-blue-gray-600">{/* <Footer /> */}</div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
