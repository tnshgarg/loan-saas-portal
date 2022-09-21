import generateExcel from "zipcelx";

const EXCEL_SERIAL_START_EPOCH = -2208988800000;

const serialTimeToMilliseconds = (serialTime) =>
  (serialTime - 2) * 24 * 60 * 60 * 1000;

export function convertExcelSerialToDateString(serialTime) {
  const date = new Date(
    EXCEL_SERIAL_START_EPOCH + serialTimeToMilliseconds(serialTime)
  );
  return date.toLocaleDateString();
}

function getHeader(column) {
  if (column.parent) {
    return [
      {
        value: column.parent.Header + " " + column.Header,
        type: "string",
      },
    ];
  } else {
    return [
      {
        value: column.Header,
        type: "string",
      },
    ];
  }
}

export function getExcel(headerGroups, rows, sheetName = "export") {
  const d = new Date();

  const config = {
    filename: `${sheetName}_${d.toString().split("GMT")[0].trim()}`,
    sheet: {
      data: [],
    },
  };
  console.log(headerGroups);
  const dataSet = config.sheet.data;
  const accessors = [];
  headerGroups.forEach((headerGroup) => {
    const headerRow = [];
    if (headerGroup.headers) {
      headerGroup.headers.forEach((column) => {
        if (column?.accessor) {
          headerRow.push(...getHeader(column));
          accessors.push(column.accessor);
        }
      });
    }
    if (headerRow.length) dataSet.push(headerRow);
  });
  if (rows.length > 0) {
    rows.forEach((row) => {
      const dataRow = [];
      accessors.forEach((accessor) => {
        const value = row[accessor];
        dataRow.push({
          value,
          type: typeof value === "number" ? "number" : "string",
        });
      });

      dataSet.push(dataRow);
    });
  } else {
    dataSet.push([
      {
        value: "No data",
        type: "string",
      },
    ]);
  }
  console.log(config);
  return generateExcel(config);
}
