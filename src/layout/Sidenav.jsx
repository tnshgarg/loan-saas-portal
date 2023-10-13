// import PropTypes from "prop-types";
// import React from "react";
// import { Link, NavLink } from "react-router-dom";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// import {
//   Accordion,
//   AccordionBody,
//   AccordionHeader,
//   Avatar,
//   Button,
//   IconButton,
//   Menu,
//   MenuHandler,
//   MenuItem,
//   MenuList,
//   Typography,
// } from "@material-tailwind/react";
// import {
//   useMaterialTailwindController,
//   setOpenSidenav,
// } from "../contexts/SidebarContext";

// export function Sidenav({ brandImg, brandName, routes }) {
//   const [controller, dispatch] = useMaterialTailwindController();
//   const { sidenavColor, sidenavType, openSidenav } = controller;
//   const sidenavTypes = {
//     dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
//     white: "bg-white shadow-lg",
//     transparent: "bg-transparent",
//   };

//   const [open, setOpen] = React.useState(1);

//   const handleOpen = (value) => setOpen(open === value ? 0 : value);

//   return (
//     <aside
//       className={`bg-white ${
//         openSidenav ? "translate-x-0" : "-translate-x-80"
//       } fixed inset-0 z-50 h-[calc(100vh-32px)] w-72 transition-transform duration-300 xl:translate-x-0`}
//     >
//       <div
//         className={`relative border-b ${
//           sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
//         }`}
//       >
//         <Link to="/" className="flex items-center gap-4 py-6 px-8">
//           <img src={brandImg} className="w-1/2 h-20px" />
//           <Typography
//             variant="h6"
//             color={sidenavType === "dark" ? "white" : "blue-gray"}
//           >
//             {brandName}
//           </Typography>
//         </Link>
//         {/* <IconButton
//           variant="text"
//           color="white"
//           size="sm"
//           ripple={false}
//           className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
//           onClick={() => setOpenSidenav(dispatch, false)}
//         >
//           <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
//         </IconButton> */}
//       </div>
//       <div className="">
//         {routes.map(({ layout, title, children }, key) => (
//           <ul key={key} className="mb-4 flex flex-col gap-1">
//             <Accordion
//               open={open === 1}
//               className="mb-2 rounded-lg border border-blue-gray-100 px-4"
//             >
//               <AccordionHeader
//                 onClick={() => handleOpen(1)}
//                 className={`border-b-0 transition-colors ${
//                   open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
//                 }`}
//               >
//                 {title}
//               </AccordionHeader>
//               <AccordionBody className="pt-0 text-base font-normal">
//                 We&apos;re not always in the position that we want to be at.
//                 We&apos;re constantly growing. We&apos;re constantly making
//                 mistakes. We&apos;re constantly trying to express ourselves and
//                 actualize our dreams.
//               </AccordionBody>
//             </Accordion>
//             {/* <Menu placement="right">
//               <MenuHandler>
//                 <Button variant="text" className="rounded-none" size="lg">
//                   {title}
//                 </Button>
//               </MenuHandler>
//               <MenuList>
//                 {children.map(({ name }, index) => (
//                   <MenuItem>{name}</MenuItem>
//                 ))}
//               </MenuList>
//             </Menu> */}
//             {/* {title && (
//               <li className="mx-3.5 mt-4 mb-2">
//                 <Typography
//                   variant="small"
//                   color={"blue-gray"}
//                   className="font-black uppercase opacity-75"
//                 >
//                   {title}
//                 </Typography>
//               </li>
//             )}

//             {children.map(({ icon, name, path }) => (
//               <li key={name}>
//                 <NavLink to={`/${layout}${path}`}>
//                   {({ isActive }) => (
//                     <Button
//                       variant={isActive ? "gradient" : "text"}
//                       color={isActive ? "yellow" : "blue-gray"}
//                       className="flex items-center gap-4 rounded-none px-4 capitalize"
//                       fullWidth
//                     >
//                       {icon}
//                       <Typography
//                         color="inherit"
//                         className="font-medium capitalize"
//                       >
//                         {name}
//                       </Typography>
//                     </Button>
//                   )}
//                 </NavLink>
//               </li>
//             ))} */}
//           </ul>
//         ))}
//       </div>
//     </aside>
//   );
// }

// export default Sidenav;

import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

export default function Sidenav({ brandImg, brandName, routes }) {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = (value) => {
    console.log({ open });
    setOpen(open === value ? 0 : value);
  };

  console.log({ routes });

  return (
    <aside className="bg-white translate-x-0 fixed inset-0 z-50 h-[calc(100vh)] w-full max-w-[20rem] transition-transform duration-300 xl:translate-x-0 flex flex-col">
      {/* className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5"> */}
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src={brandImg} className="w-1/2 h-20px" />
      </div>

      <List className="p-0">
        {routes.map(({ layout, title, children, parentRoute, icon }, index) => (
          <Accordion open={open === index + 1}>
            <NavLink
              to={`/dashboard${parentRoute}`}
              style={{ textDecoration: "none" }}
            >
              <ListItem
                className="p-0 rounded-none hover:bg-gradient-to-r focus:bg-gradient-to-r from-[#ebf9d9] to-[#f5fdc8]"
                selected={open === index + 1}
              >
                <AccordionHeader
                  onClick={() => handleOpen(index + 1)}
                  className={`border-b-0  p-3 transition-colors `}
                >
                  <ListItemPrefix>{icon}</ListItemPrefix>
                  <Typography color="[#597e8c]" className="mr-auto font-normal">
                    {title}
                  </Typography>
                </AccordionHeader>
              </ListItem>
            </NavLink>
            {children ? (
              <AccordionBody className="py-1">
                <List className="p-0" to>
                  {children?.map(({ name, route }, index) => (
                    <NavLink
                      to={`/dashboard${parentRoute}${route}`}
                      style={{ textDecoration: "none" }}
                    >
                      {/* <ListItemPrefix></ListItemPrefix> */}
                      <ListItem className="rounded-none pl-12 focus:bg-gradient-to-r from-[#ebf9d9] to-[#f5fdc8]">
                        {name}
                      </ListItem>
                    </NavLink>
                  ))}
                </List>
              </AccordionBody>
            ) : null}
          </Accordion>
        ))}
      </List>
      <div className="mt-auto justify-end bg-lightgray_01 m-4 rounded-md p-4">
        <Typography className="font-bold text-md">Need Help?</Typography>
        <Typography className="text-sm text-gray">
          Loreum Ipsum info but
        </Typography>
      </div>
      {/* <Alert
        open={openAlert}
        className="mt-auto"
        onClose={() => setOpenAlert(false)}
      >
        <CubeTransparentIcon className="mb-4 h-12 w-12" />
        <Typography variant="h6" className="mb-1">
          Upgrade to PRO
        </Typography>
        <Typography variant="small" className="font-normal opacity-80">
          Upgrade to Material Tailwind PRO and get even more components,
          plugins, advanced features and premium.
        </Typography>
        <div className="mt-4 flex gap-3">
          <Typography
            as="a"
            href="#"
            variant="small"
            className="font-medium opacity-80"
            onClick={() => setOpenAlert(false)}
          >
            Dismiss
          </Typography>
          <Typography as="a" href="#" variant="small" className="font-medium">
            Upgrade Now
          </Typography>
        </div>
      </Alert> */}
    </aside>
  );
}
