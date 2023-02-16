import { useDispatch } from "react-redux";
import { CSVUploadDashlet } from "../../../../atomic/organisms/csvUploads/CSVUploadDashlet";
import { allEmployeesPanelDetails } from "../../../../store/slices/apiSlices/employees/panelApiSlice";
import styles from "../styles/onboard.module.css";
import { HEADER_GROUPS, HEADER_LIST, transformHeadersToFields } from "./fields";
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
      module={"onboarding"}
      templateData={[HEADER_LIST]}
      fields={HEADER_GROUPS}
      preProcessing={transformHeadersToFields}
      onToastDismiss={() => {
        dispatch(
          allEmployeesPanelDetails.util.invalidateTags([
            "AllEmployeesPanelDetails",
          ])
        );
      }}
    ></CSVUploadDashlet>
  );
}
