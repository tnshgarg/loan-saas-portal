import React from "react";
import { useDispatch, useSelector } from "react-redux";
import employee_icon from "../assets/icons/employee_data.png";
import { FS } from "../components/dashboard/employee/onboarding/validations";
import {
  FIELDS,
  HEADER_GROUPS,
  transformHeadersToFields,
} from "../components/dashboard/payslips/dataUpload/payslipsDataUploadPanelFields";
import { buildTemplate } from "../components/dashboard/payslips/util";
import {
  allEmployeesPanelDetails,
  useGetAllEmployeesPanelByEmployerIdQuery,
} from "../store/slices/apiSlices/employees/panelApiSlice";
import { CsvUploadDialog } from "./CsvUploadDialog";

const ONE_DAY = 24 * 60 * 60 * 1000;

const getDefaultValues = () => {
  const yesterday = new Date(Date.now() - ONE_DAY);
  const padZero = (value) => value.toString().padStart(2, "0");

  return {
    year: yesterday.getFullYear().toString(),
    month: padZero(yesterday.getMonth() + 1),
    remarks: `salary for ${yesterday.toISOString().substring(0, 7)}`,
  };
};

const PayslipsUpload = ({ open, setOpen, payslipsData, handleOpen }) => {
  const dispatch = useDispatch();
  const employerId = useSelector(({ auth }) => auth.user?.attributes.sub);
  const { data, error, isLoading } =
    useGetAllEmployeesPanelByEmployerIdQuery(employerId);
  const employeesData = data?.body ?? [];

  console.log({ FIELDS });

  const salaryTemplateData = buildTemplate(
    FIELDS,
    employeesData,
    getDefaultValues()
  );

  console.log({ salaryTemplateData });

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
        templateData={salaryTemplateData}
        headerGroups={HEADER_GROUPS}
        fields={FIELDS}
        validations={FS}
        preProcessing={transformHeadersToFields}
        setOpen={setOpen}
        open={open}
        handleOpen={handleOpen}
        employeesData={payslipsData ?? []}
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
