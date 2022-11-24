import { HTMLSelect } from "@blueprintjs/core";

const MONTHS = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const DateDropdown = (props) => {
  const date = new Date();
  const options = [];
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  for (let i = 0; i < 12; i++) {
    options.push({
      value: year * 100 + month,
      text: `${MONTHS[month]} ${year}`,
    });
    month -= 1;
    if (month === 0) {
      month = 12;
      year -= 1;
    }
  }
  return (
    <>
      <HTMLSelect
        onChange={(event) => {
          if (props.onChange) {
            const date = parseInt(event.currentTarget.value);
            props.onChange({
              year: parseInt(date / 100),
              month: date % 100,
            });
          }
        }}
      >
        {options.map((option) => (
          <option selected={option === 0} value={option.value}>
            {option.text}
          </option>
        ))}
      </HTMLSelect>
    </>
  );
};
