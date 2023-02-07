import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EMPLOYER_BASE_API_URL, TIMEOUT } from "../../../../utils/apiUrls";

// Define a service using a base URL and expected endpoints
export const employeeDetails = createApi({
  reducerPath: "employeeDetails",
  baseQuery: fetchBaseQuery({
    baseUrl: EMPLOYER_BASE_API_URL,
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
  tagTypes: ["EmployeeDetails"],
  keepUnusedDataFor: TIMEOUT,
  endpoints: (builder) => ({
    // Define endpoints here
    getEmployeeDetailsByEmployeeId: builder.query({
      query: ({ id, employmentId, category, subCategory }) => {
        return `/employee?id=${id}&category=${category}&subCategory=${subCategory}&employmentId=${employmentId}`;
      },
      providesTags: (id) => [{ type: "EmployeeDetails", id }],
    }),
    updateEmployeeDetails: builder.mutation({
      query: (body) => ({
        url: `/employee`,
        method: "POST",
        body: body, // fetchBaseQuery automatically adds `content-type: application/json` to the Headers and calls `JSON.stringify(patch)`
      }),
      invalidatesTags: ["EmployeeDetails"],
    }),
  }),
});

export const {
  useGetEmployeeDetailsByEmployeeIdQuery,
  useLazyGetEmployeeDetailsByEmployeeIdQuery,
  useUpdateEmployeeDetailsMutation,
} = employeeDetails;
