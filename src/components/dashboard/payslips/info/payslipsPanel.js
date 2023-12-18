import {
  ArrowUpTrayIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import TableLayout from "../../../../layout/TableLayout.jsx";
import PayslipsUpload from "../../../../newComponents/PayslipsUpload.jsx";
import PrimaryButton from "../../../../newComponents/PrimaryButton";
import { useGetPayslipsQuery } from "../../../../store/slices/apiSlices/employer/payslipsApiSlice";
import { initBrowserTable } from "../../../../store/slices/browserTableSlice.ts";
import { getExcel } from "../../../../utils/excelHandling";
import { DateDropdown } from "../../payouts/info/DateDropdown";
import { PAYSLIPS_TABLE_FIELDS } from "./tableColumns";

function mapStateToProps(state) {
  return {
    employerId: state.auth.user?.attributes.sub || "",
  };
}

const PAYSLIPS_MODULE = "payslips";
const _PayslipsPanel = ({ employerId, dispatch }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    setOpen(true);
  };
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
  console.log("payslips data:", data?.body);
  const TABLE_HEADERS = [
    { label: "Emp ID", value: "employerEmployeeId" },
    { label: "Name", value: "name" },
    { label: "Take Home Salary", value: "ewa" },
    { label: "Deductions", value: "totalPresentDays" },
    { label: "Gross Pay", value: "totalHalfDays" },
    { label: "Action", value: "totalHolidays" },
  ];
  const [filteredData, setFilteredData] = useState(data?.body);

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
        <DateDropdown />
        <div className="flex-row flex items-center justify-between">
          <PrimaryButton
            title={"Upload Salary Slip"}
            color="primary"
            size={"sm"}
            onClick={() => setOpen(true)}
            leftIcon={ArrowUpTrayIcon}
          />
          <PrimaryButton
            title={"Send Salary Slip"}
            color="secondary"
            size={"sm"}
            className={"ml-0"}
            leftIcon={PaperAirplaneIcon}
          />
        </div>
      </div>

      <TableLayout
        mainData={data?.body}
        rowData={filteredData}
        setRowData={setFilteredData}
        tableHeaders={TABLE_HEADERS}
      />
      <PayslipsUpload
        setOpen={setOpen}
        handleOpen={handleOpen}
        open={open}
        payslipsData={data?.body}
      />
    </div>
  );
};
export const PayslipsPanel = connect(mapStateToProps)(_PayslipsPanel);
