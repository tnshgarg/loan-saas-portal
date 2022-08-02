export const tableColumns = [
  "Employee ID",
  "Name",
  "Mobile Number",
  'Verification Status',
  "Email",
  "Date of Birth (dd/mm/yyyy)",
  "Job Title",
  "Status",
  {
    Header: "Aadhaar",
    columns: [
      {
        Header: "Number",
        accessor: "Aadhaar Number",
      },
      {
        Header: "Verification Status",
        accessor: "Aadhaar Status",
      },
    ],
  },
  {
    Header: "PAN",
    columns: [
      {
        Header: "Number",
        accessor: "PAN Number",
      },
      {
        Header: "Verification Status",
        accessor: "PAN Status",
      },
    ],
  },
  {
    Header: "Bank",
    columns: [
      {
        Header: "Account Number",
        accessor: "Account Number",
      },
      {
        Header: "IFSC Code",
        accessor: "IFSC Code",
      },
      {
        Header: "Verification Status",
        accessor: "Account Status",
      },
    ],
  },
];
