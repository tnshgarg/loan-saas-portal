import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import {
  FS,
  VALIDATIONS,
  VALIDATIONS_MESSAGES,
} from "../components/dashboard/employee/onboarding/validations";

const ErrorReportButton = ({ loading, templateData, fileName, fields }) => {
  console.log("ErrorReportButton", templateData);
  const [data, setData] = useState(templateData?.data);
  const [errorData, setErrorData] = useState([]);
  loading = loading ?? false;
  const safeFileName = `${fileName}_Template_${new Date()
    .toISOString()
    .replaceAll(/\s|-|\./g, "_")}.csv`;
  let headers = [];

  fields.forEach((item) => {
    headers.push({ label: item.header, key: item.field });
  });

  let validLevel = FS.VALID;

  useEffect(() => {
    let errorObj = [];

    // Add a check to ensure data is not undefined or null
    if (data) {
      data.forEach((item, index) => {
        let updatedItem = { ...item };

        if (item?.status[FS.WARN] || item?.status[FS.ERROR]) {
          fields.forEach(({ field, validations }) => {
            validLevel = VALIDATIONS[validations](item[field] ?? "");

            if (validLevel === FS.ERROR || validLevel === FS.WARN) {
              updatedItem[
                field
              ] = `${item[field]} [${VALIDATIONS_MESSAGES[validations]}]`;
            }
          });
          errorObj.push(updatedItem);
        }
      });
    }

    setErrorData(errorObj);
    console.log("errorObj", errorObj);
  }, [data]);
  return (
    data && (
      <CSVLink
        data={errorData ?? []}
        filename={safeFileName}
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
    )
  );
};

export default ErrorReportButton;
