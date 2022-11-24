import { Button, Intent } from "@blueprintjs/core";
import { useRef } from "react";

export function CSVFileInput({ icon, intent, onChange, onInput }) {
  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);

  return (
    <>
      <Button
        icon={icon}
        intent={intent}
        onClick={(e) => hiddenFileInput.current.click(e)}
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
