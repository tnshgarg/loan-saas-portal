export const REQUIRED_SUFFIX = " (Required)";

export function buildRowMapper(headerMap, defaultValue) {
  return function transformHeadersToFields(list) {
    console.log({ list });
    let tableData = list.map((item) => {
      return Object.entries(headerMap).reduce(
        (transformedObject, [header, column]) => {
          if (!item[header]) {
            header = header.replace(REQUIRED_SUFFIX, "").trim();
          }
          transformedObject[column.field] = item[header] || defaultValue;
          return transformedObject;
        },
        {}
      );
    });
    console.table(tableData);
    return tableData;
  };
}

export function buildTemplate(
  templateFields,
  employeesData,
  defaultValues = {}
) {
  // Extract headers from templateFields
  const headers = templateFields.map((column) => column.header);

  // Map each employee's data to a row in the template
  const rows = employeesData.map((employee) =>
    // Map each template field to its corresponding value in the employee data
    templateFields.map((column) =>
      // Use employee data if available, otherwise use default value
      column.prefetch !== false && employee[column.field] !== undefined
        ? employee[column.field].toString()
        : defaultValues[column.field] ?? ""
    )
  );

  // Return the CSV template with headers and rows
  return [headers, ...rows];
}

export function buildHeaderMap(fields) {
  return fields.reduce((map, column) => {
    map[column.header] = column;
    return map;
  }, {});
}

export function getTotalPayoutsAmount(data) {
  return data.reduce((totalPayoutsAmount, currentPayout) => {
    const currentPayoutAmount = parseInt(currentPayout.amount);
    return totalPayoutsAmount + currentPayoutAmount;
  }, 0);
}
