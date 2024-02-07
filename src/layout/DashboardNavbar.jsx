import {
  BellIcon,
  UserCircleIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import {
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setOpenSidenav,
  useMaterialTailwindController,
} from "../contexts/SidebarContext";
import { useGetAllEmployeesPanelByEmployerIdQuery } from "../store/slices/apiSlices/employees/panelApiSlice";
import { logout } from "../store/slices/authSlice";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const employerId =
    useSelector((state) => state.auth.user?.attributes.sub) ?? "";

  const { data: EmployeesData } =
    useGetAllEmployeesPanelByEmployerIdQuery(employerId);

  const { totalEwaAmount } = (EmployeesData?.body || []).reduce(
    (result, employeeData) => {
      if (employeeData.ewaStatus === "ACTIVE") {
        result.totalEwaAmount += employeeData.ewa ?? 0;
      }

      return result;
    },
    { totalEwaAmount: 0 }
  );

  const menuOptions = [
    {
      title: "My Account",
      icon: <UserCircleIcon className="h-4 w-4" />,
      href: "/dashboard/company",
    },
    {
      title: "Change Password",
      icon: <EllipsisHorizontalIcon className="h-4 w-4" />,
      href: "/dashboard/company",
    },
    {
      title: "Logout",
      icon: <ArrowRightOnRectangleIcon className="h-4 w-4" />,
      href: "/dashboard/company",
      action: () => dispatch(logout()),
    },
  ];

  const navigate = useNavigate();

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 pt-0 rounded-none"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Typography variant="h6" color="blue-gray">
            Good Morning!
          </Typography>
        </div>
        <div className="flex items-center">
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <div variant="text" color="blue-gray" className="mr-2">
            <div className="flex flex-row items-center">
              <WalletIcon className="h-5 w-5 text-blue-gray-500 mr-2" />
              <Typography className=" font-semibold text-sm text-black">
                {totalEwaAmount}
              </Typography>
            </div>
          </div>
          <Menu>
            <MenuHandler className="cursor-pointer mr-2 items-center justify-center">
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 cursor-pointer text-blue-gray-500" />
              </IconButton>
            </MenuHandler>

            <MenuList className="w-max border-0">
              <div className="text-center text-blue-gray-300">
                No New Notifications
              </div>
            </MenuList>
          </Menu>

          <Menu>
            <MenuHandler>
              <Badge
                overlap="circular"
                placement="bottom-end"
                className="bg-primary cursor-pointer"
              >
                <Avatar
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                  alt="profile picture"
                  size="xs"
                />
              </Badge>
            </MenuHandler>
            <MenuList className="w-max border-0 p-0">
              {menuOptions.map((item, index) => (
                <MenuItem
                  className="flex items-center gap-3 p-3"
                  onClick={() => {
                    navigate(item.href);
                    item.action();
                  }}
                >
                  <div className="flex flex-row items-center w-full">
                    {item.icon}
                    <Typography className="font-normal text-black text-xs ml-2">
                      {item.title}
                    </Typography>
                  </div>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Typography className="ml-2 font-semibold text-black">
            {JSON.parse(localStorage.getItem("cognitoSession")).isLoggedIn
              ? JSON.parse(localStorage.getItem("cognitoSession")).user.username
              : "Guest User"}
          </Typography>
        </div>
      </div>
    </Navbar>
  );
}

export default DashboardNavbar;
