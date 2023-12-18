import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import {
  FS,
  VALIDATIONS,
  VALIDATIONS_MESSAGES,
} from "../components/dashboard/employee/onboarding/validations";

const CombinedReportButton = ({ loading, templateData, fileName, fields }) => {
  const [data, setData] = useState(templateData?.data);
  const [errorData, setErrorData] = useState([]);
  const [fullReportData, setFullReportData] = useState([]);
  loading = loading ?? false;

  const safeFileName = (prefix) =>
    `${fileName}_${prefix}_${new Date().toISOString()}`.replaceAll(
      /\s|-|\./g,
      "_"
    ) + ".csv";

  let headers = [];

  fields.forEach((item) => {
    headers.push({ label: item.header, key: item.field });
  });

  let validLevel = FS.VALID;

  useEffect(() => {
    let errorObj = [];
    let fullReportObj = [];

    data.forEach((item, index) => {
      let updatedItem = { ...item };

      fields.forEach(({ field, validations }) => {
        validLevel = VALIDATIONS[validations](item[field] ?? "");

        if (validLevel === FS.ERROR || validLevel === FS.WARN) {
          updatedItem[
            field
          ] = `${item[field]} [${VALIDATIONS_MESSAGES[validations]}]`;
        }
      });

      if (item?.status[FS.WARN] || item?.status[FS.ERROR]) {
        errorObj.push(updatedItem);
      }

      fullReportObj.push(updatedItem);
    });

    setErrorData(errorObj);
    setFullReportData(fullReportObj);

    console.log("errorObj", errorObj);
    console.log("fullReportObj", fullReportObj);
  }, [data]);

  return (
    <div className="flex space-x-4">
      {data && (
        <>
          <CSVLink
            data={errorData ?? []}
            filename={safeFileName("Error_Report")}
            headers={headers ?? []}
          >
            <div className="border border-lightGray p-3 rounded-md col-span-1 flex flex-row items-center justify-between">
              <i className="fa fa-file text-danger" aria-hidden="true"></i>
              <p className="text-sm text-danger font-normal w-full pl-2">
                Error Report
              </p>
              <i className="fa fa-download" aria-hidden="true"></i>
            </div>
          </CSVLink>

          <CSVLink
            data={fullReportData ?? []}
            filename={safeFileName("Full_Report")}
            headers={headers ?? []}
          >
            <div className="border border-lightGray p-3 rounded-md col-span-1 flex flex-row items-center justify-between">
              <i className="fa fa-file text-secondary" aria-hidden="true"></i>
              <p className="text-sm text-secondary font-normal w-full pl-2">
                Full Report
              </p>
              <i className="fa fa-download" aria-hidden="true"></i>
            </div>
          </CSVLink>
        </>
      )}
    </div>
  );
};

export default CombinedReportButton;
