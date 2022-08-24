import {
  HEADER_GROUPS,
  TEMPLATE_FIELDS,
  transformHeadersToFields,
} from "./fields";
import { connect } from "react-redux";
import { CSVUploadDashlet } from "../../../../atomic/organisms/csvUploads/CSVUploadDashlet";
import { useGetAllEmployeesByEmployerIdQuery } from "../../../../store/slices/apiSlices/employees/employeesApiSlice";

function buildTemplate(employeesData) {
  const headers = TEMPLATE_FIELDS.map((field) => field.header);
  const rows = employeesData.map((employee) =>
    TEMPLATE_FIELDS.map((field) =>
      field.prefetch ? employee[field.prefetch].toString() : ""
    )
  );
  console.table([headers, ...rows]);
  return [headers, ...rows];
}
function _PayrollUpload({ employerId, dispatch }) {
  // techdebt: fetches on render, can lead to unnecessary API calls
  const { data, error, isLoading } =
    useGetAllEmployeesByEmployerIdQuery(employerId);
  const employeesData = data?.body ?? [];
  const templateData = buildTemplate(employeesData);
  console.log(templateData);
  return (
    <CSVUploadDashlet
      title={"Payroll"}
      label={"payroll"}
      templateDownloadProps={{ loading: isLoading, templateData }}
      fields={HEADER_GROUPS}
      preProcessing={transformHeadersToFields}
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

function mapStateToProps(state, ownProps) {
  return {
    employerId: state.auth.user?.attributes.sub,
  };
}

export const PayrollUpload = connect(mapStateToProps)(_PayrollUpload);
