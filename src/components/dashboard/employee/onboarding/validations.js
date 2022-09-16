export const FIELD_STATUS = {
  ERROR: 1,
  WARN: 2,
  VALID: 3,
  DELETED: 4,
  SELECTED: 5,
};
export const FS = FIELD_STATUS;

// noinspection
export const reg = {
  DATE: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
  PHONE: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  AADHAAR: /^\d{12}$/,
  IFSC: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  FIN_NUMBER: /^\d+(,\d+)*(\.\d{1,2})*$/,
  AMOUNT: /^\d+(,\d+)*(\.\d*)?$/,
  YEAR: /^\d{4}$/,
  MONTH: /^(0\d)|(1[0-2])|(\d)$/,
};

function regexValidation(regex, errorLevel) {
  return function (value) {
    return regex.test(value) ? FS.VALID : errorLevel;
  };
}

export const phoneValidation = "phoneValidation";
export const emailValidation = "emailValidation";
export const dateValidation = "dateValidation";
export const dojValidation = "dojValidation";
export const aadhaarValidation = "aadhaarValidation";
export const panValidation = "panValidation";
export const ifscValidation = "ifscValidation";
export const currencyValidation = "currencyValidation";
export const noValidation = "noValidation";
export const genderValidation = "genderValidation";
export const requiredValidation = "requiredValidation";
export const amountValidation = "amountValidation";
export const yearValidation = "yearValidation";
export const monthValidation = "monthValidation";

// techdebt: make generic
export const VALIDATIONS = {
  [phoneValidation]: regexValidation(reg.PHONE, FS.ERROR),
  [emailValidation]: regexValidation(reg.EMAIL, FS.WARN),
  [dateValidation]: regexValidation(reg.DATE, FS.WARN),
  [dojValidation]: regexValidation(reg.DATE, FS.ERROR),
  [aadhaarValidation]: regexValidation(reg.AADHAAR, FS.WARN),
  [panValidation]: regexValidation(reg.PAN, FS.WARN),
  [ifscValidation]: regexValidation(reg.IFSC, FS.WARN),
  [currencyValidation]: regexValidation(reg.FIN_NUMBER, FS.ERROR),
  [noValidation]: () => FS.VALID,
  [requiredValidation]: (value) => (!!value ? FS.VALID : FS.ERROR),
  [genderValidation]: (value) => {
    // if(!value) return FS.VALID;
    const validGenders = ["male", "female", "transgender", "m", "f", "t"];
    return validGenders.includes(value.toLowerCase()) ? FS.VALID : FS.WARN;
  },
  [yearValidation]: regexValidation(reg.YEAR, FS.ERROR),
  [monthValidation]: regexValidation(reg.MONTH, FS.ERROR),
  [amountValidation]: regexValidation(reg.AMOUNT, FS.ERROR),
};
