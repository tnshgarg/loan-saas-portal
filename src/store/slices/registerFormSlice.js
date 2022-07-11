import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  addressFormDetails: null,
  taxSetupFormDetails: null,
  pfForm: null,
  esicForm: {},
};

export const registerFormSlice = createSlice({
  name: "registerForm",
  initialState,
  reducers: {
    setAddressFormReducer: (state, action) => {
      state.addressFormDetails = action.payload;
    },
    setTaxSetupFormReducer: (state, action) => {
      state.taxSetupFormDetails = action.payload;
    },
    setPfFormReducer: (state, action) => {
      state.pfForm = action.payload;
    },
    setEsicFormReducer: (state, action) => {
      state.esicForm[action.payload.state] = action.payload;
    },
  },
});

export const {
  setAddressFormReducer,
  setTaxSetupFormReducer,
  setPfFormReducer,
  setEsicFormReducer,
} = registerFormSlice.actions;

export const setAddressForm =
  (company, brand, address, state, pincode) => (dispatch) => {
    const addressFormDetails = {
      company: company,
      brand: brand,
      address: address,
      state: state,
      pincode: pincode,
    };
    dispatch(setAddressFormReducer(addressFormDetails));
  };

export const setTaxSetupForm = (pan, tan, gstin) => (dispatch) => {
  const taxSetupFormDetails = {
    pan: pan,
    tan: tan,
    gstin: gstin,
  };
  dispatch(setTaxSetupFormReducer(taxSetupFormDetails));
};

export const setPfForm = (username, password) => (dispatch) => {
  const pfForm = {
    username: username,
    password: password,
  };
  dispatch(setPfFormReducer(pfForm));
};

export const setEsicStateForm =
  (isOther, state, employerCode, password) => (dispatch) => {
    const esicForm = {
      isOther: isOther,
      state: state,
      employerCode: employerCode,
      password: password,
    };
    dispatch(setEsicFormReducer(esicForm));
  };

export default registerFormSlice.reducer;
