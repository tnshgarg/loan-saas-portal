import {
  aadhaarValidation,
  currencyValidation,
  dateValidation,
  dojValidation,
  emailValidation,
  genderValidation,
  accNumberValidation,
  ifscValidation,
  noValidation,
  panValidation,
  phoneValidation,
  requiredValidation,
} from "./validations";

export const FIELD_GROUP = {
  PERSISTENT: "Persistent",
  PERSONAL_DETAILS: "Personal Details",
  EMPLOYMENT: "Employment",
  COMPLIANCE: "Compliance",
  NOMINEE: "Nominee",
  IDENTIFICATION: "Identifiation",
  BANK_AC: "Bank A/c",
};
const FG = FIELD_GROUP;
const REQUIRED_SUFFIX = " (Required)";

// FIELDS are order Sensitive
export const FIELDS = [
  {
    header: "Name" + REQUIRED_SUFFIX,
    field: "name",
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
    header: "Employee ID" + REQUIRED_SUFFIX,
    field: "employerEmployeeId",
    default: true,
    required: true,
    validations: requiredValidation,
    group: FG.PERSISTENT,
  },
  {
    header: "Email",
    field: "email",
    required: false,
    validations: emailValidation,
    group: FG.PERSONAL_DETAILS,
  },
  {
    header: "Gender (M/F/T)",
    field: "gender",
    required: false,
    validations: genderValidation,
    group: FG.PERSONAL_DETAILS,
  },
  {
    header: "Nationality",
    field: "nationality",
    required: false,
    validations: noValidation,
    group: FG.PERSONAL_DETAILS,
  },
  {
    header: "Date of Birth (dd/mm/yyyy)",
    field: "dob",
    required: false,
    validations: dateValidation,
    group: FG.PERSONAL_DETAILS,
  },
  {
    header: "Date of Joining (dd/mm/yyyy)" + REQUIRED_SUFFIX,
    field: "doj",
    required: true,
    validations: dojValidation,
    group: FG.EMPLOYMENT,
  },
  {
    header: "Aadhaar Number",
    field: "aadhaarNumber",
    required: false,
    validations: aadhaarValidation,
    group: FG.IDENTIFICATION,
  },
  {
    header: "PAN Number",
    field: "panNumber",
    required: false,
    validations: panValidation,
    group: FG.IDENTIFICATION,
  },
  {
    header: "Bank Account Holder Name",
    field: "holderName",
    required: false,
    validations: noValidation,
    group: FG.BANK_AC,
  },
  {
    header: "Bank Account Number",
    field: "accountNumber",
    required: false,
    validations: accNumberValidation,
    group: FG.BANK_AC,
  },
  {
    header: "Bank IFSC Code",
    field: "ifsc",
    required: false,
    validations: ifscValidation,
    group: FG.BANK_AC,
  },
  {
    header: "Designation" + REQUIRED_SUFFIX,
    field: "designation",
    required: true,
    validations: requiredValidation,
    group: FG.EMPLOYMENT,
  },
  {
    header: "Department (Optional)",
    field: "department",
    required: false,
    validations: noValidation,
    group: FG.EMPLOYMENT,
  },
  {
    header: "Annual CTC" + REQUIRED_SUFFIX,
    field: "aCTC",
    required: true,
    validations: currencyValidation,
    group: FG.EMPLOYMENT,
  },
  {
    header: "PF UAN (Enter if available else leave blank)",
    field: "UAN",
    required: false,
    validations: noValidation,
    group: FG.COMPLIANCE,
  },
  {
    header: "Employer Establishment Code (Username for ESIC Login)",
    field: "estCode",
    required: false,
    validations: noValidation,
    group: FG.COMPLIANCE,
  },
  {
    header: "ESIC Number (aka IP Number) (Enter if available else leave blank)",
    field: "IPNumber",
    required: false,
    validations: noValidation,
    group: FG.COMPLIANCE,
  },
  {
    header: "Father's / Husband's Name",
    field: "fhName",
    required: false,
    validations: noValidation,
    group: FG.COMPLIANCE,
  },
  {
    header: "Relation with Employee (Father/Husband)",
    field: "fhRelation",
    required: false,
    validations: noValidation,
    group: FG.COMPLIANCE,
  },
  {
    header: "Marital Status (Married,Un-married,Widow/Widower,Divorcee)",
    field: "maritalStatus",
    required: false,
    validations: noValidation,
    group: FG.COMPLIANCE,
  },
  {
    header: "Employee Present Address",
    field: "presentStreet",
    required: false,
    validations: noValidation,
    group: FG.COMPLIANCE,
  },
  {
    header: "Employee Present Address District",
    field: "presentDistrict",
    required: false,
    validations: noValidation,
    group: FG.COMPLIANCE,
  },
  {
    header: "Employee Present Address State",
    field: "presentState",
    required: false,
    validations: noValidation,
    group: FG.COMPLIANCE,
  },
  {
    header: "Employee Present Address Pincode",
    field: "presentPin",
    required: false,
    validations: noValidation,
    group: FG.COMPLIANCE,
  },
  {
    header: "Employee Permanent Address",
    field: "permanentStreet",
    required: false,
    validations: noValidation,
    group: FG.COMPLIANCE,
  },
  {
    header: "Employee Permanent Address District",
    field: "permanentDistrict",
    required: false,
    validations: noValidation,
    group: FG.COMPLIANCE,
  },
  {
    header: "Employee Permanent Address State",
    field: "permanentState",
    required: false,
    validations: noValidation,
    group: FG.COMPLIANCE,
  },
  {
    header: "Employee Permanent Address Pincode",
    field: "permanentPin",
    required: false,
    validations: noValidation,
    group: FG.COMPLIANCE,
  },
  {
    header: "Name of Nominee (As per Aadhaar card)",
    field: "nomineeName",
    required: false,
    validations: noValidation,
    group: FG.NOMINEE,
  },
  {
    header: "Nominee Relationship with Employee",
    field: "nomineeRelation",
    required: false,
    validations: noValidation,
    group: FG.NOMINEE,
  },
  {
    header: "Nominee Address",
    field: "nomineeStreet",
    required: false,
    validations: noValidation,
    group: FG.NOMINEE,
  },
  {
    header: "Nominee Address District",
    field: "nomineeDistrict",
    required: false,
    validations: noValidation,
    group: FG.NOMINEE,
  },
  {
    header: "Nominee Address State",
    field: "nomineeState",
    required: false,
    validations: noValidation,
    group: FG.NOMINEE,
  },
  {
    header: "Nominee Address Pincode",
    field: "nomineePin",
    required: false,
    validations: noValidation,
    group: FG.NOMINEE,
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

export const DATE_FIELDS = ["dob", "doj"];

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
