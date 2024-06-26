import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidenav({ brandImg, routes }) {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    console.log({ open });
    setOpen(open === value ? 0 : value);
  };

  return (
    <aside className="bg-white fixed z-50 h-[calc(100vh)] w-full max-w-[18rem] flex flex-col">
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
                  <Typography
                    color="[#597e8c]"
                    className="mr-auto font-normal text-sm"
                  >
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
                      <ListItem className="rounded-none pl-12 focus:bg-gradient-to-r from-[#ebf9d9] to-[#f5fdc8]">
                        <Typography
                          color="[#597e8c]"
                          className="mr-auto font-normal text-sm"
                        >
                          {name}
                        </Typography>
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
        <Typography className="text-xs text-blue-gray-400">
          See how Open-Offer works?
        </Typography>
        <Typography className="text-light-blue-500 text-xs mt-3">
          Chat With Us
        </Typography>
      </div>
    </aside>
  );
}
