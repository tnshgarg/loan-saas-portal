import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EMPLOYER_BASE_API_URL, TIMEOUT } from "../../../../utils/apiUrls";

export const allEmployeesPanelDetails = createApi({
  reducerPath: "allEmployeesPanelDetails",
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
  tagTypes: ["AllEmployeesPanelDetails"],
  keepUnusedDataFor: TIMEOUT,
  endpoints: (builder) => ({
    getAllEmployeesPanelByEmployerId: builder.query({
      query: (id) => `/employees?id=${id}&category=panel`,
      providesTags: ["AllEmployeesPanelDetails"],
      transformResponse: (responseData) => {
        if (responseData.body) {
          responseData.meta = {};
          responseData.meta.activeEmployees = responseData?.body?.filter(
            (item) => item.active == true
          )?.length;
          responseData.meta.kycPending = responseData?.body?.filter(
            (item) =>
              item.aadhaar?.verifyStatus != "SUCCESS" ||
              item.pan?.verifyStatus != "SUCCESS" ||
              item.bank?.verifyStatus != "SUCCESS"
          )?.length;
          responseData.meta.kycDone = responseData?.body?.filter(
            (item) =>
              item.aadhaar?.verifyStatus == "SUCCESS" &&
              item.pan?.verifyStatus == "SUCCESS" &&
              item.bank?.verifyStatus == "SUCCESS"
          )?.length;
        }
        return responseData;
      },
    }),
  }),
});

export const {
  useGetAllEmployeesPanelByEmployerIdQuery,
  useLazyGetAllEmployeesPanelByEmployerIdQuery,
} = allEmployeesPanelDetails;
