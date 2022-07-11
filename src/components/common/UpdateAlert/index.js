import React, { useContext, useEffect } from "react";
import { Alert, Intent } from "@blueprintjs/core";
import UpdateAlertContext from "../../../contexts/updateAlertContext";
import { capitalize, pickBy, isEqual } from "lodash";

export const UpdateAlert = () => {
  const { value, setValue } = useContext(UpdateAlertContext);
  const { isOpen, updatedObj, newValues, initialValues, onConfirm, cancelCallback } = value;

  const handleClose = () => {
    cancelCallback && cancelCallback();
    setValue({ ...value, isOpen: !value.isOpen });
  };

  const updatedValues = (updated, original) => {
    return pickBy(updated, (v, k) => !isEqual(original[k], v));
  };

  useEffect(() => {
    if (!isOpen) return;
    setValue({
      ...value,
      updatedObj: updatedValues(newValues, initialValues ?? {}),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, newValues]);

  return (
    <Alert
      cancelButtonText="Cancel"
      confirmButtonText={`Confirm`}
      icon="edit"
      intent={Intent.WARNING}
      isOpen={isOpen}
      onCancel={handleClose}
      onConfirm={onConfirm}
    >
      <p>
        Are you sure you want to do the following changes? You will be able to
        change this later.
      </p>
      {Object.entries(updatedObj).map(([key, value]) => {
        return (
          <p>
            {capitalize(key)}:{value}
          </p>
        );
      })}
    </Alert>
  );
};

export default UpdateAlert;
