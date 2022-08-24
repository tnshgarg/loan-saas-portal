import { Button } from "@blueprintjs/core";
import { CSVLink } from "react-csv";

export function TemplateDownloadButton({ loading, templateData, fileName }) {
  loading = loading ?? false;
  const safeFileName =
    `${fileName}_Template_${new Date().toISOString()}`.replaceAll(
      /\s|-|\./g,
      "_"
    ) + ".csv";
  return (
    <CSVLink data={templateData} filename={safeFileName}>
      <Button loading={loading} icon="cloud-download">
        Download Template File
      </Button>
    </CSVLink>
  );
}
