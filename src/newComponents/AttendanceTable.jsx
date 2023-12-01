import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
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
import { useState } from "react";

const TABLE_HEAD = [
  "Emp ID",
  "Name",
  "EWA",
  "Present",
  "Half Day",
  "Paid Holidays",
];

const TABLE_ROWS = [
  {
    id: "123456",
    name: "Amar Roy ",
    ewa: "5000",
    present: 25,
    halfDay: 2,
    absent: 2,
    holiday: 0,
  },
  {
    id: "123456",
    name: "Amar Roy ",
    ewa: "5000",
    present: 25,
    halfDay: 2,
    absent: 2,
    holiday: 0,
  },
  {
    id: "123456",
    name: "Amar Roy ",
    ewa: "5000",
    present: 25,
    halfDay: 2,
    absent: 2,
    holiday: 0,
  },
  {
    id: "123456",
    name: "Amar Roy ",
    ewa: "5000",
    present: 25,
    halfDay: 2,
    absent: 2,
    holiday: 0,
  },
  {
    id: "123456",
    name: "Amar Roy ",
    ewa: "5000",
    present: 25,
    halfDay: 2,
    absent: 2,
    holiday: 0,
  },
  {
    id: "123456",
    name: "Amar Roy ",
    ewa: "5000",
    present: 25,
    halfDay: 2,
    absent: 2,
    holiday: 0,
  },

  {
    id: "123456",
    name: "Amar Roy ",
    ewa: "5000",
    present: 25,
    halfDay: 2,
    absent: 2,
    holiday: 0,
  },
  {
    id: "123456",
    name: "Amar Roy ",
    ewa: "5000",
    present: 25,
    halfDay: 2,
    absent: 2,
    holiday: 0,
  },
  {
    id: "123456",
    name: "Amar Roy ",
    ewa: "5000",
    present: 25,
    halfDay: 2,
    absent: 2,
    holiday: 0,
  },
  {
    id: "123456",
    name: "Amar Roy ",
    ewa: "5000",
    present: 25,
    halfDay: 2,
    absent: 2,
    holiday: 0,
  },
  {
    id: "123456",
    name: "Amar Roy ",
    ewa: "5000",
    present: 25,
    halfDay: 2,
    absent: 2,
    holiday: 0,
  },
];

export default function AttendanceTable({ attendanceData }) {
  const itemsPerPage = 10;
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attendanceData?.slice(indexOfFirstItem, indexOfLastItem);
  console.log("currentItems", currentItems);

  console.log({ attendanceData });

  function renderValue(value) {
    if (
      value !== null ||
      value?.length > 0 ||
      value !== undefined ||
      value == 0
    )
      return value;
    else
      return (
        <Typography className="text-sm font-bold text-danger">-</Typography>
      );
  }
  return (
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
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
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
                  name,
                  employerEmployeeId,
                  ewa,
                  mobile,
                  totalHalfDays,
                  totalPresentDays,
                  totalHolidays,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? "p-4" : "p-4";

                return (
                  <tr key={mobile}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-xs"
                      >
                        {renderValue(employerEmployeeId)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-xs"
                      >
                        {renderValue(name)}
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
                        className="font-medium"
                      >
                        {renderValue(totalPresentDays)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-xs"
                      >
                        {renderValue(totalHalfDays)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-xs"
                      >
                        {renderValue(totalHolidays)}
                      </Typography>
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
          {Math.ceil(attendanceData?.length / itemsPerPage)}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            disabled={currentPage == 1}
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
                currentPage < Math.ceil(attendanceData?.length / itemsPerPage)
              )
                setCurrentPage((prevPage) => prevPage + 1);
            }}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
