const EXCEL_SERIAL_START_EPOCH = -2208988800000;

const serialTimeToMilliseconds = (serialTime) =>
    (serialTime - 2) * 24 * 60 * 60 * 1000;

export function convertExcelSerialToDateString(serialTime) {
  console.log('called')
  const date = new Date(
    EXCEL_SERIAL_START_EPOCH + serialTimeToMilliseconds(serialTime)
  );
  return date.toLocaleDateString();
}
