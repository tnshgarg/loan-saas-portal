import { Card, Elevation, Tab, Tabs } from "@blueprintjs/core";
import _ from "lodash";
import { employeeFieldsToTabsMap } from "./employeeFieldsToTabsMap";
import { EmployeeModalTab } from "./EmployeeModalTab";

const EMPLOYEE_MODAL_STYLING = {
  marginRight: "auto",
  marginLeft: "auto",
  overflowX: "scroll",
};
export const EmployeeModal = ({ formDataInitial, setDidDialogChange }) => {
  return (
    <>
      <Card
        style={EMPLOYEE_MODAL_STYLING}
        interactive={true}
        elevation={Elevation.THREE}
      >
        <Tabs id="registerForm">
          {Object.entries(employeeFieldsToTabsMap).map(
            ([key, value], index) => {
              const subsetFormData = _.pick(formDataInitial, [...value, "_id"]);
              return (
                <Tab
                  id={index + 1}
                  title={`${index + 1}. ${key}`}
                  panel={
                    <EmployeeModalTab
                      key={index + 1}
                      formDataInitial={subsetFormData}
                      setDidDialogChange={setDidDialogChange}
                    />
                  }
                />
              );
            }
          )}
        </Tabs>
      </Card>
    </>
  );
};
