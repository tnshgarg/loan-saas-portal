import React from "react";
import { CsvUploadDialog } from "./CsvUploadDialog";
import employee_icon from "../assets/icons/employee_data.png";
import {
  HEADER_GROUPS,
  transformHeadersToFields,
} from "../components/dashboard/payslips/dataUpload/payslipsDataUploadPanelFields";
import {
  allEmployeesPanelDetails,
  useGetAllEmployeesPanelByEmployerIdQuery,
} from "../store/slices/apiSlices/employees/panelApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { FS } from "../components/dashboard/employee/onboarding/validations";
import {
  FIELDS,
  HEADER_LIST,
  ONE_CLICK_PAYMENTS_HEADER_MAP,
} from "../components/dashboard/payouts/employeeSalary/employeeSalaryFields";
import {
  buildRowMapper,
  buildTemplate,
} from "../components/dashboard/payouts/util";
const ONE_DAY = 24 * 60 * 60 * 1000;

function getDefaultValues() {
  let yesterday = new Date(Date.now() - ONE_DAY);
  return {
    year: yesterday.getFullYear().toString(),
    month: (yesterday.getMonth() + 1).toString().padStart(2, "0"),
    remarks: `salary for ${yesterday.toISOString().substring(0, 7)}`,
  };
}
const PayoutsUpload = ({ open, setOpen, payslipsData, handleOpen }) => {
  const employerId = useSelector((state) => state.auth.user?.attributes.sub);
  const { data, error, isLoading } =
    useGetAllEmployeesPanelByEmployerIdQuery(employerId);

  if (error) console.error(error);

  const employeesData = data?.body ?? [];
  const templateData = buildTemplate(FIELDS, employeesData, getDefaultValues());
  const headerMapper = buildRowMapper(ONE_CLICK_PAYMENTS_HEADER_MAP, "");
  const dispatch = useDispatch();

  return (
    open && (
      <CsvUploadDialog
        name="Payouts"
        title={"Upload Payouts Data"}
        description="Start by uploading your employee data. If you're unsure,
  download our template to guide you"
        label={"payout_details"}
        headerImage={employee_icon}
        module={"payout"}
        templateData={templateData}
        headerGroups={HEADER_GROUPS}
        fields={FIELDS}
        validations={FS}
        preProcessing={headerMapper}
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

export default PayoutsUpload;
