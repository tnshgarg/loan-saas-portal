import { Card, IconButton, Typography } from "@material-tailwind/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

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

export default function PayslipTable() {
  return (
    <Card className="h-full w-full overflow-scroll rounded-none shadow-none mt-4">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-lightgray_01 bg-white p-4"
              >
                <Typography
                  variant="small"
                  className="font-bold leading-none text-black"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(
            (
              { name, id, takeHomeSalary, deductions, grossPay, action },
              index
            ) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4" : "p-4";

              return (
                <tr key={name}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-xs"
                    >
                      {id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-xs"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-xs"
                    >
                      {takeHomeSalary}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {deductions}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-xs"
                    >
                      {grossPay}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <IconButton className="bg-secondary rounded-md" size="sm">
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
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                    </IconButton>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Card>
  );
}
