import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { employeeDetails } from "./slices/apiSlices/employee/employeeDetailsApiSlice";
import { allEmployeesBasicDetails } from "./slices/apiSlices/employees/employeesApiSlice";
import { employerAddressApi } from "./slices/apiSlices/employer/addressApiSlice";
import { employerCredentialsApi } from "./slices/apiSlices/employer/credentialsApiSlice";
import { employerEWAApi } from "./slices/apiSlices/employer/ewaApiSlice";
import { employerMetricsApi } from "./slices/apiSlices/employer/metricsApiSlice";
import { employerPayrollApi } from "./slices/apiSlices/employer/payrollApiSlice";
import { employerTaxApi } from "./slices/apiSlices/employer/taxApiSlice";
import { uploadedFiles } from "./slices/apiSlices/files/filesApiSlice";
import authReducer from "./slices/authSlice";
import CSVUploadReducer from "./slices/csvUploadSlice.ts";
import employeeReducer from "./slices/employeeSlice";
import messageReducer from "./slices/messageSlice";
import registerFormReducer from "./slices/registerFormSlice";

export const store = configureStore({
  reducer: {
    message: messageReducer,
    auth: authReducer,
    registerForm: registerFormReducer,
    employee: employeeReducer,
    csvUploads: CSVUploadReducer,
    [employerAddressApi.reducerPath]: employerAddressApi.reducer,
    [employerPayrollApi.reducerPath]: employerPayrollApi.reducer,
    [employerEWAApi.reducerPath]: employerEWAApi.reducer,
    [employerTaxApi.reducerPath]: employerTaxApi.reducer,
    [employerCredentialsApi.reducerPath]: employerCredentialsApi.reducer,
    [allEmployeesBasicDetails.reducerPath]: allEmployeesBasicDetails.reducer,
    [employeeDetails.reducerPath]: employeeDetails.reducer,
    [employerMetricsApi.reducerPath]: employerMetricsApi.reducer,
    [uploadedFiles.reducerPath]: uploadedFiles.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["auth/setLoggedInUser"],
        ignoredPaths: ["auth.user"],
      },
    })
      .concat(employerEWAApi.middleware)
      .concat(employerAddressApi.middleware)
      .concat(employerPayrollApi.middleware)
      .concat(employerTaxApi.middleware)
      .concat(employerCredentialsApi.middleware)
      .concat(allEmployeesBasicDetails.middleware)
      .concat(employeeDetails.middleware)
      .concat(employerMetricsApi.middleware)
      .concat(uploadedFiles.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
