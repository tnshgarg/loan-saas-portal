/**
 * This is the document template, please follow the same
 * {
   "employerId": "employerId", // UUID from Cognito [sub]
   "companyName": "companyName",
   "brandName": "brandName",
   "registeredAddress": "registeredAddress",
   "state": "state",
   "pincode": "pincode",
   "PAN":  {
      "id": "id",
      "verification_status": "verification_status",
   },
   "TAN": {
      "id": "id",
      "verification_status": "verification_status",
   },
   "GSTIN": {
      "id": "id",
      "verification_status": "verification_status",
   },
   "credentials": {
      "epfo": {
         "username": "username",
         "password": "password",
      },
      "esic": {
         "state_name": {
           "username": "username",
           "password": "password",
         },
      },
   }
}
 */

export const getDocumentFromAddressFormDetails = (
  employerId,
  addressFormDetails
) => {
  const { company, brand, address, state, pincode } = addressFormDetails ?? "";
  const document = {
    employerId: employerId ?? "",
    company: company ?? "",
    brand: brand ?? "",
    address: address ?? "",
    state: state ?? "",
    pincode: pincode ?? "",
  };

  return document;
};

export const getDocumentFromTaxSetupFormDetails = (
  employerId,
  taxSetupFormDetails
) => {
  const { pan, tan, gstin } = taxSetupFormDetails ?? "";
  const document = {
    employerId: employerId ?? "",
    pan: pan ?? "",
    tan: tan ?? "",
    gstin: gstin ?? "",
  };

  return document;
};

export const getDocumentFromPfForm = (employerId, pfForm) => {
  const { username, password } = pfForm ?? "";
  const document = {
    employerId: employerId ?? "",
    credentials: {
      epfo: {
        username: username ?? "",
        password: password ?? "",
      },
    },
  };

  return document;
};

export const getDocumentFromEsicForm = (
  employerId,
  isOther,
  state,
  employerCode,
  password
) => {
  const document = {
    employerId: employerId ?? "",
    credentials: {
      esic: {
        [state]: {
          isOther: isOther,
          employerCode: employerCode,
          password: password,
        },
      },
    },
  };

  return document;
};

// export const getDocumentFromState = (
//   jwtToken,
//   addressFormDetails,
//   taxSetupFormDetails,
//   PfForm,
//   esicFormDetails
// ) => {
//   const employerId = jwtToken ?? "";
//   const { company, brand, address, state, pincode } = addressFormDetails ?? "";
//   const { pan, tan, gstin } = taxSetupFormDetails ?? "";
//   const { username, password } = pfForm ?? "";

//   const objectMap = (obj, fn) =>
//     Object.fromEntries(
//       Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)])
//     );

//   const esic = objectMap(esicFormDetails ?? {}, (value) => {
//     const { employer_code, password } = value;
//     return {
//       username: employer_code,
//       password: password,
//     };
//   });

//   const document = {
//     employerId: employerId ?? "",
//     companyName: company ?? "",
//     brandName: brand ?? "",
//     registeredAddress: address ?? "",
//     state: state ?? "",
//     pincode: pincode ?? "",
//     PAN: {
//       id: pan ?? "",
//       verification_status: "Done",
//     },
//     TAN: {
//       id: tan ?? "",
//       verification_status: "Done",
//     },
//     GSTIN: {
//       id: gstin ?? "",
//       verification_status: "Done",
//     },
//     credentials: {
//       epfo: {
//         username: username ?? "",
//         password: password ?? "",
//       },
//       esic: esic ?? {},
//     },
//   };

//   return document;
// };
