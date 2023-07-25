// import { useDispatch } from "react-redux";
import { CSVUploadDashlet } from "../../../../atomic/organisms/csvUploads/CSVUploadDashlet";
import styles from "../../employee/styles/onboard.module.css";
import {
  HEADER_GROUPS,
  HEADER_LIST,
  transformHeadersToFields,
} from "./payslipsDataUploadPanelFields";
// techdebt: move this to another styling/theme file
export const CARD_STYLING = {
  marginLeft: "2.7em",
  marginRight: "2.7em",
};

export const HEADER_CLASS = `${styles.column} ${styles.header}`;
export const ACTIONS_CLASS = `${styles.column} ${styles.actions}`;

export function PayslipsDataUploadPanel() {
  // const dispatch = useDispatch();
  return (
    <CSVUploadDashlet
      title={"Payslips Data Upload"}
      label={"payslips_data_upload"}
      module={"payslips"}
      templateData={[HEADER_LIST]}
      fields={HEADER_GROUPS}
      preProcessing={transformHeadersToFields}
      onToastDismiss={() => {
        // dispatch(
        //   allEmployeesPanelDetails.util.invalidateTags([
        //     "AllEmployeesPanelDetails",
        //   ])
        // );
      }}
    ></CSVUploadDashlet>
  );
}
