import styles from "../styles/onboard.module.css";
import { HEADER_GROUPS, HEADER_LIST, transformHeadersToFields } from "./fields";
import { CSVUploadDashlet } from "../../../../atomic/organisms/csvUploads/CSVUploadDashlet";
import { allEmployeesBasicDetails } from "../../../../store/slices/apiSlices/employees/employeesApiSlice";
import { useDispatch } from "react-redux";
// techdebt: move this to another styling/theme file
export const CARD_STYLING = {
  marginLeft: "2.7em",
  marginRight: "2.7em",
};

export const HEADER_CLASS = `${styles.column} ${styles.header}`;
export const ACTIONS_CLASS = `${styles.column} ${styles.actions}`;

export function Onboard() {
  const dispatch = useDispatch();
  return (
    <CSVUploadDashlet
      title={"Employee Details"}
      label={"employee_details"}
      templateData={[HEADER_LIST]}
      fields={HEADER_GROUPS}
      preProcessing={transformHeadersToFields}
      onToastDismiss={() => {
        dispatch(
          allEmployeesBasicDetails.util.invalidateTags([
            "AllEmployeesBasicDetails",
          ])
        );
      }}
    ></CSVUploadDashlet>
  );
}
