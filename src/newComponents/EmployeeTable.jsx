import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import ProfileSidebar from "../layout/ProfileSidebar";
import {
  setOpenConfigurator,
  useMaterialTailwindController,
} from "../contexts/SidebarContext";

import { useState } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = [
  "Emp ID",
  "Name",
  "EWA",
  "Mobile",
  "EWA Status",
  "Email",
  "DOB",
  "Designation",
  "Employeer",
  "Emp Status",
  "",
];

export default function EmployeeTable({ employeesData }) {
  const itemsPerPage = 10;
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employeesData?.slice(indexOfFirstItem, indexOfLastItem);
  console.log("currentItems", currentItems);

  console.log({ employeesData });

  const [controller, dispatch] = useMaterialTailwindController();
  return (
    <>
      <Card className="mt-4 shadow-none rounded-none">
        <CardBody className="h-full w-full overflow-x-scroll">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems?.map(
                (
                  {
                    employmentId,
                    employeeName,
                    ewa,
                    mobile,
                    ewaStatus,
                    email,
                    dob,
                    designation,
                    principalEmployer,
                    empStatus,
                  },
                  index
                ) => {
                  const isLast = index === currentItems?.length - 1;
                  const classes = isLast ? "p-4" : "p-4";

                  return (
                    <tr key={mobile}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {employmentId ?? "-"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {employeeName ?? "-"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {ewa ?? "-"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {mobile ?? "-"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {ewaStatus ?? "-"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {email ?? "-"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {dob ?? "-"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {designation ?? "-"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {principalEmployer ?? "-"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {empStatus ?? "-"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Menu>
                          <MenuHandler>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </MenuHandler>
                          <MenuList>
                            <MenuItem>Turn Off EWA Access</MenuItem>
                            <MenuItem
                              onClick={() => {
                                setActiveIndex(index);
                                setOpenConfigurator(dispatch, true);
                              }}
                            >
                              Go To Profile
                            </MenuItem>
                            <MenuItem>Delete</MenuItem>
                          </MenuList>
                        </Menu>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {currentPage} of{" "}
            {Math.ceil(employeesData?.length / itemsPerPage)}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => {
                if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
              }}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => {
                if (
                  currentPage < Math.ceil(employeesData?.length / itemsPerPage)
                )
                  setCurrentPage((prevPage) => prevPage + 1);
              }}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      <ProfileSidebar profileData={employeesData?.[activeIndex]} />
    </>
  );
}
