import React from "react";
import { useDispatch, useSelector } from "react-redux";
import employee_icon from "../assets/icons/employee_data.png";
import { FS } from "../components/dashboard/employee/onboarding/validations";
import {
  ONE_CLICK_PAYMENTS_HEADER_MAP as ONE_CLICK_SALARY_HEADER_MAP,
  FIELDS as SALARY_FIELDS,
} from "../components/dashboard/payouts/employeeSalary/employeeSalaryFields";
import { FIELDS as PAYMENTS_FIELDS } from "../components/dashboard/payouts/oneClickPayouts/payoutFields";
import {
  buildRowMapper,
  buildTemplate,
} from "../components/dashboard/payouts/util";
import { HEADER_GROUPS } from "../components/dashboard/payslips/dataUpload/payslipsDataUploadPanelFields";
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

function getYesterdayDate() {
  let yeterday = new Date(Date.now() - ONE_DAY);
  return {
    year: yeterday.getFullYear().toString(),
    month: yeterday.getMonth().toString().padStart(2, "0"),
  };
}

const PayoutsUpload = ({ open, setOpen, payslipsData, handleOpen, type }) => {
  const employerId = useSelector(({ auth }) => auth.user?.attributes.sub);
  const { data, error, isLoading } =
    useGetAllEmployeesPanelByEmployerIdQuery(employerId);

  if (error) console.error(error);

  const employeesData = data?.body ?? [];
  const paymentsTemplateData = buildTemplate(
    PAYMENTS_FIELDS,
    [],
    getYesterdayDate()
  );
  const salaryTemplateData = buildTemplate(
    SALARY_FIELDS,
    employeesData,
    getDefaultValues()
  );
  const headerMapper = buildRowMapper(ONE_CLICK_SALARY_HEADER_MAP, "");
  const dispatch = useDispatch();

  const handleToastDismiss = () => {
    dispatch(
      allEmployeesPanelDetails.util.invalidateTags(["AllEmployeesPanelDetails"])
    );
  };

  return (
    open && (
      <CsvUploadDialog
        name={type}
        title={`Upload ${type} Data`}
        description="Start by uploading your employee data. If you're unsure, download our template to guide you"
        label={"payout_details"}
        headerImage={employee_icon}
        module={"payout"}
        templateData={
          type == "Salary" ? salaryTemplateData : paymentsTemplateData
        }
        headerGroups={HEADER_GROUPS}
        fields={type == "Salary" ? SALARY_FIELDS : PAYMENTS_FIELDS}
        validations={FS}
        preProcessing={headerMapper}
        setOpen={setOpen}
        open={open}
        handleOpen={handleOpen}
        employeesData={payslipsData}
        onToastDismiss={handleToastDismiss}
        // note="Quick Tip: Always ensure your data is up-to-date and accurate. It helps in ensuring seamless processing and payouts."
      />
    )
  );
};

export default PayoutsUpload;
