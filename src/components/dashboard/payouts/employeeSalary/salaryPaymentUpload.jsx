import {
  FIELDS,
  ONE_CLICK_HEADERS,
  ONE_CLICK_PAYMENTS_HEADER_MAP,
} from "./employeeSalaryFields";
import { connect } from "react-redux";
import { CSVUploadDashlet } from "../../../../atomic/organisms/csvUploads/CSVUploadDashlet";
import { useGetAllEmployeesByEmployerIdQuery } from "../../../../store/slices/apiSlices/employees/employeesApiSlice";
import { buildRowMapper, buildTemplate } from "../util";

const ONE_DAY = 24 * 60 * 60 * 1000;

function getYesterdayDate() {
  let yeterday = new Date(Date.now() - ONE_DAY);
  return {
    year: yeterday.getFullYear().toString(),
    month: yeterday.getMonth().toString().padStart(2, "0"),
  };
}

const headerMapper = buildRowMapper(ONE_CLICK_PAYMENTS_HEADER_MAP, "");

function _EmployeeSalaryPayments({ employerId }) {
  // techdebt: fetches on render, can lead to unnecessary API calls
  const { data, error, isLoading } =
    useGetAllEmployeesByEmployerIdQuery(employerId);
  if (error) console.error(error);
  const employeesData = data?.body ?? [];
  const templateData = buildTemplate(FIELDS, employeesData, getYesterdayDate());
  return (
    <>
      <CSVUploadDashlet
        title={"Employee Salary"}
        module={"payout"}
        templateDownloadProps={{ loading: isLoading, templateData }}
        fields={ONE_CLICK_HEADERS}
        preProcessing={headerMapper}
        onToastDismiss={() => {
          // attendence dispatch
          // dispatch(
          //   allEmployeesBasicDetails.util.invalidateTags([
          //     "AllEmployeesBasicDetails",
          //   ])
          // );
        }}
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    employerId: state.auth.user?.attributes.sub,
  };
}

export const EmployeeSalaryPayments = connect(mapStateToProps)(
  _EmployeeSalaryPayments
);
