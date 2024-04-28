import { useState } from "react";
import UpdateAlertContext from '../contexts/updateAlertContext';

function UpdateAlertProvider({ children, ...props }) {
  const [dialog, setDialog] = useState({
    isOpen: false,
    text: "",
    handler: null,
    noBtnText: "",
    yesBtnText:""
  });

  return (
    <UpdateAlertContext.Provider value={{ dialog, setDialog }} {...props}>
      {children}
    </UpdateAlertContext.Provider>
  );
}

export default UpdateAlertProvider