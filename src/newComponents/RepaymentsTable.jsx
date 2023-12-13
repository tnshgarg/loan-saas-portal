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
  "Loan Amount",
  "Status",
  "Disbursement date",
  "Due Date",
  "Pending Amount",
  "Repaid amount",
  "Repayment date",
  "",
];

const TABLE_ROWS = [
  {
    id: "123456",
    name: "Amar Roy",
    takeHomeSalary: "5000",
    deductions: 235,
    grossPay: 5000,
    // action: 2,
  },
  {
    id: "123456",
    name: "Amar Roy",
    takeHomeSalary: "5000",
    deductions: 235,
    grossPay: 5000,
    // action: 2,
  },
  {
    id: "123456",
    name: "Amar Roy",
    takeHomeSalary: "5000",
    deductions: 235,
    grossPay: 5000,
    // action: 2,
  },
  {
    id: "123456",
    name: "Amar Roy",
    takeHomeSalary: "5000",
    deductions: 235,
    grossPay: 5000,
    // action: 2,
  },
  {
    id: "123456",
    name: "Amar Roy",
    takeHomeSalary: "5000",
    deductions: 235,
    grossPay: 5000,
    // action: 2,
  },
  {
    id: "123456",
    name: "Amar Roy",
    takeHomeSalary: "5000",
    deductions: 235,
    grossPay: 5000,
    // action: 2,
  },
  {
    id: "123456",
    name: "Amar Roy",
    takeHomeSalary: "5000",
    deductions: 235,
    grossPay: 5000,
    // action: 2,
  },
  {
    id: "123456",
    name: "Amar Roy",
    takeHomeSalary: "5000",
    deductions: 235,
    grossPay: 5000,
    // action: 2,
  },
  {
    id: "123456",
    name: "Amar Roy",
    takeHomeSalary: "5000",
    deductions: 235,
    grossPay: 5000,
    // action: 2,
  },
];

export default function RepaymentsTable({ employeesData }) {
  const itemsPerPage = 10;
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employeesData?.slice(indexOfFirstItem, indexOfLastItem);
  console.log("currentItems", currentItems);

  const [controller, dispatch] = useMaterialTailwindController();
  function renderValue(value) {
    if (value !== null && value?.length > 0 && value !== undefined)
      return value;
    else if (value == true)
      return (
        <Typography className="text-xs font-semibold text-primary">
          Active
        </Typography>
      );
    else
      return (
        <Typography className="text-sm font-bold text-danger">-</Typography>
      );
  }
  return (
    <>
      <Card className="mt-4 shadow-none rounded-none ">
        <CardBody className="h-full w-full overflow-x-scroll p-0">
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
              {TABLE_ROWS?.map(
                (
                  {
                    employmentId,
                    employerEmployeeId,
                    employeeName,
                    ewa,
                    mobile,
                    ewaStatus,
                    email,
                    dob,
                    designation,
                    principalEmployer,
                    active,
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
                          {/* {employmentId ?? "-"} */}
                          {renderValue(employerEmployeeId)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {renderValue(employeeName)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {renderValue(ewa)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {renderValue(mobile)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {ewaStatus ?? "Off"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {renderValue(email)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {renderValue(dob)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {renderValue(designation)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {renderValue(principalEmployer)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {/* EXIT */}
                          {renderValue(active)}
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
      </Card>
      <div className="flex flex-row items-center justify-end border-t border-blue-gray-50 py-4 bg-transparent">
        <div
          className="bg-white h-5 w-5 items-center flex flex-col justify-center hover:bg-lightGray cursor-pointer shadow-sm"
          onClick={() => {
            if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
          }}
        >
          <i class="fa fa-arrow-left text-xs" aria-hidden="true"></i>
        </div>
        <div className="bg-white h-5 w-5 items-center flex flex-col justify-center mx-2 shadow-sm">
          <Typography className="font-medium text-[10px]">
            {currentPage}
          </Typography>
        </div>
        <div
          className="bg-white h-5 w-5 items-center flex flex-col justify-center hover:bg-lightGray cursor-pointer shadow-sm"
          onClick={() => {
            if (currentPage < Math.ceil(employeesData?.length / itemsPerPage))
              setCurrentPage((prevPage) => prevPage + 1);
          }}
        >
          <i class="fa fa-arrow-right text-xs" aria-hidden="true"></i>
        </div>
      </div>

      <ProfileSidebar profileData={employeesData?.[activeIndex] ?? {}} />
    </>
  );
}
