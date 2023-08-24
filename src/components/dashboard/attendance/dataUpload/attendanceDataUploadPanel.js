import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { CSVUploadDashlet } from "../../../../atomic/organisms/csvUploads/CSVUploadDashlet";
import {
  // attendanceApi,
  useGetAttendanceQuery,
} from "../../../../store/slices/apiSlices/employer/attendanceApiSlice";
import styles from "../../employee/styles/onboard.module.css";
import {
  HEADER_GROUPS,
  buildTemplate,
  transformHeadersToFields,
} from "./attendanceDataUploadPanelFields";

// techdebt: move this to another styling/theme file
export const CARD_STYLING = {
  marginLeft: "2.7em",
  marginRight: "2.7em",
};

export const HEADER_CLASS = `${styles.column} ${styles.header}`;
export const ACTIONS_CLASS = `${styles.column} ${styles.actions}`;

function mapStateToProps(state) {
  return {
    employerId: state.auth.user?.attributes.sub || "",
  };
}

const _AttendanceDataUploadPanel = ({ employerId }) => {
  const today = new Date();
  const [{ year, month }, setDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });

  const dateChanged = (updatedDate) => {
    setDate(updatedDate);
  };
  const dispatch = useDispatch();
  const { data, error, isFetching } = useGetAttendanceQuery({
    id: employerId,
    year: year,
    month: month,
  });
  if (error) console.error(error);
  const employeesAttendanceData = data?.body ?? [];
  const templateData = buildTemplate(employeesAttendanceData, month);

  const preProcessing = (data) => {
    return transformHeadersToFields(data, year, month);
  };

  return (
    <CSVUploadDashlet
      title={"Attendance Data Upload"}
      label={"attendance_data_upload"}
      module={"attendance"}
      templateDownloadProps={{ loading: isFetching, templateData }}
      fields={HEADER_GROUPS}
      preProcessing={preProcessing}
      // onToastDismiss={() => {
      //   dispatch(attendanceApi.util.invalidateTags(["Attendance"]));
      // }}
      dateDropDown={{ exists: true, onChange: dateChanged }}
    ></CSVUploadDashlet>
  );
};

export const AttendanceDataUploadPanel = connect(mapStateToProps)(
  _AttendanceDataUploadPanel
);
