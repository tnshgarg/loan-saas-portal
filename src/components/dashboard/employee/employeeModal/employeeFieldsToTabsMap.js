import { STATES_DISTRICTS } from "../../../../utils/statesAndDistricts";

export const employeeFieldsToTabsMap = {
  Profile: {
    category: "profile",
    fields: {
      employeeName: "Employee Name",
      mobile: "Mobile Number",
      altMobile: "Alternate Mobile Number",
      email: "Email",
      gender: "Gender (M/F/T)",
      nationality: "Nationality",
      dob: "Date of Birth (dd/mm/yyyy)",
      maritalStatus:
        "Marital Status (Married, Un-married, Widow/Widower, Divorcee)",
    },
    requiredFields: {},
    fieldPatterns: {},
    readOnlyFields: { mobile: true },
  },
  Employment: {
    category: "employment",
    fields: {
      employerEmployeeId: "Employee ID",
      doj: "Date of Joining (dd/mm/yyyy)",
      designation: "Designation",
      department: "Department",
      principalEmployer: "Principal Employer",
      aCTC: "Annual CTC",
      mInHandSalary: "Monthly Inhand Salary",
      doe: "Date of Exit (dd/mm/yyyy)",
    },
    requiredFields: {},
    fieldPatterns: {},
    readOnlyFields: {},
  },
  "Government Ids": {
    category: "governmentIds",
    hasSubTabs: true,
    inputTypes: {},
    types: {
      Aadhaar: "aadhaar",
      PAN: "pan",
    },
    fields: {
      Aadhaar: {
        number: "ID Number",
      },
      PAN: {
        number: "ID Number",
      },
    },
    requiredFields: {},
    fieldPatterns: {},
    readOnlyFields: {},
  },
  "Bank Details": {
    category: "bankDetails",
    fields: {
      accountNumber: "Bank Account Number",
      ifsc: "Bank IFSC Code",
    },
    requiredFields: { accountNumber: true },
    fieldPatterns: {
      accountNumber: /^[0-9]{9,18}$/,
      ifsc: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    },
    readOnlyFields: {},
  },
  EPFO: {
    category: "epfo",
    // TODO:complaince
    fields: {
      UAN: "PF UAN (Enter if available else leave blank)",
    },
    requiredFields: {},
    fieldPatterns: {},
    readOnlyFields: {},
  },
  ESIC: {
    category: "esic",
    fields: {
      estCode: "Employer Establishment Code (Username for ESIC Login)",
      IPNumber:
        "ESIC Number (aka IP Number) (Enter if available else leave blank)",
    },
    requiredFields: {},
    fieldPatterns: {},
    readOnlyFields: {},
  },
  // "Family Details": {
  //   category: "relatives",
  //   hasSubTabs: true,
  //   types: {
  //     "Father / Husband": "fh",
  //     Nominee: "nominee",
  //   },
  //   inputTypes: {
  //     "Father / Husband": {
  //       "Relation with Employee (Father/Husband)": {
  //         type: "dropdown",
  //         options: ["Father", "Husband"],
  //       },
  //     },
  //     Nominee: {
  //       "Nominee Relationship with Employee": {
  //         type: "dropdown",
  //         options: [
  //           "Spouse",
  //           "Minor dependant son",
  //           "Dependant unmarried daughter",
  //           "Dependant son receiving education",
  //           "Dependant infirm son",
  //           "Dependant infirm unmarried daughter",
  //           "Dependant father",
  //           "Dependant mother",
  //           "Brother",
  //           "Sister",
  //           "Others",
  //         ],
  //       },
  //     },
  //   },
  //   fields: {
  //     "Father / Husband": {
  //       name: "Father's / Husband's Name",
  //       relation: "Relation with Employee (Father/Husband)",
  //     },
  //     Nominee: {
  //       name: "Name of Nominee (As per Aadhaar card)",
  //       relation: "Nominee Relationship with Employee",
  //     },
  //   },
  //   requiredFields: {},
  //   fieldPatterns: {},
  //   readOnlyFields: {},
  // },
  Addresses: {
    category: "addresses",
    hasSubTabs: true,
    types: {
      Present: "present",
      Nominee: "nominee",
      Permanent: "permanent",
    },
    inputTypes: {
      Permanent: {
        "Employee Permanent Address State": {
          type: "dropdown",
          options: [...Object.keys(STATES_DISTRICTS)],
        },
        "Employee Permanent Address District": {
          type: "dropdown",
          dependentOn: "EmployeePermanentAddressState",
          options: STATES_DISTRICTS,
        },
      },
      Present: {
        "Employee Present Address State": {
          type: "dropdown",
          options: [...Object.keys(STATES_DISTRICTS)],
        },
        "Employee Present Address District": {
          type: "dropdown",
          dependentOn: "EmployeePresentAddressState",
          options: STATES_DISTRICTS,
        },
      },
      Nominee: {
        "Employee Nominee Address State": {
          type: "dropdown",
          options: [...Object.keys(STATES_DISTRICTS)],
        },
        "Employee Nominee Address District": {
          type: "dropdown",
          dependentOn: "EmployeeNomineeAddressState",
          options: STATES_DISTRICTS,
        },
      },
    },
    fields: {
      Permanent: {
        state: "Employee Permanent Address State",
        district: "Employee Permanent Address District",
        street: "Employee Permanent Address",
        pin: "Employee Permanent Address Pincode",
      },
      Present: {
        state: "Employee Present Address State",
        district: "Employee Present Address District",
        street: "Employee Present Address",
        pin: "Employee Present Address Pincode",
      },
      Nominee: {
        state: "Employee Nominee Address State",
        district: "Employee Nominee Address District",
        street: "Employee Nominee Address",
        pin: "Employee Nominee Address Pincode",
      },
    },
    requiredFields: {},
    fieldPatterns: {},
    readOnlyFields: {},
  },
};

