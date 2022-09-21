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

export function getExcel(headerGroups, rows) {
  const d = new Date();

  const config = {
    filename: d.toString().split("GMT")[0].trim(),
    sheet: {
      data: [],
    },
  };

  const dataSet = config.sheet.data;

  headerGroups.forEach((headerGroup) => {
    const headerRow = [];
    if (headerGroup.headers) {
      headerGroup.headers.forEach((column) => {
        if (column?.accessor) {
          headerRow.push(...getHeader(column));
        }
      });
    }
    headerRow.length && dataSet.push(headerRow);
  });

  if (rows.length > 0) {
    rows.forEach((row) => {
      const dataRow = [];

      Object.values(row.values).forEach((value) =>
        dataRow.push({
          value,
          type: typeof value === "number" ? "number" : "string",
        })
      );

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

  return generateExcel(config);
}
