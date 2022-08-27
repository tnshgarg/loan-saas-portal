import {
  aadhaarValidation,
  currencyValidation,
  dateValidation,
  dojValidation,
  emailValidation,
  genderValidation,
  ifscValidation,
  noValidation,
  panValidation,
  phoneValidation,
  requiredValidation,
} from "../employee/onboarding/validations";

const REQUIRED_SUFFIX = " (Required)";

// FIELDS are order Sensitive
export const FIELDS = [
  {
    header: "Name" + REQUIRED_SUFFIX,
    field: "name",
    validations: requiredValidation,
  },
  {
    header: "Employee ID" + REQUIRED_SUFFIX,
    field: "employeeId",
    default: true,
    required: true,
    validations: requiredValidation,
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

/**
 * HEADER_GROUPS is a react-table feature, which allows creating of column groups
 */
export const HEADER_GROUPS = FIELDS;

export const HEADER_LIST = FIELDS.map((column) => column.header);
export function transformHeadersToFields(list) {
  return list.map((item) => {
    return Object.entries(HEADERS_MAP).reduce(
      (transformedObject, [header, column]) => {
        header = header.replace(REQUIRED_SUFFIX, "").trim();
        console.log(header);
        transformedObject[column.field] = item[header];
        return transformedObject;
      },
      {}
    );
  });
}
