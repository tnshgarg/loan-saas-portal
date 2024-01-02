import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EMPLOYER_BASE_API_URL, TIMEOUT } from "../../../../utils/apiUrls";

export const payslipsApi = createApi({
  reducerPath: "payslips",
  baseQuery: fetchBaseQuery({
    baseUrl: EMPLOYER_BASE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().auth.user?.signInUserSession.idToken.jwtToken ?? "";

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Payslips"],
  keepUnusedDataFor: TIMEOUT,
  endpoints: (builder) => ({
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
          responseData.body = responseData.body;
        }
        console.log(responseData.body);
        return responseData;
      },
      providesTags: ["Payslips"],
    }),
    sendPayslips: builder.mutation({
      query: ({ payslipData }) => ({
        url: "/send-payslips", // Replace with the actual endpoint for sending payslips
        method: "POST",
        body: payslipData,
      }),
    }),
  }),
});

export const { useGetPayslipsQuery, useSendPayslipsMutation } = payslipsApi;
