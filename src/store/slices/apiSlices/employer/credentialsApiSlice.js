import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const employerCredentialsApi = createApi({
  reducerPath: "employerCredentials",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://ifzbkxzmke.execute-api.ap-south-1.amazonaws.com/dev/employer",
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
  tagTypes: ["EmployerCredentials"],
  endpoints: (builder) => ({
    // Define endpoints here
    getEmployerCredentialsById: builder.query({
      query: ({employerId, portal}) => `/credentials?id=${employerId}&portal=${portal}`,
      providesTags: ["EmployerCredentials"],
    }),
    updateEmployerCredentials: builder.mutation({
      query: (body) => ({
        url: `/credentials`,
        method: "POST",
        body: body, // fetchBaseQuery automatically adds `content-type: application/json` to the Headers and calls `JSON.stringify(patch)`
      }),
      invalidatesTags: ["EmployerCredentials"],
    }),
  }),
});

export const { useGetEmployerCredentialsByIdQuery, useUpdateEmployerCredentialsMutation } = employerCredentialsApi;
