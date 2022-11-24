import {
  amountValidation,
  emailValidation,
  monthValidation,
  noValidation,
  phoneValidation,
  requiredValidation,
  yearValidation,
} from "../../employee/onboarding/validations";
import { buildHeaderMap, REQUIRED_SUFFIX } from "../util";

// FIELDS are order Sensitive
export const FIELDS = [
  {
    header: "Account Holder Name" + REQUIRED_SUFFIX,
    field: "accountHolderName",
    validations: requiredValidation,
  },
  {
    header: "Account Number" + REQUIRED_SUFFIX,
    field: "accountNumber",
    validations: amountValidation,
  },
  {
    header: "IFSC" + REQUIRED_SUFFIX,
    field: "ifsc",
    validations: requiredValidation,
  },
  {
    header: "Mobile Number" + REQUIRED_SUFFIX,
    field: "mobile",
    validations: phoneValidation,
    prefetch: true,
  },
  {
    header: "Email" + REQUIRED_SUFFIX,
    field: "email",
    validations: emailValidation,
    prefetch: true,
  },
  {
    header: "Address" + REQUIRED_SUFFIX,
    field: "address",
    validations: requiredValidation,
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
    field: "amount",
    validations: noValidation,
  },
  {
    header: "Remarks",
    field: "remarks",
    validations: noValidation,
    prefetch: true,
  },
];

export const ONE_CLICK_HEADERS = FIELDS.map((column) => ({
  ...column,
  Header: column.header.replace(REQUIRED_SUFFIX, ""),
  accessor: column.field,
}));

export const ONE_CLICK_PAYMENTS_HEADER_MAP = buildHeaderMap(FIELDS);
