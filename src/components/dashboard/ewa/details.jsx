import { Button, Intent, NonIdealState, ProgressBar } from "@blueprintjs/core";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Spacer } from "../../../atomic/atoms/layouts/alignment";
import { Dashlet } from "../../../atomic/molecules/dashlets/dashlet";
import BrowserTable from "../../../atomic/organisms/browserTable";
import { MultiLineCell } from "../../../atomic/organisms/browserTable/cells";
import { useGetDisbursementsQuery } from "../../../store/slices/apiSlices/employer/ewaApiSlice";
import { initBrowserTable } from "../../../store/slices/browserTableSlice.ts";
import { getExcel } from "../../../utils/excelHandling";
import { DateDropdown } from "../payouts/info/DateDropdown";

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
  },
  {
    header: "Total Paid Amount",
    field: "paidAmount",
  },
  {
    header: "Paid Amount",
    field: "payoutAmount",
  },
  {
    header: "Payment Status",
    field: "payoutStatus",
  },
  {
    header: "Payment Time",
    field: "payoutDate",
  },
  {
    header: "Payment Mode",
    field: "transferMode",
  },
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
  const [safeDisbursements, setSafeDisbursements] = useState([]);

  useEffect(() => {
    const disbursementsCurrent = data?.body ?? [];
    console.log(disbursementsCurrent);
    const safeDisbursementsCurrent = disbursementsCurrent.map((item) => {
      const mutableItem = Object.assign({}, item);
      mutableItem.loanStatus = mutableItem.status;
      mutableItem.pendingAmount =
        mutableItem.loanAmount - (mutableItem.paidAmount || 0);
      mutableItem.status = {};
      return mutableItem;
    });
    setSafeDisbursements(safeDisbursementsCurrent);
    if (safeDisbursementsCurrent.length) {
      dispatch(
        initBrowserTable({
          data: safeDisbursementsCurrent,
          fields: DISBURSEMENT_FIELDS,
          fileName: key,
          module: DISBURSEMENTS_MODULE,
        })
      );
    }
  }, [data]);

  const dataRefetch = () => {
    refetch();
  };
  const downloadExcel = () => {
    getExcel([{ headers: DISBURSEMENT_FIELDS }], safeDisbursements);
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
        ) : safeDisbursements && safeDisbursements.length ? (
          <BrowserTable
            key={"ewa-info"}
            tableName={key}
            module={DISBURSEMENTS_MODULE}
            disableEdits={true}
            customCells={{
              transferMode: MultiLineCell,
              payoutDate: MultiLineCell,
              payoutAmount: MultiLineCell,
              payoutStatus: MultiLineCell,
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
