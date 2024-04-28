import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { CSVLink } from "react-csv";
import PrimaryButton from "../../../newComponents/PrimaryButton";

export function TemplateDownloadButton({
  title,
  loading,
  templateData,
  fileName,
}) {
  loading = loading ?? false;
  const safeFileName =
    `${fileName}_Template_${new Date().toISOString()}`.replaceAll(
      /\s|-|\./g,
      "_"
    ) + ".csv";
  console.log({ templateData });
  return (
    <CSVLink
      data={templateData}
      filename={safeFileName}
      className="w-full m-2 no-underline outline-none"
    >
      <PrimaryButton
        title={title}
        color="secondary"
        variant={"outlined"}
        className={"w-full outline-none px-0"}
        rightIcon={ArrowDownTrayIcon}
      />
      {/* <Button loading={loading} icon="cloud-download">
        Download Template File
      </Button> */}
    </CSVLink>
  );
}
