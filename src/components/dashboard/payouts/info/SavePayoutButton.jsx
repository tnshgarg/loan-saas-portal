import { connect } from "react-redux";
import { Button, Intent } from "@blueprintjs/core";
import md5 from "md5";
import { FS } from "../../employee/onboarding/validations";
import { CSVUploadsStateMapper } from "../../../../atomic/organisms/browserTable";
export function createPayoutHash(item) {
  let rawStr = "";
  for (const field of [
    "employerEmployeeId",
    "employeeName",
    "mobile",
    "year",
    "month",
    "amount",
  ]) {
    rawStr += (item[field] ?? "").toString();
  }
  return md5(rawStr);
}

function _SavePayoutButton({
  data,
  employerId,
  loading,
  saveHook: updatePayouts,
}) {
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
  const updateCount = updates.length + deletes.length;
  return (
    <>
      <Button
        disabled={loading || !updateCount}
        loading={loading}
        icon={updateCount ? "floppy-disk" : "tick"}
        intent={updateCount ? Intent.SUCCESS : Intent.NONE}
        onClick={() => {
          updatePayouts({ updates, deletes, employerId });
        }}
      >
        {updateCount ? `Save ${updateCount} Changes` : "No Changes"}
      </Button>
    </>
  );
}

export const SavePayoutButton = connect(CSVUploadsStateMapper)(
  _SavePayoutButton
);
