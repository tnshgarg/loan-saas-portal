import { createContext } from "react";

const UpdateAlertContext = createContext({
  openDialog: (args) => {
    console.log(args);
  },
  closeDialog: () => {},
});

export default UpdateAlertContext;
