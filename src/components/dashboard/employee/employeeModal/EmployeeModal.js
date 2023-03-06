import { Card, Elevation, Tab, Tabs } from "@blueprintjs/core";
import { employeeFieldsToTabsMap } from "./employeeFieldsToTabsMap";
import { EmployeeModalTab } from "./EmployeeModalTab";

const EMPLOYEE_MODAL_STYLING = {
  marginRight: "auto",
  marginLeft: "auto",
};
export const EmployeeModal = ({
  currEmployeeId,
  currEmploymentId,
  setDidDialogChange,
}) => {
  return (
    <>
      <Card
        style={EMPLOYEE_MODAL_STYLING}
        interactive={true}
        elevation={Elevation.THREE}
      >
        <Tabs renderActiveTabPanelOnly id="employeeDetailsParentTab">
          {Object.entries(employeeFieldsToTabsMap).map(
            ([key, value], index) => {
              const { category, fields, hasSubTabs } = value;
              if (hasSubTabs) {
                return (
                  <Tab
                    id={index + 1}
                    title={`${index + 1}. ${key}`}
                    panel={
                      <SubTabs
                        key={index + 1}
                        index={index}
                        title={key}
                        value={value}
                        currEmployeeId={currEmployeeId}
                        currEmploymentId={currEmploymentId}
                        setDidDialogChange={setDidDialogChange}
                      />
                    }
                  />
                );
              } else {
                return (
                  <Tab
                    id={index + 1}
                    title={`${index + 1}. ${key}`}
                    panel={
                      <EmployeeModalTab
                        key={index + 1}
                        category={category}
                        fields={fields}
                        currEmployeeId={currEmployeeId}
                        currEmploymentId={currEmploymentId}
                        setDidDialogChange={setDidDialogChange}
                      />
                    }
                  />
                );
              }
            }
          )}
        </Tabs>
      </Card>
    </>
  );
};

const SubTabs = ({
  value,
  currEmployeeId,
  currEmploymentId,
  setDidDialogChange,
}) => {
  const { fields, category, types, inputTypes } = value;
  return (
    <Tabs renderActiveTabPanelOnly id="employeeDetails">
      {Object.entries(fields).map(([key, fieldsList], index) => {
        return (
          <Tab
            id={index + 1}
            title={`${index + 1}. ${key}`}
            panel={
              <EmployeeModalTab
                key={index + 1}
                category={category}
                fields={fieldsList}
                currEmployeeId={currEmployeeId}
                currEmploymentId={currEmploymentId}
                setDidDialogChange={setDidDialogChange}
                type={types[key]}
                inputTypes={inputTypes[key]}
              />
            }
          />
        );
      })}
    </Tabs>
  );
};
