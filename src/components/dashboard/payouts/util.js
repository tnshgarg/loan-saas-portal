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
  const headers = templateFields?.map((column) => column.header);
  //HACK: Error should be handled by calling parent function
  if (!employeesData) return [headers];
  const rows = employeesData?.map((employee) =>
    templateFields?.map((column) =>
      column.prefetch && employee[column.field]
        ? employee[column.field].toString()
        : defaultValues[column.field] ?? ""
    )
  );
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
