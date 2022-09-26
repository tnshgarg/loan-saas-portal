import { noValidation } from "../../employee/onboarding/validations";

const REQUIRED_SUFFIX = " (Required)";
const FIELD_GROUPS = {
  daysCalculation: `Day's Calculation`,
};
const FG = FIELD_GROUPS;
// FIELDS are order Sensitive
export const FIELDS = [
  {
    header: "Emp ID",
    field: "EmpID",
    validations: noValidation,
    required: true,
    prefetch: "employeeId",
  },
  {
    header: "Employment Type",
    field: "EmploymentType",
    validations: noValidation,
    required: true,
  },
  {
    header: "Client Name",
    field: "ClientName",
    validations: noValidation,
    required: true,
  },
  {
    header: "Month",
    field: "Month",
    validations: noValidation,
    required: true,
  },
  {
    header: "Employee Name",
    field: "EmployeeName",
    validations: noValidation,
    required: true,
    prefetch: "name",
  },
  {
    header: "Mobile Number",
    field: "MobileNumber",
    validations: noValidation,
    required: true,
    prefetch: "mobile",
  },
  {
    header: "Designation",
    field: "Designation",
    validations: noValidation,
    required: true,
    prefetch: "title",
  },
  {
    header: "Department",
    field: "Department",
    validations: noValidation,
    required: true,
  },
  { header: "City", field: "City", validations: noValidation, required: true },
  {
    header: "State",
    field: "State",
    validations: noValidation,
    required: true,
  },
  {
    header: "Annual CTC",
    field: "AnnualCTC",
    validations: noValidation,
    required: false,
  },
  {
    header: "Monthly CTC",
    field: "MonthlyCTC",
    validations: noValidation,
    required: true,
  },
  {
    header: "Basic",
    field: "Basic",
    validations: noValidation,
    required: false,
  },
  { header: "HRA", field: "HRA", validations: noValidation, required: false },
  {
    header: "Special",
    field: "Special",
    validations: noValidation,
    required: false,
  },
  {
    header: "Statutory Bonus",
    field: "StatutoryBonus",
    validations: noValidation,
    required: false,
  },
  {
    header: "Gross Earnings",
    field: "GrossEarnings",
    validations: noValidation,
    required: false,
  },
  {
    header: "Employer PF",
    field: "EmployerPF",
    validations: noValidation,
    required: false,
  },
  {
    header: "Employer ESI",
    field: "EmployerESI",
    validations: noValidation,
    required: false,
  },
  {
    header: "LWF Employer",
    field: "LWFEmployer",
    validations: noValidation,
    required: false,
  },
  {
    header: "CTC",
    field: "BreakUpCTC",
    validations: noValidation,
    required: false,
  },
  {
    header: "Employee PF",
    field: "EmployeePF",
    validations: noValidation,
    required: false,
  },
  {
    header: "Employee ESI",
    field: "EmployeeESI",
    validations: noValidation,
    required: false,
  },
  {
    header: "Professional Tax",
    field: "ProfessionalTax",
    validations: noValidation,
    required: false,
  },
  {
    header: "LWF Employee",
    field: "LWFEmployee",
    validations: noValidation,
    required: false,
  },
  {
    header: "Total Deductions",
    field: "TotalDeductions",
    validations: noValidation,
    required: false,
  },
  {
    header: "Net Inhand",
    field: "NetInhand",
    validations: noValidation,
    required: false,
  },
  {
    header: "Month Days",
    field: "MonthDays",
    validations: noValidation,
    required: true,
  },
  {
    header: "Earned Days",
    field: "EarnedDays",
    validations: noValidation,
    required: true,
  },
  {
    header: "Arrear Calender Days",
    field: "ArrearCalenderDays",
    validations: noValidation,
    required: true,
  },
  {
    header: "Arrear Days",
    field: "ArrearDays",
    validations: noValidation,
    required: true,
  },
  {
    header: "Notice Pay Days",
    field: "NoticePayDays",
    validations: noValidation,
    required: true,
  },
  {
    header: "Notice Recovery Days",
    field: "NoticeRecoveryDays",
    validations: noValidation,
    required: true,
  },
  {
    header: "Leave Encashment Days",
    field: "LeaveEncashmentDays",
    validations: noValidation,
    required: true,
  },
  {
    header: "LOP reversals Days",
    field: "LOPreversalsDays",
    validations: noValidation,
    required: true,
  },
  {
    header: "Holiday Pay Days",
    field: "HolidayPayDays",
    validations: noValidation,
    required: true,
  },
  {
    header: "Severance Pay Days",
    field: "SeverancePayDays",
    validations: noValidation,
    required: true,
  },
  {
    header: "Earned Basic",
    field: "EarnedBasic",
    validations: noValidation,
    required: false,
  },
  {
    header: "Earned HRA",
    field: "EarnedHRA",
    validations: noValidation,
    required: false,
  },
  {
    header: "Earned Special",
    field: "EarnedSpecial",
    validations: noValidation,
    required: false,
  },
  {
    header: "Earned Bonus",
    field: "EarnedBonus",
    validations: noValidation,
    required: false,
  },
  {
    header: "Travelling Allownace",
    field: "TravellingAllownace",
    validations: noValidation,
    required: false,
  },
  {
    header: "Daily Allowance",
    field: "DailyAllowance",
    validations: noValidation,
    required: false,
  },
  {
    header: "Incentives",
    field: "Incentives",
    validations: noValidation,
    required: false,
  },
  {
    header: "Night Shift Allownace",
    field: "NightShiftAllownace",
    validations: noValidation,
    required: false,
  },
  {
    header: "Holiday Pay",
    field: "HolidayPay",
    validations: noValidation,
    required: false,
  },
  {
    header: "Overtime Allowance",
    field: "OvertimeAllowance",
    validations: noValidation,
    required: false,
  },
  {
    header: "Gross Monthly (1)",
    field: "GrossMonthly",
    validations: noValidation,
    required: false,
  },
  {
    header: "Arrear Basic",
    field: "ArrearBasic",
    validations: noValidation,
    required: false,
  },
  {
    header: "Arrear HRA",
    field: "ArrearHRA",
    validations: noValidation,
    required: false,
  },
  {
    header: "Arrear Special",
    field: "ArrearSpecial",
    validations: noValidation,
    required: false,
  },
  {
    header: "Arrear Statutory Bonus",
    field: "ArrearStatutoryBonus",
    validations: noValidation,
    required: false,
  },
  {
    header: "Gross Arrear (2)",
    field: "GrossArrear",
    validations: noValidation,
    required: false,
  },
  {
    header: "Total Gross Earned (3)=(1)+ (2)",
    field: "TotalGrossEarned",
    validations: noValidation,
    required: false,
  },
  {
    header: "Employer PF",
    field: "EmployerPF",
    validations: noValidation,
    required: false,
  },
  {
    header: "Arrear Employer PF",
    field: "ArrearEmployerPF",
    validations: noValidation,
    required: false,
  },
  {
    header: "Employer ESI",
    field: "EmployerESI",
    validations: noValidation,
    required: false,
  },
  {
    header: "Arrear Employer ESI",
    field: "ArrearEmployerESI",
    validations: noValidation,
    required: false,
  },
  {
    header: "LWF Employer",
    field: "LWFEmployer",
    validations: noValidation,
    required: false,
  },
  {
    header: "Total Employer Contributions (4)",
    field: "TotalEmployerContributions",
    validations: noValidation,
    required: false,
  },
  {
    header: "Employee PF Arrear",
    field: "EmployeePFArrear",
    validations: noValidation,
    required: false,
  },
  {
    header: "Employee PF",
    field: "EmployeePF",
    validations: noValidation,
    required: false,
  },
  {
    header: "Employee ESI",
    field: "EmployeeESI",
    validations: noValidation,
    required: false,
  },
  {
    header: "Arrear Employer ESI",
    field: "ArrearEmployerESI",
    validations: noValidation,
    required: false,
  },
  {
    header: "Employee LWF",
    field: "EmployeeLWF",
    validations: noValidation,
    required: false,
  },
  {
    header: "Professional Tax",
    field: "ProfessionalTax",
    validations: noValidation,
    required: false,
  },
  {
    header: "Total ER Contributions (5)",
    field: "TotalERContributions",
    validations: noValidation,
    required: false,
  },
  {
    header: "TDS (6)",
    field: "TDS",
    validations: noValidation,
    required: false,
  },
  {
    header: "Meal Debit",
    field: "MealDebit",
    validations: noValidation,
    required: false,
  },
  {
    header: "Uniform Debit",
    field: "UniformDebit",
    validations: noValidation,
    required: false,
  },
  {
    header: "Notice Period Deduction",
    field: "NoticePeriodDeduction",
    validations: noValidation,
    required: false,
  },
  {
    header: "Recoveries (7)",
    field: "Recoveries",
    validations: noValidation,
    required: false,
  },
  {
    header: "Total Deductions (8)=(5)+(6)+(7)",
    field: "TotalDeductions",
    validations: noValidation,
    required: false,
  },
  {
    header: "Other Allowance",
    field: "OtherAllowance",
    validations: noValidation,
    required: false,
  },
  {
    header: "LOP Reversals",
    field: "LOPReversals",
    validations: noValidation,
    required: false,
  },
  {
    header: "Notice Pay",
    field: "NoticePay",
    validations: noValidation,
    required: false,
  },
  {
    header: "Leave Encashment",
    field: "LeaveEncashment",
    validations: noValidation,
    required: false,
  },
  {
    header: "Severance Pay",
    field: "SeverancePay",
    validations: noValidation,
    required: false,
  },
  {
    header: "Reimbursements",
    field: "Reimbursements",
    validations: noValidation,
    required: false,
  },
  {
    header: "Referral Bonus",
    field: "ReferralBonus",
    validations: noValidation,
    required: false,
  },
  {
    header: "Total Additions (9)",
    field: "TotalAdditions",
    validations: noValidation,
    required: false,
  },
  {
    header: "In-Hand Salary (8)+(9)",
    field: "InHandSalary",
    validations: noValidation,
    required: false,
  },
  {
    header: "CTC (3)+(4)+(9)",
    field: "FinalCTC",
    validations: noValidation,
    required: false,
  },
];

export const HEADERS_MAP = FIELDS.reduce((map, column) => {
  map[column.header] = column;
  return map;
}, {});

export const FIELD_MAP = FIELDS.reduce((map, column) => {
  map[column.field] = column;
  return map;
}, {});

/**
 * HEADER_GROUPS is a react-table feature, which allows creating of column groups
 */
export const HEADER_GROUPS = FIELDS.map((column) => ({
  ...column,
  Header: column.header,
  accessor: column.field,
}));

export const TEMPLATE_FIELDS = FIELDS.filter((column) => column.required);

export function transformHeadersToFields(list) {
  return list.map((item) => {
    return Object.entries(HEADERS_MAP).reduce(
      (transformedObject, [header, column]) => {
        header = header.replace(REQUIRED_SUFFIX, "").trim();
        console.log(header);
        transformedObject[column.field] = item[header];
        return transformedObject;
      },
      {}
    );
  });
}
