import {
  amountValidation,
  monthValidation,
  phoneValidation,
  requiredValidation,
  yearValidation,
} from "../../employee/onboarding/validations";
import { buildHeaderMap, REQUIRED_SUFFIX } from "../util";

// FIELDS are order Sensitive
export const FIELDS = [
  {
    header: "Employee Id" + REQUIRED_SUFFIX,
    field: "employerEmployeeId",
    validations: requiredValidation,
    prefetch: true,
  },
  {
    header: "Employee Name" + REQUIRED_SUFFIX,
    field: "employeeName",
    validations: requiredValidation,
    prefetch: true,
  },
  {
    header: "Mobile Number" + REQUIRED_SUFFIX,
    field: "mobile",
    validations: phoneValidation,
    prefetch: true,
  },
  {
    header: "Year (yyyy)" + REQUIRED_SUFFIX,
    field: "year",
    validations: yearValidation,
  },
  {
    header: "Month (mm)" + REQUIRED_SUFFIX,
    field: "month",
    validations: monthValidation,
  },
  {
    header: "Amount Payable" + REQUIRED_SUFFIX,
    field: "amountPayable",
    validations: amountValidation,
  },
];

export const ONE_CLICK_HEADERS = FIELDS.map((column) => ({
  ...column,
  Header: column.header.replace(REQUIRED_SUFFIX, ""),
  accessor: column.field,
}));

export const ONE_CLICK_PAYMENTS_HEADER_MAP = buildHeaderMap(FIELDS);
