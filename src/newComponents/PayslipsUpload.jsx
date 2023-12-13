import React from "react";
import { CsvUploadDialog } from "./CsvUploadDialog";
import employee_icon from "../assets/icons/employee_data.png";
import {
  FIELDS,
  HEADER_GROUPS,
  HEADER_LIST,
  transformHeadersToFields,
} from "../components/dashboard/payslips/dataUpload/payslipsDataUploadPanelFields";
import { allEmployeesPanelDetails } from "../store/slices/apiSlices/employees/panelApiSlice";
import { useDispatch } from "react-redux";
import { FS } from "../components/dashboard/employee/onboarding/validations";

const PayslipsUpload = ({ open, setOpen, payslipsData, handleOpen }) => {
  const dispatch = useDispatch();
  return (
    open && (
      <CsvUploadDialog
        name="Payslips"
        title={"Step 3: Upload Payslips Data"}
        description="Start by uploading your employee data. If you're unsure,
  download our template to guide you"
        label={"employee_details"}
        headerImage={employee_icon}
        module={"payslips"}
        templateData={[HEADER_LIST]}
        headerGroups={HEADER_GROUPS}
        fields={FIELDS}
        validations={FS}
        preProcessing={transformHeadersToFields}
        setOpen={setOpen}
        open={open}
        handleOpen={handleOpen}
        employeesData={payslipsData}
        onToastDismiss={() => {
          dispatch(
            allEmployeesPanelDetails.util.invalidateTags([
              "AllEmployeesPanelDetails",
            ])
          );
        }}
        note="Quick Tip: Always ensure your data is up-to-date and accurate. It helps in ensuring seamless processing and payouts."
      />
    )
  );
};

export default PayslipsUpload;
