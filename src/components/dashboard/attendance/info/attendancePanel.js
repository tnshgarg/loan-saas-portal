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
import { CsvUploadDialog } from "../../../../newComponents/CsvUploadDialog.jsx";
import {
  HEADER_GROUPS,
  HEADER_LIST,
  transformHeadersToFields,
} from "../dataUpload/attendanceDataUploadPanelFields.js";

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
          />
        </div>
      </div>
      <div className="w-full flex-row flex items-center justify-between">
        <SearchInput label="Search for an employee" />
        <PrimaryButton
          title={"Filter"}
          color={"secondary"}
          variant={"outlined"}
          size={"sm"}
        />
        <PrimaryButton
          title={"Download"}
          color={"secondary"}
          variant={"outlined"}
          size={"sm"}
        />
      </div>
      <AttendanceTable />
      <CsvUploadDialog
        name="Attendance"
        title={"Step 2: Upload Your Employee CSV File"}
        description="By uploading the attendance data, you empower your employees to avail of their on-demand salary benefits via the Unipe App"
        label={"employee_details"}
        headerImage="https://cdn1.iconfinder.com/data/icons/business-startup-48/64/1078-512.png"
        module={ATTENDANCE_MODULE}
        dateDropDown={{ exists: true, onChange: dateChanged }}
        templateData={[HEADER_LIST]}
        fields={HEADER_GROUPS}
        preProcessing={transformHeadersToFields}
        setOpen={setOpen}
        open={open}
        handleOpen={handleOpen}
        employeesData={data?.body}
        // onToastDismiss={() => {
        //   dispatch(
        //     allEmployeesPanelDetails.util.invalidateTags([
        //       "AllEmployeesPanelDetails",
        //     ])
        //   );
        // }}
      />
    </div>
  );
};
export const AttendancePanel = connect(mapStateToProps)(_AttendancePanel);
