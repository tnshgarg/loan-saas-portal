import { EMPLOYER_NOT_APPROVED_ERROR } from "../../utils/messageStrings";
/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (
    action?.payload?.status === 403 &&
    action?.payload?.message === EMPLOYER_NOT_APPROVED_ERROR
  ) {
    console.warn("Employer Not Approved");

    const supportEmail = action?.payload?.meta?.supportEmail;
    const baseUrl = window.location.origin;
    const supportRedirectUrl = new URL("/dashboard/unapproved", baseUrl);
    supportRedirectUrl.searchParams.append("supportEmail", supportEmail);

    window.location.href = supportRedirectUrl;
  }
  return next(action);
};
