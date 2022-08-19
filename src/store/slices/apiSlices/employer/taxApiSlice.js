import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EMPLOYER_BASE_API_URL, TIMEOUT } from "../../../../utils/apiUrls";

// Define a service using a base URL and expected endpoints
export const employerTaxApi = createApi({
  reducerPath: "employerTax",
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
  tagTypes: ["EmployerTax"],
  keepUnusedDataFor: TIMEOUT,
  endpoints: (builder) => ({
    // Define endpoints here
    getEmployerTaxById: builder.query({
      query: (id) => `/tax?id=${id}`,
      providesTags: ["EmployerTax"],
    }),
    updateEmployerTax: builder.mutation({
      query: (body) => ({
        url: `/tax`,
        method: "POST",
        body: body, // fetchBaseQuery automatically adds `content-type: application/json` to the Headers and calls `JSON.stringify(patch)`
      }),
      invalidatesTags: ["EmployerTax"],
    }),
  }),
});

export const { useGetEmployerTaxByIdQuery, useUpdateEmployerTaxMutation } =
  employerTaxApi;
