import { Button, Intent, NonIdealState, ProgressBar } from "@blueprintjs/core";
import { faRectangleList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Spacer } from "../../../../atomic/atoms/layouts/alignment";
import { Dashlet } from "../../../../atomic/molecules/dashlets/dashlet";
import BrowserTable from "../../../../atomic/organisms/browserTable";
import { useGetPayslipsQuery } from "../../../../store/slices/apiSlices/employer/payslipsApiSlice";
import { initBrowserTable } from "../../../../store/slices/browserTableSlice.ts";
import { getExcel } from "../../../../utils/excelHandling";
import { DateDropdown } from "../../payouts/info/DateDropdown";
import { PAYSLIPS_TABLE_FIELDS } from "./tableColumns";
import PrimaryButton from "../../../../newComponents/PrimaryButton";
import { Option, Select } from "@material-tailwind/react";
import AttendanceTable from "../../../../newComponents/AttendanceTable";
import TextInput from "../../../../newComponents/TextInput";
import PayslipTable from "../../../../newComponents/PayslipTable.jsx";
import DropdownInput from "../../../../newComponents/DropdownInput";

function mapStateToProps(state) {
  return {
    employerId: state.auth.user?.attributes.sub || "",
  };
}

const PAYSLIPS_MODULE = "payslips";
const _PayslipsPanel = ({ employerId, dispatch }) => {
  const today = new Date();
  const [{ year, month }, setDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });

  const dateChanged = (updatedDate) => {
    setDate(updatedDate);
    // dataRefetch();
  };

  const key = `payslips-info-historical-${year}-${month}`;
  const { data, isLoading, refetch, isFetching } = useGetPayslipsQuery({
    id: employerId,
    year: year,
    month: month,
  });
  const [safePayslips, setSafePayslips] = useState([]);

  useEffect(() => {
    const payslipsCurrent = data?.body ?? [];
    const safePayslipsCurrent = payslipsCurrent.map((item) => {
      const mutableItem = Object.assign({}, item);
      return mutableItem;
    });
    console.log(safePayslipsCurrent);
    setSafePayslips(safePayslipsCurrent);
    if (safePayslipsCurrent.length) {
      dispatch(
        initBrowserTable({
          data: safePayslipsCurrent,
          fields: PAYSLIPS_TABLE_FIELDS,
          fileName: key,
          module: PAYSLIPS_MODULE,
        })
      );
    }
  }, [data]);

  const dataRefetch = () => {
    refetch();
  };
  const downloadExcel = () => {
    getExcel([{ headers: PAYSLIPS_TABLE_FIELDS }], safePayslips);
  };

  console.log("mounting payslip panel", year, month, isLoading, isFetching);

  return (
    <div className="mt-4">
      {/* <Dashlet
        icon={<FontAwesomeIcon icon={faRectangleList} />}
        title={"Payslips"}
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
        ) : safePayslips && safePayslips.length ? (
          <BrowserTable
            key={"payslips-info"}
            tableName={key}
            module={PAYSLIPS_MODULE}
            disableEdits={true}
          />
        ) : (
          <>
            <br />
            <NonIdealState
              icon={"property"}
              title={"No Payslips"}
              description={<>Looks like no payslips were uploaded this month</>}
              layout={"horizontal"}
            />
          </>
        )}
      </Dashlet> */}

      <div className="w-full flex-row flex items-center justify-between">
        <DropdownInput />
        <div className="flex-row flex items-center justify-between">
          <PrimaryButton title={"Send Salary Slip"} color="secondary" />
        </div>
      </div>
      <div className="w-full flex-row flex items-center justify-between">
        <TextInput label="Search for an employee" />
        <PrimaryButton
          title={"Filter"}
          color="secondary"
          variant={"outlined"}
        />
      </div>
      <PayslipTable />
    </div>
  );
};
export const PayslipsPanel = connect(mapStateToProps)(_PayslipsPanel);
