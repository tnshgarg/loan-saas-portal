import React, { useState } from "react";
import UpdateAlertContext from "../contexts/updateAlertContext";

const withUpdateAlert = (Component) => {
  return (props) => {
    const [value, setValue] = useState({
      isOpen: false,
      updatedObj: {},
      newValues: {},
      initialValues: {},
      onConfirm: {},
    });

    return (
      <UpdateAlertContext.Provider value={{ value, setValue }}>
        <Component {...props} />
      </UpdateAlertContext.Provider>
    );
  };
};

export default withUpdateAlert;
