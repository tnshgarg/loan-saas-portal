import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateDropdown from "../../components/dashboard/payouts/info/DateDropdown.jsx";
import TableLayout from "../../layout/TableLayout.jsx";
import AttendanceUpload from "../../newComponents/AttendanceUpload.jsx";
import PrimaryButton from "../../newComponents/PrimaryButton.jsx";
import { useGetAttendanceQuery } from "../../store/slices/apiSlices/employer/attendanceApiSlice.js";
import { getExcel } from "../../utils/excelHandling.js";

const ATTENDANCE_MODULE = "attendance";

const AttendancePanel = () => {
  const today = new Date();
  const [open, setOpen] = useState(false);
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

  const employerId = useSelector(
    (state) => state.auth.user?.attributes.sub || ""
  );
  const dispatch = useDispatch();

  const { data, isLoading, refetch, isFetching } = useGetAttendanceQuery({
    id: employerId,
    year: year,
    month: month,
  });
  const [safeAttendance, setSafeAttendance] = useState([]);

  useEffect(() => {
    const attendanceCurrent = data?.body || [];
    const safeAttendanceCurrent = attendanceCurrent.map((item) => ({
      ...item,
    }));
    setSafeAttendance(safeAttendanceCurrent);
  }, [data]);

  const dateChanged = (updatedDate) => {
    setDate(updatedDate);
  };

  const dataRefetch = () => {
    refetch();
  };

  const downloadExcel = () => {
    getExcel([{ headers: TABLE_HEADERS }], safeAttendance);
  };

  return (
    <div className="mt-4">
      <div className="w-full flex-row flex items-center justify-between">
        <DateDropdown onChange={dateChanged} />
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
        rowData={safeAttendance}
        setRowData={setSafeAttendance}
        tableHeaders={TABLE_HEADERS}
      />
      <AttendanceUpload
        setOpen={setOpen}
        handleOpen={() => setOpen(true)}
        open={open}
        attendanceData={data?.body}
        dateChanged={dateChanged}
        year={year}
        month={month}
      />
    </div>
  );
};

export default AttendancePanel;
