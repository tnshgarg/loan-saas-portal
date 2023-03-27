import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { DateDropdown } from "../payouts/info/DateDropdown";
import { Spacer } from "../../../atomic/atoms/layouts/alignment";
import { Button, Intent, NonIdealState, ProgressBar } from "@blueprintjs/core";
import { Dashlet } from "../../../atomic/molecules/dashlets/dashlet";
import { useState } from "react";
import { useGetDisbursementsQuery } from "../../../store/slices/apiSlices/employer/ewaApiSlice";
import BrowserTable from "../../../atomic/organisms/browserTable";
import { initBrowserTable } from "../../../store/slices/csvUploadSlice.ts";
import { MultiLineCell } from "../../../atomic/organisms/browserTable/cells";
import { getExcel } from "../../../utils/excelHandling";

function mapStateToProps(state) {
  return {
    employerId: state.auth.user?.attributes.sub || "",
  };
}

const DISBURSEMENT_FIELDS = [
  {
    header: "Employee Id",
    field: "employeeId",
  },
  {
    header: "Principal Employer",
    field: "principalEmployer",
  },
  {
    header: "Employee Name",
    field: "name",
  },
  {
    header: "Account Number",
    field: "bankAccountNumber",
  },
  {
    header: "Availed At",
    field: "availedAt",
  },
  {
    header: "Loan Amount",
    field: "loanAmount",
  },
  {
    header: "Due Date",
    field: "dueDate",
  },
  {
    header: "Status",
    field: "loanStatus",
  },
  {
    header: "Disbursement Date",
    field: "disbursedAt",
  },
  {
    header: "Pending Amount",
    field: "pendingAmount",
  },{
    header: "Total Paid Amount",
    field: "paidAmount",
  },{
    header: "Paid Amount",
    field: "payoutAmount",
  },{
    header: "Payment Status",
    field: "payoutStatus",
  },{
    header: "Payment Time",
    field: "payoutDate",
  },{
    header: "Payment Mode",
    field: "transferMode",
  }
].map((column) => ({
  ...column,
  Header: column.header,
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
    mutableItem.pendingAmount = mutableItem.loanAmount - (mutableItem.paidAmount || 0);
    mutableItem.status = {};
    return mutableItem;
  });
  if (safeDisbursements.length) {
    dispatch(
      initBrowserTable({
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
  const downloadExcel = () => {
    getExcel(
      [{headers: DISBURSEMENT_FIELDS}],
      safeDisbursements
    );
  }
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
            <Spacer />
            <Button
              icon={"download"}
              intent={Intent.SUCCESS}
              onClick={downloadExcel}
            >
              Download Excel
            </Button>
          </>
        }
      >
        {isLoading || isFetching ? (
          <div style={{ padding: "3em" }}>
            <ProgressBar animate stripes />
          </div>
        ) : disbursements && disbursements.length ? (
          <BrowserTable
            key={"ewa-info"}
            tableName={key}
            module={DISBURSEMENTS_MODULE}
            disableEdits={true}
            customCells={{
              "transferMode": MultiLineCell,
              "payoutDate": MultiLineCell,
              "payoutAmount": MultiLineCell,
              "payoutStatus": MultiLineCell,
            }}
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
