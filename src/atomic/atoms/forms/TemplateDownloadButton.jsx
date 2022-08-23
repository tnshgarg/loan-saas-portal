import { Button } from "@blueprintjs/core";
import { CSVLink } from "react-csv";

export function TemplateDownloadButton({ headers, fileName }) {
  const safeFileName =
    `${fileName}_Template_${new Date().toISOString()}`.replaceAll(
      /\s|-|\./g,
      "_"
    ) + ".csv";
  return (
    <CSVLink data={[headers]} filename={safeFileName}>
      <Button icon="cloud-download">Download Template File</Button>
    </CSVLink>
  );
}
