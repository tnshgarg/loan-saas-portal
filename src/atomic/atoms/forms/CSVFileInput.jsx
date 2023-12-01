import { Button, Intent } from "@blueprintjs/core";
import { useRef } from "react";
import { AppToaster } from "../../../contexts/ToastContext";
import { USER_IS_READ_ONLY_ERROR } from "../../../utils/messageStrings";
import { IconButton } from "@material-tailwind/react";
import { TemplateDownloadButton } from "./TemplateDownloadButton";
import PrimaryButton from "../../../newComponents/PrimaryButton";

export function CSVFileInput({
  onInput,
  isReadOnly,
  fileName,
  handleChange,
  btnName,
  title,
  templateData,
  templateDownloadProps,
  setFileName,
  setFile,
  description,
}) {
  const hiddenFileInput = useRef(null);
  // Create a reference to the hidden file input element

  return fileName ? (
    <div className="w-full border border-black p-2 flex flex-row items-center justify-between rounded-md ">
      <div className="flex flex-row items-center w-[80%]">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2991/2991114.png"
          className="h-8 w-8"
        />
        <p className=" text-sm font-normal text-black pl-2 text-ellipsis overflow-hidden ">
          {fileName ? fileName : "Upload File"}
        </p>
      </div>

      <IconButton
        variant="outlined"
        size="sm"
        className="border-danger"
        onClick={(e) => {
          setFileName("");
          // setFile(null);
        }}
      >
        <i className="fas fa-trash text-danger " />
      </IconButton>

      <div style={{ display: "none" }}>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          onInput={onInput}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
      </div>
    </div>
  ) : (
    <>
      <div className="flex flex-row w-full items-center justify-center">
        <TemplateDownloadButton
          title={`Download ${btnName} Template`}
          fileName={title}
          templateData={templateData}
          {...templateDownloadProps}
        />

        <PrimaryButton
          title={`Upload ${btnName} CSV`}
          color="primary"
          className={"w-full"}
          onClick={(e) => {
            hiddenFileInput.current.click(e);
          }}
        />
        <div style={{ display: "none" }}>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            onInput={onInput}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
        </div>
      </div>
      <p className="text-xs text-center mt-4 mx-4 text-gray">{description}</p>
    </>
  );
  // <>

  // </>
}
