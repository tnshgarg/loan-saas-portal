import {
  FIELDS,
  ONE_CLICK_HEADERS,
  ONE_CLICK_PAYMENTS_HEADER_MAP,
} from "./payoutFields";
import { connect } from "react-redux";
import { CSVUploadDashlet } from "../../../../atomic/organisms/csvUploads/CSVUploadDashlet";
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

function _OneClickPayouts({ employerId }) {
  // techdebt: fetches on render, can lead to unnecessary API calls

  const templateData = buildTemplate(FIELDS, [], getYesterdayDate());
  console.log(employerId, templateData);
  return (
    <>
      <CSVUploadDashlet
        title={"One Click Payouts"}
        module={"payout"}
        templateDownloadProps={{ templateData }}
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

export const OneClickPayouts = connect(mapStateToProps)(_OneClickPayouts);
