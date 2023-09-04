import { Intent } from "@blueprintjs/core";
import { AppToaster } from "../../contexts/ToastContext";
import { USER_IS_READ_ONLY_ERROR } from "../../utils/messageStrings";
/**
 * Log a warning and show a toast!
 */
export const readOnlyAccessLogger = (api) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (
    action?.payload?.status === 403 &&
    action?.payload?.message === USER_IS_READ_ONLY_ERROR
  ) {
    console.warn("Read Only Access allowed");
    AppToaster.show({
      intent: Intent.DANGER,
      message: USER_IS_READ_ONLY_ERROR,
    });
  }
  return next(action);
};
