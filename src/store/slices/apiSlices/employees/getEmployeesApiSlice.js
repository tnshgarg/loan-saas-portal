import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EMPLOYER_BASE_API_URL } from "../../../../utils/apiUrls";

// Define a service using a base URL and expected endpoints
export const allEmployeesBasicDetails = createApi({
  reducerPath: "allEmployeesBasicDetails",
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
  endpoints: (builder) => ({
    // Define endpoints here
    getAllEmployeesByEmployerId: builder.query({
      query: (id) => `/employees?id=${id}`,
    }),
  }),
});

export const {
  useGetAllEmployeesByEmployerIdQuery,
  useLazyGetAllEmployeesByEmployerIdQuery,
} = allEmployeesBasicDetails;
