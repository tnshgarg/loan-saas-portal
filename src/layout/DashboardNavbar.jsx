import {
  BellIcon,
  UserCircleIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  ClockIcon,
  CreditCardIcon,
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
import { useLocation, useNavigate } from "react-router-dom";
import {
  setOpenSidenav,
  useMaterialTailwindController,
} from "../contexts/SidebarContext";
import { logout } from "../store/slices/authSlice";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

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
          {/* <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs> */}
          <Typography variant="h6" color="blue-gray">
            Good Morning User!
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
          <IconButton variant="text" color="blue-gray">
            <WalletIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
          <Typography className="mr-2 font-semibold text-sm text-black mr-4">
            23,000
          </Typography>
          {/* <Link to="/auth/sign-in">
            <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              Sign In
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          </Link> */}
          {/* <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton> */}
          <Menu>
            <MenuHandler>
              <Badge
                containerProps={{ className: "w-5 h-4 mr-6" }}
                // content={
                //   <Typography className="text-[10px] text-white bg-gray">
                //     2
                //   </Typography>
                // }
                className="h-2 w-2 bg-danger"
              >
                {/* <IconButton variant="text" color="blue-gray"> */}
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
                {/* </IconButton> */}
              </Badge>
            </MenuHandler>

            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New message</strong> from Laur
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New album</strong> by Travis Scott
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    Payment successfully completed
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
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
            Guest User
          </Typography>
        </div>
      </div>
    </Navbar>
  );
}

export default DashboardNavbar;
