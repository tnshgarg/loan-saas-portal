import React from "react";
import { CsvUploadDialog } from "./CsvUploadDialog";
import attendance from "../assets/icons/attendance.png";

import { useDispatch } from "react-redux";
import {
  FIELDS,
  HEADER_GROUPS,
  HEADER_LIST,
  transformHeadersToFields,
} from "../components/dashboard/attendance/dataUpload/attendanceDataUploadPanelFields";
import { FS } from "../components/dashboard/employee/onboarding/validations";

const AttendanceUpload = ({
  open,
  setOpen,
  attendanceData,
  handleOpen,
  dateChanged,
  year,
  month,
}) => {
  console.log("date", year, month);
  const dispatch = useDispatch();
  return (
    open && (
      <CsvUploadDialog
        name="Attendance"
        title={"Step 2: Upload Your Employee CSV File"}
        description="By uploading the attendance data, you empower your employees to avail of their on-demand salary benefits via the Unipe App"
        label={"employee_details"}
        headerImage={attendance}
        module={"attendance"}
        dateDropDown={{ exists: true, onChange: dateChanged }}
        templateData={[HEADER_LIST]}
        headerGroups={HEADER_GROUPS}
        fields={FIELDS}
        validations={FS}
        preProcessing={transformHeadersToFields}
        setOpen={setOpen}
        open={open}
        handleOpen={handleOpen}
        employeesData={attendanceData}
        year={year}
        month={month}
        note="Reminder: Uploading accurate attendance data ensures your employees enjoy uninterrupted access to Unipe's advance salary feature."
        // onToastDismiss={() => {
        //   dispatch(
        //     allEmployeesPanelDetails.util.invalidateTags([
        //       "AllEmployeesPanelDetails",
        //     ])
        //   );
        // }}
      />
    )
  );
};

export default AttendanceUpload;
