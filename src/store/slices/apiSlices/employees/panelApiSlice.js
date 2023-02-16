import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EMPLOYER_BASE_API_URL, TIMEOUT } from "../../../../utils/apiUrls";

// Define a service using a base URL and expected endpoints
export const allEmployeesPanelDetails = createApi({
  reducerPath: "allEmployeesPanelDetails",
  baseQuery: fetchBaseQuery({
    baseUrl: EMPLOYER_BASE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().auth?.user.signInUserSession.idToken.jwtToken ?? "";

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["AllEmployeesPanelDetails"],
  keepUnusedDataFor: TIMEOUT,
  endpoints: (builder) => ({
    // Define endpoints here
    getAllEmployeesPanelByEmployerId: builder.query({
      query: (id) => `/employees?id=${id}&category=panel`,
      providesTags: ["AllEmployeesPanelDetails"],
    }),
  }),
});

export const {
  useGetAllEmployeesPanelByEmployerIdQuery,
  useLazyGetAllEmployeesPanelByEmployerIdQuery,
} = allEmployeesPanelDetails;
