import { Card, Typography } from "@material-tailwind/react";

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

export default function AttendanceTable() {
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
            ({ name, id, ewa, present, halfDay, holiday }, index) => {
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
                      {ewa}
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
                      {present}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-xs"
                    >
                      {halfDay}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-xs"
                    >
                      {holiday}
                    </Typography>
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
