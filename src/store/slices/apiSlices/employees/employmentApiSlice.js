import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EMPLOYER_BASE_API_URL, TIMEOUT } from "../../../../utils/apiUrls";

export const allEmployeesEmploymentDetails = createApi({
  reducerPath: "allEmployeesEmploymentDetails",
  baseQuery: fetchBaseQuery({
    baseUrl: EMPLOYER_BASE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().auth?.user.signInUserSession.idToken.jwtToken ?? "";

      if (token) {
        headers.set("authorization", `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["AllEmployeesEmploymentDetails"],
  keepUnusedDataFor: TIMEOUT,
  endpoints: (builder) => ({
    getAllEmployeesEmploymentByEmployerId: builder.query({
      query: (id) => `/employees?id=${id}&category=employment`,
      providesTags: ["AllEmployeesEmploymentDetails"],
      transformResponse: (responseData) => {
        if (responseData.body) {
          responseData.meta = {};
          responseData.meta.onboardedUsers = responseData?.body?.filter(
            (item) => item.onboarded == true
          )?.length;
        }
        return responseData;
      },
    }),
  }),
});

export const {
  useGetAllEmployeesEmploymentByEmployerIdQuery,
  useLazyGetAllEmployeesEmploymentByEmployerIdQuery,
} = allEmployeesEmploymentDetails;
