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
    companyName: company ?? "",
    brandName: brand ?? "",
    registeredAddress: address ?? "",
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
    PAN: {
      id: pan ?? "",
      verification_status: "Done",
    },
    TAN: {
      id: tan ?? "",
      verification_status: "Done",
    },
    GSTIN: {
      id: gstin ?? "",
      verification_status: "Done",
    },
  };

  return document;
};

export const getDocumentFromPfFormDetails = (employerId, pfFormDetails) => {
  const { pf_username, pf_password } = pfFormDetails ?? "";
  const document = {
    employerId: employerId ?? "",
    credentials_epfo: {
      username: pf_username ?? "",
      password: pf_password ?? "",
    },
  };

  return document;
};

export const getDocumentFromEsicFormDetails = (
  employerId,
  esic_state_identifier,
  esic_employer_code,
  esic_password
) => {
  const esic_state_key = `esic_credentials_${esic_state_identifier}`;
  const document = {
    employerId: employerId ?? "",
    [esic_state_key]: {
      username: esic_employer_code,
      password: esic_password,
    },
  };

  return document;
};

// export const getDocumentFromState = (
//   jwtToken,
//   addressFormDetails,
//   taxSetupFormDetails,
//   pfFormDetails,
//   esicFormDetails
// ) => {
//   const employerId = jwtToken ?? "";
//   const { company, brand, address, state, pincode } = addressFormDetails ?? "";
//   const { pan, tan, gstin } = taxSetupFormDetails ?? "";
//   const { pf_username, pf_password } = pfFormDetails ?? "";

//   const objectMap = (obj, fn) =>
//     Object.fromEntries(
//       Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)])
//     );

//   const esic = objectMap(esicFormDetails ?? {}, (value) => {
//     const { esic_employer_code, esic_password } = value;
//     return {
//       username: esic_employer_code,
//       password: esic_password,
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
//         username: pf_username ?? "",
//         password: pf_password ?? "",
//       },
//       esic: esic ?? {},
//     },
//   };

//   return document;
// };
