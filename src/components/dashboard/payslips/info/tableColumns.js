export const PAYSLIPS_TABLE_FIELDS = [
  {
    Header: "Mobile",
    accessor: "mobile",
  },
  {
    Header: "Employee ID",
    accessor: "employerEmployeeId",
  },
  {
    Header: "Date Credited",
    accessor: "dateCredited",
  },
  {
    Header: "Earnings",
    columns: [
      {
        Header: "Basic Salary",
        accessor: "basicSalary",
      },
      {
        Header: "HRA",
        accessor: "hra",
      },
      {
        Header: "Other Allowance",
        accessor: "otherAllowance",
      },
      {
        Header: "Total Earnings",
        accessor: "totalEarnings",
      },
    ],
  },
  {
    Header: "Deductions",
    columns: [
      {
        Header: "Tax Deducted",
        accessor: "taxDeducted",
      },
      {
        Header: "PF Contribution",
        accessor: "pfContribution",
      },
      {
        Header: "Professional Tax",
        accessor: "professionalTax",
      },
      {
        Header: "Other Deductions",
        accessor: "otherDeductions",
      },
      {
        Header: "Total Deductions",
        accessor: "totalDeductions",
      },
    ],
  },
  {
    Header: "Net Pay",
    columns: [
      {
        Header: "Earning",
        accessor: "earning",
      },
      {
        Header: "Deductions",
        accessor: "deductions",
      },
      {
        Header: "Net Pay Post Tax",
        accessor: "netPayPostTax",
      },
    ],
  },
];
