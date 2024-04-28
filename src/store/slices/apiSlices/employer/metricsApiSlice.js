import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EMPLOYER_BASE_API_URL, TIMEOUT } from "../../../../utils/apiUrls";

// Define a service using a base URL and expected endpoints
export const employerMetricsApi = createApi({
  reducerPath: "employerMetrics",
  baseQuery: fetchBaseQuery({
    baseUrl: EMPLOYER_BASE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().auth.user?.signInUserSession.idToken.jwtToken ?? "";

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["EmployerMetrics"],
  keepUnusedDataFor: TIMEOUT,
  endpoints: (builder) => ({
    // Define endpoints here
    getEmployerMetricsById: builder.query({
      query: ({ employerId, subCategory, category }) =>
        `/metrics?category=${category}&id=${employerId}&subCategory=${subCategory}`,
      providesTags: (subCategory) => [{ type: "EmployerMetrics", subCategory }],
    }),
  }),
});

export const { useGetEmployerMetricsByIdQuery } = employerMetricsApi;
