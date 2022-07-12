import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { employeeDetails } from "./slices/apiSlices/employee/employeeDetailsApiSlice";
import { allEmployeesBasicDetails } from "./slices/apiSlices/employees/employeesApiSlice";
import { employerAddressApi } from "./slices/apiSlices/employer/addressApiSlice";
import { employerCredentialsApi } from "./slices/apiSlices/employer/credentialsApiSlice";
import { employerTaxApi } from "./slices/apiSlices/employer/taxApiSlice";
import authReducer from "./slices/authSlice";
import employeeReducer from "./slices/employeeSlice";
import messageReducer from "./slices/messageSlice";
import registerFormReducer from "./slices/registerFormSlice";

export const store = configureStore({
  reducer: {
    message: messageReducer,
    auth: authReducer,
    registerForm: registerFormReducer,
    employee: employeeReducer,
    [employerAddressApi.reducerPath]: employerAddressApi.reducer,
    [employerTaxApi.reducerPath]: employerTaxApi.reducer,
    [employerCredentialsApi.reducerPath]: employerCredentialsApi.reducer,
    [allEmployeesBasicDetails.reducerPath]: allEmployeesBasicDetails.reducer,
    [employeeDetails.reducerPath]: employeeDetails.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["auth/setLoggedInUser"],
        ignoredPaths: ["auth.user"],
      },
    })
      .concat(employerAddressApi.middleware)
      .concat(employerTaxApi.middleware)
      .concat(employerCredentialsApi.middleware)
      .concat(allEmployeesBasicDetails.middleware)
      .concat(employeeDetails.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
