import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

//Data
import statesAndUts from "../../../../../utils/statesAndUts";

const EditableDropdown = ({
  value: initialValue,
  row,
  column,
  updateData,
  editableRowIndex,
}) => {
  const [value, setValue] = React.useState(initialValue);
  const [isOther, setIsOther] = React.useState(row.values.isOther);
  const [disabled, setDisabled] = React.useState(row.values.isDisabled);

  const states = statesAndUts.map((opt) => {
    return {
      value: opt,
      label: opt,
    };
  });

  const onChange = (e) => {
    updateData(row.index, column.id, e.target.value);
    setValue(e.target.value);
  };

  const handleDropdownChange = (value) => {
    updateData(row.index, column.id, value.value);
    setValue(value.value);
    if (value.value === "Other") {
      setIsOther(true);
      updateData(row.index, "isOther", true);
    } else {
      updateData(row.index, "isOther", false);
    }
  };

  React.useEffect(() => {
    setValue(initialValue);
    setIsOther(row.values.isOther);
    setDisabled(row.original.isDisabled);
  }, [initialValue, row.values.isOther, row.original.isDisabled]);

  return row.index === editableRowIndex ? (
    <>
      <Select
        options={states}
        value={states.find((c) => c.value === value)}
        onChange={handleDropdownChange}
        name="state"
        isDisabled={disabled ?? true}
      />
      {isOther && (
        <input
          disabled={disabled ?? true}
          className="bp4-input other-form-input"
          value={value}
          onChange={onChange}
        />
      )}
    </>
  ) : (
    <p>{initialValue}</p>
  );
};

export default EditableDropdown;

EditableDropdown.defaultProps = {
  cell: PropTypes.shape({
    value: PropTypes.any.isRequired,
  }),
  row: PropTypes.shape({
    index: PropTypes.number.isRequired,
  }),
  column: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  updateData: PropTypes.func.isRequired,
};
