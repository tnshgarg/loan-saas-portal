import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import {
  FS,
  VALIDATIONS,
  VALIDATIONS_MESSAGES,
} from "../components/dashboard/employee/onboarding/validations";

const FullReportButton = ({ loading, templateData, fileName, fields }) => {
  const [data, setData] = useState(templateData?.data);
  const [errorData, setErrorData] = useState([]);
  loading = loading ?? false;
  const safeFileName =
    `${fileName}_${new Date().toISOString()}`.replaceAll(/\s|-|\./g, "_") +
    ".csv";
  const headers = fields?.map(({ header, field }) => ({
    label: header,
    key: field,
  }));
  let validLevel = FS.VALID;

  useEffect(() => {
    const processErrors = () => {
      const errorObj = data.map((item) => {
        const updatedItem = { ...item };

        fields.forEach(({ field, validations }) => {
          validLevel = VALIDATIONS[validations](item[field] ?? "");

          if (validLevel === FS.ERROR || validLevel === FS.WARN) {
            updatedItem[
              field
            ] = `${item[field]} [${VALIDATIONS_MESSAGES[validations]}]`;
          }
        });

        return updatedItem;
      });

      setErrorData(errorObj);
      console.log("errorObj", errorObj);
    };

    processErrors();
  }, [data, fields]);

  return (
    data && (
      <CSVLink
        data={errorData ?? []}
        filename={safeFileName}
        headers={headers ?? []}
        style={{ outlineWidth: 0, textDecoration: "none" }} // Add textDecoration: 'none'
      >
        <div className="border border-lightGray p-3 rounded-md col-span-1 flex flex-row items-center justify-between">
          <i className="fa fa-file text-secondary" aria-hidden="true"></i>
          <p className="text-sm text-secondary font-normal w-full pl-2">
            Full Report
          </p>
          <i className="fa fa-download" aria-hidden="true"></i>
        </div>
      </CSVLink>
    )
  );
};

export default FullReportButton;
