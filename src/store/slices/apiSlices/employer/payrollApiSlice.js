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
    getPayouts: builder.query({
      query: ({ id, year, month, status = [] }) => {
        const path = `/payouts?id=${id}&year=${year}&month=${month}`;
        if (!id || !year || !month)
          throw Error(
            `none of these can be null ${JSON.stringify({
              id,
              year,
              month,
            })}`
          );
        if (status && status.length) {
          return path + `&status=${JSON.stringify(status)}`;
        }

        return path;
      },
      transformResponse: (responseData) => {
        if (responseData.body) {
          responseData.body = JSON.parse(responseData.body);
        }
        return responseData;
      },
      providesTags: ["Payouts"],
    }),
    processPayouts: builder.mutation({
      query: (body) => ({
        url: `/payouts/confirmation`,
        method: "POST",
        body: body, // fetchBaseQuery automatically adds `content-type: application/json` to the Headers and calls `JSON.stringify(patch)`
      }),
      invalidatesTags: ["Payouts"],
    }),
    fetchInstrument: builder.mutation({
      query: (body) => ({
        url: `/payouts/instrument`,
        method: "POST",
        body: {
          ...body,
          trigger_time: new Date().toISOString().slice(0, 17) + "00.000Z",
        }, // fetchBaseQuery automatically adds `content-type: application/json` to the Headers and calls `JSON.stringify(patch)`
      }),
      invalidatesTags: ["Payouts"],
    }),
    updatePayouts: builder.mutation({
      query: (body) => ({
        url: `/payouts`,
        method: "PATCH",
        body: body, // fetchBaseQuery automatically adds `content-type: application/json` to the Headers and calls `JSON.stringify(patch)`
      }),
      invalidatesTags: ["Payouts"],
    }),
  }),
});

export const {
  useGetPayoutsQuery,
  useProcessPayoutsMutation,
  useUpdatePayoutsMutation,
  useFetchInstrumentMutation,
} = employerPayrollApi;
