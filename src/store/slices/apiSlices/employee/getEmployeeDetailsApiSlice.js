import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EMPLOYEES_AND_EMPLOYEE_BASE_API_URL } from "../../../../helpers/apiUrls";

// Define a service using a base URL and expected endpoints
export const employeeDetails = createApi({
  reducerPath: "employeeDetails",
  baseQuery: fetchBaseQuery({
    baseUrl: EMPLOYEES_AND_EMPLOYEE_BASE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().auth.user.signInUserSession.idToken.jwtToken ?? "";

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Define endpoints here
    getEmployeeDetailsByEmployeeId: builder.query({
      query: ({ id, category }) => {
        return `/employer/employee?id=${id}&category=${category}`;
      },
    }),
  }),
});

export const { useGetEmployeeDetailsByEmployeeIdQuery } = employeeDetails;
