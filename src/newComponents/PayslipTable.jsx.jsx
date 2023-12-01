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
  "Take Home Salary",
  "Deductions",
  "Gross Pay",
  "Action",
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

export default function PayslipTable({ payslipsData }) {
  const itemsPerPage = 10;
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payslipsData?.slice(indexOfFirstItem, indexOfLastItem);
  console.log("currentItems", currentItems);

  console.log({ payslipsData });

  function renderValue(value) {
    if (value !== null && value?.length > 0 && value !== undefined)
      return value;
    else
      return (
        <Typography className="text-sm font-bold text-danger">-</Typography>
      );
  }
  return (
    // <Card className="h-full w-full overflow-scroll rounded-none shadow-none mt-4">
    //   <table className="w-full min-w-max table-auto text-left">
    //     <thead>
    //       <tr>
    //         {TABLE_HEAD.map((head) => (
    //           <th
    //             key={head}
    //             className="border-b border-lightgray_01 bg-white p-4"
    //           >
    //             <Typography
    //               variant="small"
    //               className="font-bold leading-none text-black"
    //             >
    //               {head}
    //             </Typography>
    //           </th>
    //         ))}
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {TABLE_ROWS.map(
    //         (
    //           { name, id, takeHomeSalary, deductions, grossPay, action },
    //           index
    //         ) => {
    //           const isLast = index === TABLE_ROWS.length - 1;
    //           const classes = isLast ? "p-4" : "p-4";

    //           return (
    //             <tr key={name}>
    //               <td className={classes}>
    //                 <Typography
    //                   variant="small"
    //                   color="blue-gray"
    //                   className="font-normal text-xs"
    //                 >
    //                   {id}
    //                 </Typography>
    //               </td>
    //               <td className={classes}>
    //                 <Typography
    //                   variant="small"
    //                   color="blue-gray"
    //                   className="font-normal text-xs"
    //                 >
    //                   {name}
    //                 </Typography>
    //               </td>
    //               <td className={classes}>
    //                 <Typography
    //                   variant="small"
    //                   color="blue-gray"
    //                   className="font-normal text-xs"
    //                 >
    //                   {takeHomeSalary}
    //                 </Typography>
    //               </td>
    //               <td className={classes}>
    //                 <Typography
    //                   as="a"
    //                   href="#"
    //                   variant="small"
    //                   color="blue-gray"
    //                   className="font-medium"
    //                 >
    //                   {deductions}
    //                 </Typography>
    //               </td>
    //               <td className={classes}>
    //                 <Typography
    //                   variant="small"
    //                   color="blue-gray"
    //                   className="font-normal text-xs"
    //                 >
    //                   {grossPay}
    //                 </Typography>
    //               </td>
    //               <td className={classes}>
    //                 <IconButton className="bg-secondary rounded-md" size="sm">
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     strokeWidth={1.5}
    //                     stroke="currentColor"
    //                     className="w-4 h-4"
    //                   >
    //                     <path
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
    //                     />
    //                   </svg>
    //                 </IconButton>
    //               </td>
    //             </tr>
    //           );
    //         }
    //       )}
    //     </tbody>
    //   </table>
    // </Card>
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
            {TABLE_ROWS?.map(
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
                  <tr key={index}>
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
          Page {currentPage} of {Math.ceil(payslipsData?.length / itemsPerPage)}
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
              if (currentPage < Math.ceil(payslipsData?.length / itemsPerPage))
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