export const newEmployeeFieldsToTabsMap = {
  "Employee Details": {
    category: "profile",
    fields: {
      employeeName: "Employee Name",
      mobile: "Mobile Number",
      altMobile: "Alternate Mobile Number",
      email: "Email",
      gender: "Gender",
      nationality: "Nationality",
      dob: "Date of Birth",
      maritalStatus: "Marital Status",
      qualification: "Education Qualification",
      motherName: "Mother's Name",
      fatherName: "Father's Name",
      address: "Permanent Address",
    },
    requiredFields: {},
    fieldPatterns: {},
    readOnlyFields: { mobile: true },
  },
  "Employment Details": {
    category: "employment",
    fields: {
      principalEmployer: "Principal Employer",
      employerEmployeeId: "Employee ID",
      doj: "Date of Joining",
      designation: "Designation",
      department: "Department",
      mInHandSalary: "Monthly Salary",
      aCTC: "Annual CTC",
      uan: "UAN Number",
      esic: "ESIC Number",

      // doe: "Date of Exit (dd/mm/yyyy)",
    },
    requiredFields: {},
    fieldPatterns: {},
    readOnlyFields: {},
  },
  "Govt ID": {
    category: "governmentIds",
    hasSubTabs: true,
    inputTypes: {},
    types: {
      Aadhaar: "aadhaar",
      PAN: "pan",
    },
    fields: {
      Aadhaar: {
        number: "ID Number",
      },
      PAN: {
        number: "ID Number",
      },
    },
    requiredFields: {},
    fieldPatterns: {},
    readOnlyFields: {},
  },
  "Bank Details": {
    category: "bankDetails",
    fields: {
      accountNumber: "Bank Account Number",
      ifsc: "Bank IFSC Code",
    },
    requiredFields: { accountNumber: true },
    fieldPatterns: {
      accountNumber: /^[0-9]{9,18}$/,
      ifsc: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    },
    readOnlyFields: {},
  },

  "Withdrawal Timeline": {
    category: "relatives",
    hasSubTabs: true,
    types: {
      "Father / Husband": "fh",
      Nominee: "nominee",
    },
    inputTypes: {
      "Father / Husband": {
        "Relation with Employee (Father/Husband)": {
          type: "dropdown",
          options: ["Father", "Husband"],
        },
      },
      Nominee: {
        "Nominee Relationship with Employee": {
          type: "dropdown",
          options: [
            "Spouse",
            "Minor dependant son",
            "Dependant unmarried daughter",
            "Dependant son receiving education",
            "Dependant infirm son",
            "Dependant infirm unmarried daughter",
            "Dependant father",
            "Dependant mother",
            "Brother",
            "Sister",
            "Others",
          ],
        },
      },
    },
    fields: {
      "Father / Husband": {
        name: "Father's / Husband's Name",
        relation: "Relation with Employee (Father/Husband)",
      },
      Nominee: {
        name: "Name of Nominee (As per Aadhaar card)",
        relation: "Nominee Relationship with Employee",
      },
    },
    requiredFields: {},
    fieldPatterns: {},
    readOnlyFields: {},
  },
};
