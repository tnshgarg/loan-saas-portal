import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EMPLOYER_BASE_API_URL, TIMEOUT } from "../../../../utils/apiUrls";

// Define a service using a base URL and expected endpoints
export const employerPayrollApi = createApi({
  reducerPath: "employerPayroll",
  baseQuery: fetchBaseQuery({
    baseUrl: EMPLOYER_BASE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().auth.user?.signInUserSession.idToken.jwtToken ?? "";

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["EmployerAddress"],
  keepUnusedDataFor: TIMEOUT,
  endpoints: (builder) => ({
    // Define endpoints here
    getAwaitingPayroll: builder.query({
      query: (id) => `/payroll?id=${id}`,
      providesTags: ["EmployerAwaitingPayroll"],
    }),
    updateAwaitingPayroll: builder.mutation({
      query: (body) => ({
        url: `/payroll`,
        method: "POST",
        body: body, // fetchBaseQuery automatically adds `content-type: application/json` to the Headers and calls `JSON.stringify(patch)`
      }),
      invalidatesTags: ["EmployerAwaitingPayroll"],
    }),
  }),
});

export const { useGetAwaitingPayrollQuery, useUpdateAwaitingPayrollMutation } =
  employerPayrollApi;
