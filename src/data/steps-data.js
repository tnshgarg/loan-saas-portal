import { HEADER_LIST as ATTENDANCE_HEADER_LIST } from "../components/dashboard/attendance/dataUpload/attendanceDataUploadPanelFields";
import { HEADER_LIST as EMPLOYEE_HEADER_LIST } from "../components/dashboard/employee/onboarding/fields";

import attendance_icon from "../assets/icons/attendance.png";
import employee_icon from "../assets/icons/employee_data.png";

export const stepsData = [
  {
    headerImage: employee_icon,
    header: "Welcome to Unipe",
    subHeader:
      "Kickstart your journey with us. Just a few simple steps, and your employees will be onboarded in no time.",
    stepTitle: "Step 1: Import Your Employee Data",
    stepSubtitle:
      "Start by uploading your employee data. If you're unsure, download our template to guide you",
    btnName: "Employees",
    note: "Quick Tip: Always ensure your data is up-to-date and accurate. It helps in ensuring seamless processing and payouts.",
    templateData: [EMPLOYEE_HEADER_LIST],
  },
  {
    headerImage: attendance_icon,
    header: "Ready to Offer Advance Salaries?",
    subHeader:
      "Kickstart your journey with us. Just a few simple steps, and your employees will be onboarded in no time.",
    stepTitle: "Step 2: Upload Employee Attendance Data",
    stepSubtitle:
      "By uploading the attendance data, you empower your employees to avail of their on-demand salary benefits via the Unipe App",
    btnName: "Attendance",
    note: "Reminder: Uploading accurate attendance data ensures your employees enjoy uninterrupted access to Unipe's advance salary feature.",
    templateData: [ATTENDANCE_HEADER_LIST],
  },
];
