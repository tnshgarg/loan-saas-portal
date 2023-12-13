import { Button, Intent, NonIdealState, ProgressBar } from "@blueprintjs/core";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Spacer } from "../../../../atomic/atoms/layouts/alignment";
import { Dashlet } from "../../../../atomic/molecules/dashlets/dashlet";
import BrowserTable from "../../../../atomic/organisms/browserTable";
import { useGetAttendanceQuery } from "../../../../store/slices/apiSlices/employer/attendanceApiSlice";
import { initBrowserTable } from "../../../../store/slices/browserTableSlice.ts";
import { getExcel } from "../../../../utils/excelHandling";
import { DateDropdown } from "../../payouts/info/DateDropdown";
import { ATTENDANCE_TABLE_FIELDS } from "./tableColumns";
import { Option, Select, Typography } from "@material-tailwind/react";
import PrimaryButton from "../../../../newComponents/PrimaryButton";
import AttendanceTable from "../../../../newComponents/AttendanceTable";
import DropdownInput from "../../../../newComponents/DropdownInput";
import SearchInput from "../../../../newComponents/SearchInput.jsx";
import {
  HEADER_GROUPS,
  HEADER_LIST,
  transformHeadersToFields,
} from "../dataUpload/attendanceDataUploadPanelFields.js";
import AttendanceUpload from "../../../../newComponents/AttendanceUpload.jsx";
import TableLayout from "../../../../layout/TableLayout.jsx";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

function mapStateToProps(state) {
  return {
    employerId: state.auth.user?.attributes.sub || "",
  };
}

const ATTENDANCE_MODULE = "attendance";
const _AttendancePanel = ({ employerId, dispatch }) => {
  const today = new Date();
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    setOpen(true);
  };
  const [{ year, month }, setDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });

  const TABLE_HEADERS = [
    { label: "Emp ID", value: "employerEmployeeId" },
    { label: "Name", value: "name" },
    { label: "EWA", value: "ewa" },
    { label: "Present", value: "totalPresentDays" },
    { label: "Half Day", value: "totalHalfDays" },
    { label: "Paid Holidays", value: "totalHolidays" },
  ];

  console.log("date", year, month);

  const dateChanged = (updatedDate) => {
    setDate(updatedDate);
    // dataRefetch();
  };

  const key = `attendance-info-historical-${year}-${month}`;
  const { data, isLoading, refetch, isFetching } = useGetAttendanceQuery({
    id: employerId,
    year: year,
    month: month,
  });
  const [filteredData, setFilteredData] = useState(data?.body);

  console.log("attendance res:", data?.body);

  const [safeAttendance, setSafeAttendance] = useState([]);

  useEffect(() => {
    const attendanceCurrent = data?.body ?? [];
    const safeAttendanceCurrent = attendanceCurrent.map((item) => {
      const mutableItem = Object.assign({}, item);
      return mutableItem;
    });
    console.log("safeAttendanceCurrent", safeAttendanceCurrent);
    setSafeAttendance(safeAttendanceCurrent);
    if (safeAttendanceCurrent.length) {
      dispatch(
        initBrowserTable({
          data: safeAttendanceCurrent,
          fields: ATTENDANCE_TABLE_FIELDS,
          fileName: key,
          module: ATTENDANCE_MODULE,
        })
      );
    }
  }, [data]);

  const dataRefetch = () => {
    refetch();
  };
  const downloadExcel = () => {
    getExcel([{ headers: ATTENDANCE_TABLE_FIELDS }], safeAttendance);
  };

  console.log("mounting attendance panel", year, month, isLoading, isFetching);

  return (
    <div className="mt-4">
      {/* <Dashlet
        icon={<FontAwesomeIcon icon={faCalendarDays} />}
        title={"Attendance"}
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
        ) : safeAttendance && safeAttendance.length ? (
          <BrowserTable
            key={"attendance-info"}
            tableName={key}
            module={ATTENDANCE_MODULE}
            disableEdits={true}
          />
        ) : (
          <>
            <br />
            <NonIdealState
              icon={"property"}
              title={"No Attendance"}
              description={
                <>Looks like no attendance were uploaded this month</>
              }
              layout={"horizontal"}
            />
          </>
        )}
      </Dashlet> */}
      <div className="w-full flex-row flex items-center justify-between">
        {/* <DropdownInput /> */}
        <DateDropdown />
        <div className="flex-row flex items-center justify-between">
          <PrimaryButton
            title={"Upload attendance data"}
            color={"secondary"}
            size={"sm"}
            onClick={() => setOpen(true)}
            leftIcon={ArrowUpTrayIcon}
          />
        </div>
      </div>

      <TableLayout
        mainData={data?.body}
        rowData={filteredData}
        setRowData={setFilteredData}
        tableHeaders={TABLE_HEADERS}
      />
      <AttendanceUpload
        setOpen={setOpen}
        handleOpen={handleOpen}
        open={open}
        attendanceData={data?.body}
        dateChanged={dateChanged}
        year={year}
        month={month}
      />
    </div>
  );
};
export const AttendancePanel = connect(mapStateToProps)(_AttendancePanel);
