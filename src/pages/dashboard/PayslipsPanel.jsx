import {
  ArrowUpTrayIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateDropdown from "../../components/dashboard/payouts/info/DateDropdown.jsx";
import { PAYSLIPS_TABLE_FIELDS } from "../../components/dashboard/payslips/info/tableColumns.js";
import TableLayout from "../../layout/TableLayout.jsx";
import PayslipsUpload from "../../newComponents/PayslipsUpload.jsx";
import PrimaryButton from "../../newComponents/PrimaryButton.jsx";
import { useGetPayslipsQuery } from "../../store/slices/apiSlices/employer/payslipsApiSlice.js";
import { getExcel } from "../../utils/excelHandling.js";

const PayslipsPanel = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const employerId = useSelector(
    (state) => state.auth.user?.attributes.sub || ""
  );
  const today = new Date();
  const [{ year, month }, setDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });

  const dateChanged = (updatedDate) => {
    setDate(updatedDate);
  };

  const key = `payslips-info-historical-${year}-${month}`;
  const { data, isLoading, refetch, isFetching } = useGetPayslipsQuery({
    id: employerId,
    year: year,
    month: month,
  });

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
    const safePayslipsCurrent = payslipsCurrent.map((item) => ({ ...item }));
    console.log("safePayslipsCurrent", safePayslipsCurrent);
    setSafePayslips(safePayslipsCurrent);
  }, [data]);

  const dataRefetch = () => {
    refetch();
  };

  const downloadExcel = () => {
    getExcel([{ headers: PAYSLIPS_TABLE_FIELDS }], safePayslips);
  };

  return (
    <div className="mt-4">
      <div className="w-full flex-row flex items-center justify-between">
        <DateDropdown onChange={dateChanged} />
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
        rowData={safePayslips}
        setRowData={setFilteredData}
        tableHeaders={TABLE_HEADERS}
      />
      <PayslipsUpload
        setOpen={setOpen}
        handleOpen={() => setOpen(true)}
        open={open}
        payslipsData={data?.body}
      />
    </div>
  );
};

export default PayslipsPanel;
