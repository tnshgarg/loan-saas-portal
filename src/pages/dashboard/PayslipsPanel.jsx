import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  EyeIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateDropdown from "../../components/dashboard/payouts/info/DateDropdown.jsx";
import { PAYSLIPS_TABLE_FIELDS } from "../../components/dashboard/payslips/info/tableColumns.js";
import TableLayout from "../../layout/TableLayout.jsx";
import PayslipsUpload from "../../newComponents/PayslipsUpload.jsx";
import PrimaryButton from "../../newComponents/PrimaryButton.jsx";
import SendPayslipsDialog from "../../newComponents/SendPayslipsDialog.jsx";
import ViewDetailsDialog from "../../newComponents/ViewDetailsDialog.jsx";
import {
  useGetPayslipsQuery,
  useSendPayslipsMutation,
} from "../../store/slices/apiSlices/employer/payslipsApiSlice.js";
import { getExcel } from "../../utils/excelHandling.js";

const PayslipsPanel = () => {
  const [open, setOpen] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [viewDetailsDialog, setViewDetailsDialog] = useState(true);
  const dispatch = useDispatch();

  const employerId = useSelector(
    (state) => state.auth.user?.attributes.sub || ""
  );
  const today = new Date();
  const [{ year, month }, setDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });

  const key = `payslips-info-historical-${year}-${month}`;
  const { data, isLoading, refetch, isFetching } = useGetPayslipsQuery({
    id: employerId,
    year: year,
    month: month,
  });

  console.log("Payslips Data:", data?.body);

  const dateChanged = (updatedDate) => {
    setDate(updatedDate);
    refetch();
  };

  const [sendPayslipsMutation, { isLoading: isSending }] =
    useSendPayslipsMutation();

  const TABLE_HEADERS = [
    { label: "Emp ID", value: "employerEmployeeId" },
    { label: "Name", value: "name" },
    { label: "Take Home Salary", value: "netPayPostTax" },
    { label: "Deductions", value: "deductions" },
    { label: "Gross Pay", value: "totalEarnings" },
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
            onClick={() => setOpenConfirmationDialog(true)}
          />
        </div>
      </div>

      <TableLayout
        mainData={data?.body}
        rowData={safePayslips}
        setRowData={setFilteredData}
        tableHeaders={TABLE_HEADERS}
        renderActionItems={(item, index) => (
          <div className="flex flex-row items-center">
            {item?.documents?.url ? (
              <a
                href={item?.documents?.url}
                target="_blank"
                className="hover:bg-blue-gray-50 cursor-pointer rounded-md p-2"
                onClick={() => {}}
              >
                <ArrowDownTrayIcon width={18} height={18} />
              </a>
            ) : (
              <a
                href={"#"}
                className="rounded-md p-2 cursor-not-allowed"
                onClick={() => {}}
              >
                <ArrowDownTrayIcon
                  className="cursor-not-allowed"
                  width={18}
                  height={18}
                  color="lightgray"
                />
              </a>
            )}
            <div
              className="hover:bg-blue-gray-50 cursor-pointer rounded-md p-2"
              onClick={() => {
                setViewDetailsDialog(true);
              }}
            >
              <EyeIcon width={18} height={18} />
            </div>
            <ViewDetailsDialog
              open={viewDetailsDialog}
              setOpen={setViewDetailsDialog}
              data={item}
            />
          </div>
        )}
      />
      <PayslipsUpload
        setOpen={setOpen}
        handleOpen={() => setOpen(true)}
        open={open}
        payslipsData={data?.body}
      />

      <SendPayslipsDialog
        open={openConfirmationDialog}
        setOpen={setOpenConfirmationDialog}
        payslipsData={data?.body}
      />
    </div>
  );
};

export default PayslipsPanel;
