import {
  Card,
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

const TABLE_HEAD = [
  "Emp ID",
  "Name",
  "EWA",
  "Mobile",
  "Status",
  "Email",
  "DOB",
  "Designation",
  "Employeer",
  "Emp Status",
  "",
];

const TABLE_ROWS = [
  {
    id: "123456",
    name: "Amar Roy",
    ewa: "5000",
    mobile: 9999999999,
    ewaStatus: "Active",
    email: "amar@gmail.com",
    dob: "DOB",
    designation: "Designation",
    employer: "Employer",
    empStatus: "Active",
  },
  {
    id: "123456",
    name: "Amar Roy",
    ewa: "5000",
    mobile: 9999999999,
    ewaStatus: "Active",
    email: "amar@gmail.com",
    dob: "DOB",
    designation: "Designation",
    employer: "Employer",
    empStatus: "Active",
  },
  {
    id: "123456",
    name: "Amar Roy",
    ewa: "5000",
    mobile: 9999999999,
    ewaStatus: "Active",
    email: "amar@gmail.com",
    dob: "DOB",
    designation: "Designation",
    employer: "Employer",
    empStatus: "Active",
  },
  {
    id: "123456",
    name: "Amar Roy",
    ewa: "5000",
    mobile: 9999999999,
    ewaStatus: "Active",
    email: "amar@gmail.com",
    dob: "DOB",
    designation: "Designation",
    employer: "Employer",
    empStatus: "Active",
  },
  {
    id: "123456",
    name: "Amar Roy",
    ewa: "5000",
    mobile: 9999999999,
    ewaStatus: "Active",
    email: "amar@gmail.com",
    dob: "DOB",
    designation: "Designation",
    employer: "Employer",
    empStatus: "Active",
  },
  {
    id: "123456",
    name: "Amar Roy",
    ewa: "5000",
    mobile: 9999999999,
    ewaStatus: "Active",
    email: "amar@gmail.com",
    dob: "DOB",
    designation: "Designation",
    employer: "Employer",
    empStatus: "Active",
  },
  {
    id: "123456",
    name: "Amar Roy",
    ewa: "5000",
    mobile: 9999999999,
    ewaStatus: "Active",
    email: "amar@gmail.com",
    dob: "DOB",
    designation: "Designation",
    employer: "Employer",
    empStatus: "Active",
  },
  {
    id: "123456",
    name: "Amar Roy",
    ewa: "5000",
    mobile: 9999999999,
    ewaStatus: "Active",
    email: "amar@gmail.com",
    dob: "DOB",
    designation: "Designation",
    employer: "Employer",
    empStatus: "Active",
  },
];

export default function EmployeeTable() {
  const [controller, dispatch] = useMaterialTailwindController();
  return (
    <>
      {" "}
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
                {
                  id,
                  name,
                  ewa,
                  mobile,
                  ewaStatus,
                  email,
                  dob,
                  designation,
                  employer,
                  empStatus,
                },
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
                        {ewa}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-xs"
                      >
                        {mobile}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-xs"
                      >
                        {ewaStatus}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-xs"
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-xs"
                      >
                        {dob}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-xs"
                      >
                        {designation}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-xs"
                      >
                        {employer}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-xs"
                      >
                        {empStatus}
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
                            onClick={() => setOpenConfigurator(dispatch, true)}
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
      </Card>
      <ProfileSidebar />
    </>
  );
}
