/**
 * This is the document template, please follow the same
 * {
    id:, // UUID from Cognito [sub]
    company:,
    brand:,
    address:,
    state:,
    pincode:,
    pan:,
    tan:,
    gstin:,
    credentials: {
      epfo: {
          username:,
          password:,
      },
      esic: {
          state_name: {
            username:,
            password:,
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
