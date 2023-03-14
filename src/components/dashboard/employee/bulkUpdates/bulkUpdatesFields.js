import {
  currencyValidation,
  doeValidation,
  phoneValidation,
  requiredValidation,
} from "../../employee/onboarding/validations";
import { buildHeaderMap, REQUIRED_SUFFIX } from "../../payouts/util";

// FIELDS are order Sensitive
export const FIELDS = [
  {
    header: "Employee Name" + REQUIRED_SUFFIX,
    field: "employeeName",
    required: true,
    validations: requiredValidation,
    prefetch: true,
  },
  {
    header: "Mobile Number" + REQUIRED_SUFFIX,
    field: "mobile",
    required: true,
    validations: phoneValidation,
    prefetch: true,
  },
  {
    header: "Employee ID" + REQUIRED_SUFFIX,
    field: "employerEmployeeId",
    required: true,
    validations: requiredValidation,
    prefetch: true,
  },
  {
    header: "Date of Exit (dd/mm/yyyy)",
    field: "doe",
    required: false,
    validations: doeValidation,
    prefetch: true,
  },
  {
    header: "Designation" + REQUIRED_SUFFIX,
    field: "designation",
    required: true,
    validations: requiredValidation,
    prefetch: true,
  },
  {
    header: "Department" + REQUIRED_SUFFIX,
    field: "department",
    required: true,
    validations: requiredValidation,
    prefetch: true,
  },
  {
    header: "Principal Employer" + REQUIRED_SUFFIX,
    field: "principalEmployer",
    required: true,
    validations: requiredValidation,
    prefetch: true,
  },
  {
    header: "Annual CTC" + REQUIRED_SUFFIX,
    field: "aCTC",
    required: true,
    validations: currencyValidation,
    prefetch: true,
  },
  {
    header: "Monthly Inhand Salary" + REQUIRED_SUFFIX,
    field: "mInHandSalary",
    required: true,
    validations: currencyValidation,
    prefetch: true,
  },
];

export const BULK_UPDATES_HEADERS = FIELDS.map((column) => ({
  ...column,
  Header: column.header.replace(REQUIRED_SUFFIX, ""),
  accessor: column.field,
}));

export const BULK_UPDATES_HEADER_MAP = buildHeaderMap(FIELDS);
