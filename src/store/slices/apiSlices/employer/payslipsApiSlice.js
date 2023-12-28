import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EMPLOYER_BASE_API_URL, TIMEOUT } from "../../../../utils/apiUrls";

// Define a service using a base URL and expected endpoints
export const payslipsApi = createApi({
  reducerPath: "payslips",
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
  tagTypes: ["Payslips"],
  keepUnusedDataFor: TIMEOUT,
  endpoints: (builder) => ({
    // Define endpoints here
    getPayslips: builder.query({
      query: ({ id, year, month, status = [] }) => {
        const path = `/payslips?id=${id}&year=${year}&month=${month}`;
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
        console.log(responseData.body);
        return responseData;
      },
      providesTags: ["Payslips"],
    }),
  }),
});

export const { useGetPayslipsQuery } = payslipsApi;