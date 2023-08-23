import {
  monthValidation,
  noValidation,
  phoneValidation,
  requiredValidation,
  yearValidation,
} from "../../employee/onboarding/validations";

export const FIELD_GROUP = {
  PERSISTENT: "Persistent",
  DAILY_ATTENDANCE_DATA: "Daily Attendance Data",
  OVERALL_ATTENDANCE_DATA: "Overall Attendance Data",
};
const FG = FIELD_GROUP;
const REQUIRED_SUFFIX = " (Required)";

const DAY_WISE_FIELDS = [...Array(31).keys()].map((key, index) => {
  const dayString = (index + 1).toString();
  return {
    header: dayString,
    field: dayString,
    required: false,
    validations: noValidation,
    prefetch: true,
    group: FG.DAILY_ATTENDANCE_DATA,
  };
});

// FIELDS are order Sensitive
export const FIELDS = [
  {
    header: "Employee ID" + REQUIRED_SUFFIX,
    field: "employerEmployeeId",
    required: true,
    validations: requiredValidation,
    prefetch: true,
    group: FG.PERSISTENT,
  },
  {
    header: "Name" + REQUIRED_SUFFIX,
    field: "name",
    required: true,
    validations: requiredValidation,
    prefetch: true,
    group: FG.PERSISTENT,
  },
  {
    header: "Mobile Number" + REQUIRED_SUFFIX,
    field: "mobile",
    required: true,
    validations: phoneValidation,
    prefetch: true,
    group: FG.PERSISTENT,
  },
  {
    header: "Department",
    field: "department",
    required: false,
    validations: noValidation,
    prefetch: true,
    group: FG.PERSISTENT,
  },
  {
    header: "Year" + REQUIRED_SUFFIX,
    field: "year",
    required: true,
    validations: yearValidation,
    prefetch: true,
    group: FG.PERSISTENT,
  },
  {
    header: "Month" + REQUIRED_SUFFIX,
    field: "month",
    required: true,
    validations: monthValidation,
    prefetch: true,
    group: FG.PERSISTENT,
  },
  ...DAY_WISE_FIELDS,
  {
    header: "Total Present Days",
    field: "totalPresentDays",
    required: false,
    validations: noValidation,
    prefetch: true,
    group: FG.OVERALL_ATTENDANCE_DATA,
  },
  {
    header: "Total Absent Days",
    field: "totalAbsentDays",
    required: false,
    validations: noValidation,
    prefetch: true,
    group: FG.OVERALL_ATTENDANCE_DATA,
  },
  {
    header: "Total Week Off",
    field: "totalWeekOff",
    required: false,
    validations: noValidation,
    prefetch: true,
    group: FG.OVERALL_ATTENDANCE_DATA,
  },
  {
    header: "Total Half Days",
    field: "totalHalfDays",
    required: false,
    validations: noValidation,
    prefetch: true,
    group: FG.OVERALL_ATTENDANCE_DATA,
  },
  {
    header: "Total Holidays",
    field: "totalHolidays",
    required: false,
    validations: noValidation,
    prefetch: true,
    group: FG.OVERALL_ATTENDANCE_DATA,
  },
  {
    header: "Total Leaves",
    field: "totalLeaves",
    required: false,
    validations: noValidation,
    prefetch: true,
    group: FG.OVERALL_ATTENDANCE_DATA,
  },
  {
    header: "Total Days",
    field: "totalDays",
    required: false,
    validations: noValidation,
    prefetch: true,
    group: FG.OVERALL_ATTENDANCE_DATA,
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
export const getHeaderGroups = (tableFields, shouldTrimHeaders = false) => {
  return tableFields.reduce((groups, column) => {
    const columnHeader = shouldTrimHeaders
      ? column.header.replace(REQUIRED_SUFFIX, "").trim()
      : column.header;
    if (column.group === FG.PERSISTENT) {
      groups.push({ ...column, Header: columnHeader, accessor: column.field });
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
      Header: columnHeader,
      accessor: column.field,
    });
    return groups;
  }, []);
};

export const HEADER_GROUPS = getHeaderGroups(FIELDS);

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
