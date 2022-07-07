export const employeeFieldsToTabsMap = {
  Profile: {
    category: "profile",
    fields: {
      name: "Name",
      mobile: "Mobile Number",
      altMobile: "Alternate Mobile Number",
      email: "Email",
      gender: "Gender (M/F/T)",
      nationality: "Nationality",
      dob: "Date of Birth (dd/mm/yyyy)",
      maritalStatus:
        "Marital Status (Married, Un-married, Widow/Widower, Divorcee)",
    },
  },
  Employment: {
    category: "employment",
    fields: {
      employeeId: "Employee ID",
      doj: "Date of Joining (dd/mm/yyyy)",
      prEmpName: "Name of Principal Employer",
      title: "Job Title",
      bUnit: "Business Unit (Optional)",
      aCTC: "Annual CTC",
      doe: "Date of Exit (dd/mm/yyyy)",
    },
  },
  // "Government Ids":{
  //   category:"governmentIds",
  //   fields:{

  //   }
  // }
  "Bank Details": {
    category: "bankDetails",
    fields: {
      accountNumber: "Bank Account Number",
      ifsc: "Bank IFSC Code",
    },
  },
  EPFO: {
    category: "epfo",
    fields: {
      UAN: "PF UAN (Enter if available else leave blank)",
    },
  },
  ESIC: {
    category: "esic",
    fields: {
      estCode: "Employer Establishment Code (Username for ESIC Login)",
      IPNumber:
        "ESIC Number (aka IP Number) (Enter if available else leave blank)",
    },
  },
  // "Family Details": [
  //   "Father's / Husband's Name",
  //   "Relation with Employee (Father/Husband)",
  //   "Name of Nominee (As per Aadhaar card)",
  //   "Nominee Relationship with Employee",
  // ],
  // Addresses: [
  //   "Employee Present Address",
  //   "Employee Present Address District",
  //   "Employee Present Address State",
  //   "Employee Present Address Pincode",

  //   "Employee Permanent Address",
  //   "Employee Permanent Address District",
  //   "Employee Permanent Address State",
  //   "Employee Permanent Address Pincode",

  //   "Nominee Address",
  //   "Nominee Address District",
  //   "Nominee Address State",
  //   "Nominee Address Pincode",
  // ],
};
