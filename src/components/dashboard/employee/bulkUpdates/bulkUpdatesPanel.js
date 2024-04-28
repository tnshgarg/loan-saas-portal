import { connect } from "react-redux";
import { CSVUploadDashlet } from "../../../../atomic/organisms/csvUploads/CSVUploadDashlet";
import { useGetAllEmployeesEmploymentByEmployerIdQuery } from "../../../../store/slices/apiSlices/employees/employmentApiSlice";
import { buildRowMapper, buildTemplate } from "../../payouts/util";
import {
  BULK_UPDATES_HEADERS,
  BULK_UPDATES_HEADER_MAP,
  FIELDS,
} from "./bulkUpdatesFields";

const headerMapper = buildRowMapper(BULK_UPDATES_HEADER_MAP, "");

function _EmployeesBulkUpdatesPanel({ employerId }) {
  // techdebt: fetches on render, can lead to unnecessary API calls
  const { data, error, isLoading, isSuccess } =
    useGetAllEmployeesEmploymentByEmployerIdQuery(employerId);
  if (error) console.error(error);
  const employeesData = data?.body ?? [];
  let templateData = [];
  if (isSuccess) {
    templateData = buildTemplate(FIELDS, employeesData);
  }
  return (
    <>
      <CSVUploadDashlet
        title={"Bulk Updates"}
        module={"employment"}
        templateDownloadProps={{ loading: isLoading, templateData }}
        fields={BULK_UPDATES_HEADERS}
        preProcessing={headerMapper}
        onToastDismiss={() => {}}
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    employerId: state.auth.user?.attributes.sub,
  };
}

export const EmployeesBulkUpdatesPanel = connect(mapStateToProps)(
  _EmployeesBulkUpdatesPanel
);
