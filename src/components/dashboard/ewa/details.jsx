import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { DateDropdown } from "../payroll/info/DateDropdown";
import { Spacer } from "../../../atomic/atoms/layouts/alignment";
import { Button, NonIdealState, ProgressBar } from "@blueprintjs/core";
import { Dashlet } from "../../../atomic/molecules/dashlets/dashlet";
import { useState } from "react";
import { useGetDisbursementsQuery } from "../../../store/slices/apiSlices/employer/ewaApiSlice";
import BrowserEdiTable from "../../../atomic/organisms/csvUploads/BrowserEdiTable";
import { initCSVUpload } from "../../../store/slices/csvUploadSlice.ts";
import { noValidation } from "../employee/onboarding/validations";
import { REQUIRED_SUFFIX } from "../payroll/util";

function mapStateToProps(state) {
  return {
    employerId: state.auth.user?.attributes.sub || "",
  };
}

const DISBURSEMENT_FIELDS = [
  {
    header: "Employee Id",
    field: "employerEmployeeId",
    validations: noValidation,
  },
  {
    header: "Employee Name",
    field: "name",
    validations: noValidation,
  },
  {
    header: "Account Number",
    field: "bankAccountNumber",
    validations: noValidation,
  },
  {
    header: "Created At",
    field: "createdAt",
    validations: noValidation,
  },
  {
    header: "Loan Amount",
    field: "loanAmount",
    validations: noValidation,
  },
  {
    header: "Due Date",
    field: "dueDate",
    validations: noValidation,
  },
  {
    header: "Status",
    field: "loanStatus",
    validations: noValidation,
  },
].map((column) => ({
  ...column,
  Header: column.header.replace(REQUIRED_SUFFIX, ""),
  accessor: column.field,
}));

const DISBURSEMENTS_MODULE = "disbursements";
const _Disbursements = ({ employerId, dispatch }) => {
  const today = new Date();
  const [{ year, month }, setDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });

  const dateChanged = (updatedDate) => {
    setDate(updatedDate);
    // dataRefetch();
  };

  const key = `disbursements-info-historical-${year}-${month}`;
  const { data, isLoading, refetch, isFetching } = useGetDisbursementsQuery({
    id: employerId,
    year: year,
    month: month,
  });

  const disbursements = data?.body ?? [];
  console.log(disbursements);
  const safeDisbursements = disbursements.map((item) => {
    const mutableItem = Object.assign({}, item);
    mutableItem.loanStatus = mutableItem.status;
    delete mutableItem.status;
    mutableItem.status = {};
    return mutableItem;
  });
  if (safeDisbursements.length) {
    dispatch(
      initCSVUpload({
        data: safeDisbursements,
        fields: DISBURSEMENT_FIELDS,
        fileName: key,
        module: DISBURSEMENTS_MODULE,
      })
    );
  }
  const dataRefetch = () => {
    refetch();
  };
  return (
    <>
      <Dashlet
        icon={<FontAwesomeIcon icon={faWallet} />}
        title={"Disbursements"}
        actions={
          <>
            <DateDropdown onChange={dateChanged} />
            <Spacer />
            <Button icon={"refresh"} loading={false} onClick={dataRefetch}>
              Refresh data
            </Button>
          </>
        }
      >
        {isLoading || isFetching ? (
          <div style={{ padding: "3em" }}>
            <ProgressBar animate stripes />
          </div>
        ) : disbursements && disbursements.length ? (
          <BrowserEdiTable
            key={"ewa-info"}
            tableName={key}
            module={DISBURSEMENTS_MODULE}
            disableEdits={true}
          />
        ) : (
          <>
            <br />
            <NonIdealState
              icon={"property"}
              title={"No Disbursements"}
              description={
                <>Looks like no disbursements were made this month</>
              }
              layout={"horizontal"}
            />
          </>
        )}
      </Dashlet>
    </>
  );
};
export const Disbursements = connect(mapStateToProps)(_Disbursements);
