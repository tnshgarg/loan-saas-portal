import React from "react";
import { useDispatch } from "react-redux";
import employee_icon from "../assets/icons/employee_data.png";
import { FIELDS } from "../components/dashboard/employee/bulkUpdates/bulkUpdatesFields";
import { FS } from "../components/dashboard/employee/onboarding/validations";
import { buildTemplate } from "../components/dashboard/payouts/util";
import { allEmployeesPanelDetails } from "../store/slices/apiSlices/employees/panelApiSlice";
import { CsvUploadDialog } from "./CsvUploadDialog";

const BulkUpload = ({ open, setOpen, employeesData, handleOpen }) => {
  // const HEADERS = BULK_UPDATES_HEADER_MAP.filter((item) => returnitem.header)
  const templateData = buildTemplate(FIELDS, employeesData);

  const dispatch = useDispatch();
  return (
    open && (
      <CsvUploadDialog
        name="Employees"
        title={"Bulk Updates"}
        description="Start by uploading your employee data. If you're unsure,
  download our template to guide you"
        label={"employee_details"}
        headerImage={employee_icon}
        module={"employment"}
        templateData={templateData}
        // headerGroups={HEADER_GROUPS}
        fields={FIELDS}
        validations={FS}
        // preProcessing={transformHeadersToFields}
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
        //note="Quick Tip: Always ensure your data is up-to-date and accurate. It helps in ensuring seamless processing and payouts."
      />
    )
  );
};

export default BulkUpload;
