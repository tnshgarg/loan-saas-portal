import {
  noValidation,
  requiredValidation,
} from "../../employee/onboarding/validations";

const REQUIRED_SUFFIX = " (Required)";
const FIELD_GROUPS = {
  PERSISTENT: "Persistent",
  DAY_CALC: `Day's Calculation`,
  EMPLOYMENT: "Employment",
  SAL_BREAKUP: "Salary Breakup",
  EARNED_SAL: "Earned",
  ARREARS_SAL: "Arrears",
  DEDUCTIONS: "Deductions",
  DEFAULT: "Payments",
  ADDITIONS: "Additions",
};
const FG = FIELD_GROUPS;
// FIELDS are order Sensitive
export const FIELDS = [
  {
    header: "Emp ID",
    field: "EmpID",
    validations: requiredValidation,
    required: true,
    prefetch: "employeeId",
    group: FG.PERSISTENT,
  },
  {
    header: "Employee Name",
    field: "EmployeeName",
    validations: requiredValidation,
    required: true,
    prefetch: "name",
    group: FG.PERSISTENT,
  },
  {
    header: "Mobile Number",
    field: "MobileNumber",
    validations: requiredValidation,
    required: true,
    prefetch: "mobile",
    group: FG.PERSISTENT,
  },
  {
    header: "Employment Type",
    field: "EmploymentType",
    validations: requiredValidation,
    required: true,
    group: FG.EMPLOYMENT,
  },
  {
    header: "Client Name",
    field: "ClientName",
    validations: requiredValidation,
    required: true,
    group: FG.EMPLOYMENT,
  },
  {
    header: "Month",
    field: "Month",
    validations: requiredValidation,
    required: true,
    group: FG.EMPLOYMENT,
  },
  {
    header: "Designation",
    field: "Designation",
    validations: requiredValidation,
    required: true,
    prefetch: "title",
    group: FG.EMPLOYMENT,
  },
  {
    header: "Department",
    field: "Department",
    validations: requiredValidation,
    required: true,
    group: FG.EMPLOYMENT,
  },
  {
    header: "City",
    field: "City",
    validations: requiredValidation,
    required: true,
    group: FG.EMPLOYMENT,
  },
  {
    header: "State",
    field: "State",
    validations: requiredValidation,
    required: true,
    group: FG.EMPLOYMENT,
  },
  {
    header: "Annual CTC",
    field: "AnnualCTC",
    validations: noValidation,
    required: false,
    group: FG.SAL_BREAKUP,
  },
  {
    header: "Monthly CTC",
    field: "MonthlyCTC",
    validations: requiredValidation,
    required: true,
    group: FG.SAL_BREAKUP,
  },
  {
    header: "Basic",
    field: "Basic",
    validations: noValidation,
    required: false,
    group: FG.SAL_BREAKUP,
  },
  {
    header: "HRA",
    field: "HRA",
    validations: noValidation,
    required: false,
    group: FG.SAL_BREAKUP,
  },
  {
    header: "Special",
    field: "Special",
    validations: noValidation,
    required: false,
    group: FG.SAL_BREAKUP,
  },
  {
    header: "Statutory Bonus",
    field: "StatutoryBonus",
    validations: noValidation,
    required: false,
    group: FG.SAL_BREAKUP,
  },
  {
    header: "Gross Earnings",
    field: "GrossEarnings",
    validations: noValidation,
    required: false,
    group: FG.SAL_BREAKUP,
  },
  {
    header: "Employer PF",
    field: "EmployerPF",
    validations: noValidation,
    required: false,
    group: FG.SAL_BREAKUP,
  },
  {
    header: "Employer ESI",
    field: "EmployerESI",
    validations: noValidation,
    required: false,
    group: FG.SAL_BREAKUP,
  },
  {
    header: "LWF Employer",
    field: "LWFEmployer",
    validations: noValidation,
    required: false,
    group: FG.SAL_BREAKUP,
  },
  {
    header: "CTC",
    field: "BreakUpCTC",
    validations: noValidation,
    required: false,
    group: FG.SAL_BREAKUP,
  },
  {
    header: "Employee PF",
    field: "EmployeePF",
    validations: noValidation,
    required: false,
    group: FG.SAL_BREAKUP,
  },
  {
    header: "Employee ESI",
    field: "EmployeeESI",
    validations: noValidation,
    required: false,
    group: FG.SAL_BREAKUP,
  },
  {
    header: "Professional Tax",
    field: "ProfessionalTax",
    validations: noValidation,
    required: false,
    group: FG.SAL_BREAKUP,
  },
  {
    header: "LWF Employee",
    field: "LWFEmployee",
    validations: noValidation,
    required: false,
    group: FG.SAL_BREAKUP,
  },
  {
    header: "Total Deductions",
    field: "TotalDeductions",
    validations: noValidation,
    required: false,
    group: FG.SAL_BREAKUP,
  },
  {
    header: "Net Inhand",
    field: "NetInhand",
    validations: noValidation,
    required: false,
    group: FG.SAL_BREAKUP,
  },
  {
    header: "Month Days",
    field: "MonthDays",
    validations: requiredValidation,
    required: true,
    group: FG.DAY_CALC,
  },
  {
    header: "Earned Days",
    field: "EarnedDays",
    validations: requiredValidation,
    required: true,
    group: FG.DAY_CALC,
  },
  {
    header: "Arrear Calender Days",
    field: "ArrearCalenderDays",
    validations: requiredValidation,
    required: true,
    group: FG.DAY_CALC,
  },
  {
    header: "Arrear Days",
    field: "ArrearDays",
    validations: requiredValidation,
    required: true,
    group: FG.DAY_CALC,
  },
  {
    header: "Notice Pay Days",
    field: "NoticePayDays",
    validations: requiredValidation,
    required: true,
    group: FG.DAY_CALC,
  },
  {
    header: "Notice Recovery Days",
    field: "NoticeRecoveryDays",
    validations: requiredValidation,
    required: true,
    group: FG.DAY_CALC,
  },
  {
    header: "Leave Encashment Days",
    field: "LeaveEncashmentDays",
    validations: requiredValidation,
    required: true,
    group: FG.DAY_CALC,
  },
  {
    header: "LOP reversals Days",
    field: "LOPreversalsDays",
    validations: requiredValidation,
    required: true,
    group: FG.DAY_CALC,
  },
  {
    header: "Holiday Pay Days",
    field: "HolidayPayDays",
    validations: requiredValidation,
    required: true,
    group: FG.DAY_CALC,
  },
  {
    header: "Severance Pay Days",
    field: "SeverancePayDays",
    validations: requiredValidation,
    required: true,
    group: FG.DAY_CALC,
  },
  {
    header: "Earned Basic",
    field: "EarnedBasic",
    validations: noValidation,
    required: false,
    group: FG.EARNED_SAL,
  },
  {
    header: "Earned HRA",
    field: "EarnedHRA",
    validations: noValidation,
    required: false,
    group: FG.EARNED_SAL,
  },
  {
    header: "Earned Special",
    field: "EarnedSpecial",
    validations: noValidation,
    required: false,
    group: FG.EARNED_SAL,
  },
  {
    header: "Earned Bonus",
    field: "EarnedBonus",
    validations: noValidation,
    required: false,
    group: FG.EARNED_SAL,
  },
  {
    header: "Travelling Allownace",
    field: "TravellingAllownace",
    validations: noValidation,
    required: false,
    group: FG.EARNED_SAL,
  },
  {
    header: "Daily Allowance",
    field: "DailyAllowance",
    validations: noValidation,
    required: false,
    group: FG.EARNED_SAL,
  },
  {
    header: "Incentives",
    field: "Incentives",
    validations: noValidation,
    required: false,
    group: FG.EARNED_SAL,
  },
  {
    header: "Night Shift Allownace",
    field: "NightShiftAllownace",
    validations: noValidation,
    required: false,
    group: FG.EARNED_SAL,
  },
  {
    header: "Holiday Pay",
    field: "HolidayPay",
    validations: noValidation,
    required: false,
    group: FG.EARNED_SAL,
  },
  {
    header: "Overtime Allowance",
    field: "OvertimeAllowance",
    validations: noValidation,
    required: false,
    group: FG.EARNED_SAL,
  },
  {
    header: "Gross Monthly (1)",
    field: "GrossMonthly",
    validations: noValidation,
    required: false,
    group: FG.EARNED_SAL,
  },
  {
    header: "Arrear Basic",
    field: "ArrearBasic",
    validations: noValidation,
    required: false,
    group: FG.ARREARS_SAL,
  },
  {
    header: "Arrear HRA",
    field: "ArrearHRA",
    validations: noValidation,
    required: false,
    group: FG.ARREARS_SAL,
  },
  {
    header: "Arrear Special",
    field: "ArrearSpecial",
    validations: noValidation,
    required: false,
    group: FG.ARREARS_SAL,
  },
  {
    header: "Arrear Statutory Bonus",
    field: "ArrearStatutoryBonus",
    validations: noValidation,
    required: false,
    group: FG.ARREARS_SAL,
  },
  {
    header: "Gross Arrear (2)",
    field: "GrossArrear",
    validations: noValidation,
    required: false,
    group: FG.ARREARS_SAL,
  },
  {
    header: "Total Gross Earned (3)=(1)+ (2)",
    field: "TotalGrossEarned",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Employer PF",
    field: "EarnedEmployerPF",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Arrear Employer PF",
    field: "ArrearEmployerPF",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Employer ESI",
    field: "EarnedEmployerESI",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Arrear Employer ESI",
    field: "ArrearEmployerESI",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "LWF Employer",
    field: "ArrearsLWFEmployer",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Total Employer Contributions (4)",
    field: "TotalEmployerContributions",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Employee PF Arrear",
    field: "EmployeePFArrear",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Employee PF",
    field: "EarnedEmployeePF",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Employee ESI",
    field: "EarnedEmployeeESI",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Arrear Employee ESI",
    field: "ArrearEmployeeESI",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Employee LWF",
    field: "EarnedEmployeeLWF",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Professional Tax",
    field: "EarnedProfessionalTax",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Total ER Contributions (5)",
    field: "TotalERContributions",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "TDS (6)",
    field: "TDS",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Meal Debit",
    field: "MealDebit",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Uniform Debit",
    field: "UniformDebit",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Notice Period Deduction",
    field: "NoticePeriodDeduction",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Recoveries (7)",
    field: "Recoveries",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Total Deductions (8)=(5)+(6)+(7)",
    field: "MonthTotalDeductions",
    validations: noValidation,
    required: false,
    group: FG.DEDUCTIONS,
  },
  {
    header: "Other Allowance",
    field: "OtherAllowance",
    validations: noValidation,
    required: false,
    group: FG.ADDITIONS,
  },
  {
    header: "LOP Reversals",
    field: "LOPReversals",
    validations: noValidation,
    required: false,
    group: FG.ADDITIONS,
  },
  {
    header: "Notice Pay",
    field: "NoticePay",
    validations: noValidation,
    required: false,
    group: FG.ADDITIONS,
  },
  {
    header: "Leave Encashment",
    field: "LeaveEncashment",
    validations: noValidation,
    required: false,
    group: FG.ADDITIONS,
  },
  {
    header: "Severance Pay",
    field: "SeverancePay",
    validations: noValidation,
    required: false,
    group: FG.ADDITIONS,
  },
  {
    header: "Reimbursements",
    field: "Reimbursements",
    validations: noValidation,
    required: false,
    group: FG.ADDITIONS,
  },
  {
    header: "Referral Bonus",
    field: "ReferralBonus",
    validations: noValidation,
    required: false,
    group: FG.ADDITIONS,
  },
  {
    header: "Total Additions (9)",
    field: "TotalAdditions",
    validations: noValidation,
    required: false,
    group: FG.ADDITIONS,
  },
  {
    header: "In-Hand Salary (8)+(9)",
    field: "InHandSalary",
    validations: noValidation,
    required: false,
    group: FG.PERSISTENT,
  },
  {
    header: "CTC (3)+(4)+(9)",
    field: "FinalCTC",
    validations: noValidation,
    required: false,
    group: FG.PERSISTENT,
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
export const HEADER_GROUPS = FIELDS.reduce((groups, column) => {
  if (!column.group || column.group === FG.PERSISTENT) {
    groups.push({ ...column, Header: column.header, accessor: column.field });
    return groups;
  }
  let header_group = groups.find((group) => group.Header === column.group);
  if (!header_group) {
    header_group = {
      Header: column.group,
      columns: [],
    };
    groups.push(header_group);
  }
  header_group.columns.push({
    ...column,
    Header: column.header,
    accessor: column.field,
  });
  return groups;
}, []);

export const TEMPLATE_FIELDS = FIELDS;

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
