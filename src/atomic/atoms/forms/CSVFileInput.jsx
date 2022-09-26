import { useRef } from "react";
import { Button } from "@blueprintjs/core";

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
        Upload File
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
