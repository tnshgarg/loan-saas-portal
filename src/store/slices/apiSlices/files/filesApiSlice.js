import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EMPLOYER_BASE_API_URL, TIMEOUT } from "../../../../utils/apiUrls";

// Define a service using a base URL and expected endpoints
export const uploadedFiles = createApi({
  reducerPath: "uploadedFiles",
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
  tagTypes: ["UploadedFiles"],
  keepUnusedDataFor: TIMEOUT,
  endpoints: (builder) => ({
    // Define endpoints here

    getUploadedFiles: builder.query({
      query: ({ id, module }) => `/files?id=${id}&module=${module}`,
      providesTags: ["UploadedFiles"],
    }),
  }),
});

export const { useGetUploadedFilesQuery, useLazyGetUploadedFilesQuery } =
  uploadedFiles;
