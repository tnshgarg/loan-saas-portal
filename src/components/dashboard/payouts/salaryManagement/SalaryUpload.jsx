import { connect } from "react-redux";
import { CSVUploadDashlet } from "../../../../atomic/organisms/csvUploads/CSVUploadDashlet";
import { useGetAllEmployeesPanelByEmployerIdQuery } from "../../../../store/slices/apiSlices/employees/panelApiSlice";
import { buildRowMapper } from "../util";
import { HEADERS_MAP, HEADER_GROUPS, TEMPLATE_FIELDS } from "./fields";

function buildTemplate(employeesData) {
  const headers = TEMPLATE_FIELDS.map((field) => field.header);
  const rows = employeesData.map((employee) =>
    TEMPLATE_FIELDS.map((field) =>
      field.prefetch && employee[field.prefetch]
        ? employee[field.prefetch].toString()
        : ""
    )
  );
  console.table([headers, ...rows]);
  return [headers, ...rows];
}

function _PayrollUpload({ employerId }) {
  // techdebt: fetches on render, can lead to unnecessary API calls
  const { data, error, isLoading } =
    useGetAllEmployeesPanelByEmployerIdQuery(employerId);
  if (error) console.log(error);
  const employeesData = data?.body ?? [];
  const templateData = buildTemplate(employeesData);
  console.log(templateData);
  return (
    <CSVUploadDashlet
      title={"Payroll"}
      module={"payroll"}
      templateDownloadProps={{ loading: isLoading, templateData }}
      fields={HEADER_GROUPS}
      preProcessing={buildRowMapper(HEADERS_MAP)}
      onToastDismiss={() => {
        // attendence dispatch
        // dispatch(
        //   allEmployeesBasicDetails.util.invalidateTags([
        //     "AllEmployeesBasicDetails",
        //   ])
        // );
      }}
    ></CSVUploadDashlet>
  );
}

function mapStateToProps(state) {
  return {
    employerId: state.auth.user?.attributes.sub,
  };
}

export const SalaryUpload = connect(mapStateToProps)(_PayrollUpload);
