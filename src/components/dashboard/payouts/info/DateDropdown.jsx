import { Option, Select } from "@material-tailwind/react";
import React from "react";

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
      const selectedDate = parseInt(event.currentTarget.value);
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
