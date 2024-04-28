import { Option, Select } from "@material-tailwind/react";
import React, { useEffect } from "react";

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

const DateDropdown = ({ onChange }) => {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;

  useEffect(() => {
    if (onChange)
      onChange({
        year,
        month,
      });
  }, []);

  const options = Array.from({ length: 12 }, (_, index) => {
    month -= 1;
    if (month === 0) {
      month = 12;
      year -= 1;
    }
    return {
      value: year * 100 + month,
      text: `${MONTHS[month]} ${year}`,
    };
  }).reverse();

  const handleSelectChange = (event) => {
    if (onChange) {
      const selectedDate = parseInt(event);
      onChange({
        year: parseInt(selectedDate / 100),
        month: selectedDate % 100,
      });
    }
  };

  return (
    <div className="w-48">
      <Select
        variant="outlined"
        label="Select Date"
        className="bg-white"
        size="md"
        onChange={handleSelectChange}
        selected={options[0]}
        value={options[0].value}
      >
        {options.map((option) => (
          <Option value={option.value} key={option.value}>
            {option.text}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default DateDropdown;
