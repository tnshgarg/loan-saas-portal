import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const employerAddressApi = createApi({
  reducerPath: "employerAddress",
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
  endpoints: (builder) => ({
    // Define endpoints here
    getEmployerAddressById: builder.query({
      query: (id) => `/address?id=${id}`,
    }),
  }),
});

export const { useGetEmployerAddressByIdQuery } = employerAddressApi;
