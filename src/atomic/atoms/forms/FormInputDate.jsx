import { DateInput2 } from "@blueprintjs/datetime2";
import { format, formatISO, parse, parseISO } from "date-fns";
import { useEffect, useState } from "react";

export const InputGroupDate = ({
  disabled,
  placeholder,
  setValue,
  getValues,
  field,
}) => {
  const [dateValue, setDateValue] = useState(null);
  const dateFnsFormat = "dd/MM/yyyy";

  const formatDate = (date) => {
    return format(date, dateFnsFormat);
  };

  const parseDate = (dateString) => {
    return parse(dateString, dateFnsFormat, new Date());
  };

  const handleDateChange = (currentDateValue) => {
    setDateValue(currentDateValue);
    const formattedCurrentDateValue = formatDate(parseISO(currentDateValue));
    setValue(field, formattedCurrentDateValue);
  };

  useEffect(() => {
    const currentFormDateValue = getValues(field);
    if (currentFormDateValue) {
      const formattedCurrentFormDateValue = formatISO(
        parseDate(currentFormDateValue)
      );
      handleDateChange(formattedCurrentFormDateValue);
    }
  }, [field, getValues]);

  return (
    <DateInput2
      formatDate={formatDate}
      onChange={handleDateChange}
      parseDate={parseDate}
      placeholder={placeholder}
      value={dateValue}
      disabled={disabled}
      minDate={new Date(1900, 0)}
    />
  );
};
