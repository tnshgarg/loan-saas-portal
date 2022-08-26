import React from "react";
import PropTypes from "prop-types";

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateData,
  inputTypes,
  editableRowIndex,
}) => {
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateData(index, id, value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return index === editableRowIndex ? (
    <input
      key={`${index}_${id}`}
      className="bp4-input"
      type={inputTypes[id].type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      pattern={inputTypes[id].pattern}
      autocomplete="new-password"
    />
  ) : (
    <p>
      {inputTypes[id].type === "password" ? (
        <span>&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;</span>
      ) : (
        initialValue
      )}
    </p>
  );
};

export default EditableCell;

EditableCell.defaultProps = {
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
