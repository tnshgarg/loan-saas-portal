import {
  currencyValidation,
  dateValidation,
  phoneValidation,
  requiredValidation,
} from "../../employee/onboarding/validations";

export const FIELD_GROUP = {
  PERSISTENT: "Persistent",
  EARNINGS: "Earnings",
  DEDUCTIONS: "Deductions",
  NET_PAY: "Net Pay",
};
const FG = FIELD_GROUP;
const REQUIRED_SUFFIX = " (Required)";

// FIELDS are order Sensitive
export const FIELDS = [
  {
    header: "Employee ID" + REQUIRED_SUFFIX,
    field: "employerEmployeeId",
    required: true,
    validations: requiredValidation,
    group: FG.PERSISTENT,
  },
  {
    header: "Mobile Number" + REQUIRED_SUFFIX,
    field: "mobile",
    required: true,
    validations: phoneValidation,
    group: FG.PERSISTENT,
  },
  {
    header: "Name" + REQUIRED_SUFFIX,
    field: "employeeName",
    required: true,
    validations: phoneValidation,
    group: FG.PERSISTENT,
  },

  {
    header: "Date Credited" + REQUIRED_SUFFIX,
    field: "dateCredited",
    required: true,
    validations: dateValidation,
    group: FG.PERSISTENT,
  },
  {
    header: "Basic Salary" + REQUIRED_SUFFIX,
    field: "basicSalary",
    required: true,
    validations: currencyValidation,
    group: FG.EARNINGS,
  },
  {
    header: "HRA" + REQUIRED_SUFFIX,
    field: "hra",
    required: true,
    validations: currencyValidation,
    group: FG.EARNINGS,
  },
  {
    header: "Other Allowance" + REQUIRED_SUFFIX,
    field: "otherAllowance",
    required: true,
    validations: currencyValidation,
    group: FG.EARNINGS,
  },
  {
    header: "Total Earnings" + REQUIRED_SUFFIX,
    field: "totalEarnings",
    required: true,
    validations: currencyValidation,
    group: FG.EARNINGS,
  },
  {
    header: "Tax Deducted" + REQUIRED_SUFFIX,
    field: "taxDeducted",
    required: true,
    validations: currencyValidation,
    group: FG.DEDUCTIONS,
  },
  {
    header: "PF Contribution" + REQUIRED_SUFFIX,
    field: "pfContribution",
    required: true,
    validations: currencyValidation,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Professional Tax" + REQUIRED_SUFFIX,
    field: "professionalTax",
    required: true,
    validations: currencyValidation,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Other Deductions" + REQUIRED_SUFFIX,
    field: "otherDeductions",
    required: true,
    validations: currencyValidation,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Total Deductions" + REQUIRED_SUFFIX,
    field: "totalDeductions",
    required: true,
    validations: currencyValidation,
    group: FG.DEDUCTIONS,
  },
  // {
  //   header: "Earning" + REQUIRED_SUFFIX,
  //   field: "earning",
  //   required: true,
  //   validations: currencyValidation,
  //   group: FG.NET_PAY,
  // },
  // {
  //   header: "Deductions" + REQUIRED_SUFFIX,
  //   field: "deductions",
  //   required: true,
  //   validations: currencyValidation,
  //   group: FG.NET_PAY,
  // },
  {
    header: "Net Pay Post Tax" + REQUIRED_SUFFIX,
    field: "netPayPostTax",
    required: true,
    validations: currencyValidation,
    group: FG.NET_PAY,
  },
];

export const HEADERS_MAP = FIELDS.reduce((map, column) => {
  map[column.header] = column;
  return map;
}, {});

export const FIELD_MAP = FIELDS.reduce((map, column) => {
  map[column.field] = column;
  return map;
}, {});

export const DATE_FIELDS = ["dateCredited"];

/**
 * HEADER_GROUPS is a react-table feature, which allows creating of column groups
 */
export const HEADER_GROUPS = FIELDS.reduce((groups, column) => {
  if (column.group === FG.PERSISTENT) {
    groups.push({ ...column, Header: column.header, accessor: column.field });
    return groups;
  }
  let header_group = groups.find((group) => group.Header === column.group);
  if (!header_group) {
    header_group = {
      Header: column.group,
      columns: [],
    };
    groups.push(header_group);
  }
  header_group.columns.push({
    ...column,
    Header: column.header,
    accessor: column.field,
  });
  return groups;
}, []);

export const HEADER_LIST = FIELDS.map((column) => column.header);

export function transformHeadersToFields(list) {
  console.log({ transformHeadersToFields: true, list });
  return list.map((item) => {
    return Object.entries(HEADERS_MAP).reduce(
      (transformedObject, [header, column]) => {
        const trimmedHeader = header.replace(REQUIRED_SUFFIX, "").trim();
        console.log({ header, column, item });
        transformedObject[column.field] =
          item[header] ?? item[trimmedHeader] ?? "";
        return transformedObject;
      },
      {}
    );
  });
}
