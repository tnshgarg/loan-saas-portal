import {
  FIELDS,
  FIELD_GROUP,
  getHeaderGroups,
} from "../dataUpload/attendanceDataUploadPanelFields";

const FG = FIELD_GROUP;

const FINAL_ATTENDANCE_FIELDS = [
  ...FIELDS,
  {
    header: "Total Working Days",
    field: "totalWorkingDays",
    group: FG.OVERALL_ATTENDANCE_DATA,
  },
  {
    header: "Attendance Percentage",
    field: "attendancePercentage",
    group: FG.OVERALL_ATTENDANCE_DATA,
  },
];

const shouldTrimHeaders = true;
export const ATTENDANCE_TABLE_FIELDS = getHeaderGroups(
  FINAL_ATTENDANCE_FIELDS,
  shouldTrimHeaders
);
