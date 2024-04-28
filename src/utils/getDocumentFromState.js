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
  const { company, brand, street, state, pin } = addressFormDetails ?? "";
  const document = {
    id: employerId ?? "",
    company: company ?? "",
    brand: brand ?? "",
    street: street ?? "",
    state: state ?? "",
    pin: pin ?? "",
  };

  return document;
};

export const getDocumentFromTaxSetupFormDetails = (
  employerId,
  taxSetupFormDetails
) => {
  const { pan, tan, gstin } = taxSetupFormDetails ?? "";
  const document = {
    id: employerId ?? "",
    pan: pan ?? "",
    tan: tan ?? "",
    gstin: gstin ?? "",
  };

  return document;
};

export const getDocumentFromPfForm = (employerId, pfForm) => {
  const { username, password, portal } = pfForm ?? "";
  const document = {
    id: employerId ?? "",
    portal: "epfo",
    username: username ?? "",
    password: password ?? "",
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
    other: isOther,
    id: employerId,
    username: employerCode,
    password: password,
    state: state,
    portal: 'esic',
  };

  return document;
};
