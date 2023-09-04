import { Button, Intent } from "@blueprintjs/core";
import { useRef } from "react";
import { AppToaster } from "../../../contexts/ToastContext";
import { USER_IS_READ_ONLY_ERROR } from "../../../utils/messageStrings";

export function CSVFileInput({ icon, intent, onChange, onInput, isReadOnly }) {
  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);

  return (
    <>
      <Button
        icon={icon}
        intent={intent}
        onClick={(e) =>
          isReadOnly
            ? AppToaster.show({
                intent: Intent.DANGER,
                message: USER_IS_READ_ONLY_ERROR,
              })
            : hiddenFileInput.current.click(e)
        }
      >
        {intent === Intent.PRIMARY ? "Upload File" : "Upload Another File"}
      </Button>
      <div style={{ display: "none" }}>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={onChange}
          onInput={onInput}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
      </div>
    </>
  );
}
