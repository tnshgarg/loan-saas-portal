import { connect } from "react-redux";
import { Button, Intent } from "@blueprintjs/core";
import { CSVUploadsStateMapper } from "../../../../atomic/organisms/csvUploads/BrowserEdiTable";
import md5 from "md5";
import { FS } from "../../employee/onboarding/validations";
import { useUpdatePayoutsMutation } from "../../../../store/slices/apiSlices/employer/payrollApiSlice";

export function createPayoutHash(item) {
  let rawStr = "";
  for (const field of [
    "employerEmployeeId",
    "employeeName",
    "mobile",
    "year",
    "month",
    "amountPayable",
  ]) {
    rawStr += (item[field] ?? "").toString();
  }
  return md5(rawStr);
}

function _SavePayoutButton({ data, employerId, tableName, module, loading }) {
  const [updatePayouts, { isLoading }] = useUpdatePayoutsMutation();
  const updates = [];
  const deletes = [];
  data.forEach((item) => {
    if (item.status[FS.DELETED]) deletes.push(item["_id"]);
    else if (createPayoutHash(item) !== item.initialHash) {
      const mutableItem = Object.assign({}, item);
      delete mutableItem.rowNumber;
      delete mutableItem.status;
      delete mutableItem.initialHash;
      updates.push(mutableItem);
    }
  });
  const hasUpdates = updates.length + deletes.length;
  return (
    <>
      <Button
        disabled={loading || isLoading || !hasUpdates}
        loading={isLoading}
        icon={hasUpdates ? "floppy-disk" : "tick"}
        intent={hasUpdates ? Intent.SUCCESS : Intent.NONE}
        onClick={() => {
          updatePayouts({ updates, deletes, employerId });
        }}
      >
        {hasUpdates ? `Save ${updates.length} Changes` : "No Changes"}
      </Button>
    </>
  );
}

export const SavePayoutButton = connect(CSVUploadsStateMapper)(
  _SavePayoutButton
);
