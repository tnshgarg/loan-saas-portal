import React from "react";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import {
  FIELD_STATUS,
  FS,
  VALIDATIONS,
  VALIDATIONS_MESSAGES,
} from "../components/dashboard/employee/onboarding/validations";
import { useState } from "react";

const FullReportButton = ({ loading, templateData, fileName, fields }) => {
  const [data, setData] = useState(templateData?.data);
  const [errorData, setErrorData] = useState([]);
  loading = loading ?? false;
  const safeFileName =
    `${fileName}_Template_${new Date().toISOString()}`.replaceAll(
      /\s|-|\./g,
      "_"
    ) + ".csv";
  let headers = [];

  fields.forEach((item) => {
    headers.push({ label: item.header, key: item.field });
  });
  // console.log("headers", headers);
  // console.log("data", data);

  let validLevel = FS.VALID;

  // data?.forEach((item, index) => {
  //   fields.forEach(({ field, validations }, i) => {
  //     Object.preventExtensions(data[index]);
  //     validLevel = VALIDATIONS[validations](item[field] ?? "");
  //     let array = data[index];
  //     if (validLevel == 1) console.log("ERROR", item[field]);
  //     else if (validLevel == 2) {
  //       console.log("WARN", data[index][field]);
  //       data[index][field] = "WARNING";
  //     } else if (validLevel == 3) console.log("VALID", item[field]);
  //   });
  // });

  useEffect(() => {
    let errorObj = [];

    data.forEach((item, index) => {
      let updatedItem = Object.assign({}, item);

      fields.forEach(({ field, validations }, i) => {
        validLevel = VALIDATIONS[validations](item[field] ?? "");

        if (validLevel == FS.ERROR || validLevel == FS.WARN)
          updatedItem[
            field
          ] = `${item[field]} [${VALIDATIONS_MESSAGES[validations]}]`;
      });
      errorObj.push(updatedItem);
    });
    // x@gmail.com | ERROR: email is invalid
    setErrorData(errorObj);
    console.log("errorObj", errorObj);
  }, [data]);

  return (
    data && (
      <CSVLink
        data={errorData ?? []}
        filename={safeFileName}
        headers={headers ?? []}
        style={{ outlineWidth: 0 }}
      >
        <div className="border border-lightGray p-3 rounded-md col-span-1 flex flex-row items-center justify-between">
          <i class="fa fa-file text-secondary" aria-hidden="true"></i>
          <p className="text-sm text-secondary font-normal w-full pl-2">
            Full Report
          </p>
          <i class="fa fa-download" aria-hidden="true"></i>
        </div>
      </CSVLink>
    )
  );
};

export default FullReportButton;
