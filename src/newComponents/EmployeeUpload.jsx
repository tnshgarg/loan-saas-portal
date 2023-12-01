import React from "react";
import { CsvUploadDialog } from "./CsvUploadDialog";
import employee_icon from "../assets/icons/employee_data.png";
import {
  FIELDS,
  HEADER_GROUPS,
  HEADER_LIST,
  transformHeadersToFields,
} from "../components/dashboard/employee/onboarding/fields";
import { allEmployeesPanelDetails } from "../store/slices/apiSlices/employees/panelApiSlice";
import { useDispatch } from "react-redux";
import { FS } from "../components/dashboard/employee/onboarding/validations";

const EmployeeUpload = ({ open, setOpen, employeesData, handleOpen }) => {
  const dispatch = useDispatch();
  return (
    open && (
      <CsvUploadDialog
        name="Employees"
        title={"Step 1: Import Your Employee Data"}
        description="Start by uploading your employee data. If you're unsure,
  download our template to guide you"
        label={"employee_details"}
        headerImage={employee_icon}
        module={"onboarding"}
        templateData={[HEADER_LIST]}
        headerGroups={HEADER_GROUPS}
        fields={FIELDS}
        validations={FS}
        preProcessing={transformHeadersToFields}
        setOpen={setOpen}
        open={open}
        handleOpen={handleOpen}
        employeesData={employeesData}
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

export default EmployeeUpload;
