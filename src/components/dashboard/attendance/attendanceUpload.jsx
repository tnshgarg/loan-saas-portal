import { HEADER_GROUPS, HEADER_LIST, transformHeadersToFields } from "./fields";
import { useDispatch } from "react-redux";
import { CSVUploadDashlet } from "../../../atomic/organisms/csvUploads/CSVUploadDashlet";

export function AttendanceUpload() {
  const dispatch = useDispatch();
  return (
    <CSVUploadDashlet
      title={"Employee Attendance"}
      label={"attendance_details"}
      templateData={[HEADER_LIST]}
      fields={HEADER_GROUPS}
      preProcessing={transformHeadersToFields}
      onToastDismiss={() => {
        // attendence dispatch
        // dispatch(
        //   allEmployeesBasicDetails.util.invalidateTags([
        //     "AllEmployeesBasicDetails",
        //   ])
        // );
      }}
    ></CSVUploadDashlet>
  );
}
