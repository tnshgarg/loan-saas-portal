import {
  FIELDS,
  ONE_CLICK_HEADERS,
  ONE_CLICK_PAYMENTS_HEADER_MAP,
} from "./paymentFields";
import { connect } from "react-redux";
import { CSVUploadDashlet } from "../../../../atomic/organisms/csvUploads/CSVUploadDashlet";
import { useGetAllEmployeesByEmployerIdQuery } from "../../../../store/slices/apiSlices/employees/employeesApiSlice";
import { buildRowMapper, buildTemplate } from "../util";
import { Dashlet } from "../../../../atomic/molecules/dashlets/dashlet";
import { useGetAwaitingPayrollQuery } from "../../../../store/slices/apiSlices/employer/payrollApiSlice";

const ONE_DAY = 24 * 60 * 60 * 1000;

function getYesterdayDate() {
  let yeterday = new Date(Date.now() - ONE_DAY);
  return {
    year: yeterday.getFullYear().toString(),
    month: yeterday.getMonth().toString().padStart(2, "0"),
  };
}

const headerMapper = buildRowMapper(ONE_CLICK_PAYMENTS_HEADER_MAP, "");

function _OneClickPayments({ employerId, dispatch }) {
  // techdebt: fetches on render, can lead to unnecessary API calls
  const { data, error, isLoading } =
    useGetAllEmployeesByEmployerIdQuery(employerId);

  const {
    data: d,
    error: e,
    isLoading: il,
  } = useGetAwaitingPayrollQuery(employerId);
  console.log({ d, e, il });
  const employeesData = data?.body ?? [];
  const templateData = buildTemplate(FIELDS, employeesData, getYesterdayDate());
  return (
    <>
      <CSVUploadDashlet
        title={"Payroll"}
        module={"payroll"}
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
      {/*<Dashlet title={"Payments"}></Dashlet>*/}
    </>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    employerId: state.auth.user?.attributes.sub,
  };
}

export const OneClickPayments = connect(mapStateToProps)(_OneClickPayments);
