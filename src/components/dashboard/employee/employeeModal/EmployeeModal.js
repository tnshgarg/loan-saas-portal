import { Card, Elevation, Tab, Tabs } from "@blueprintjs/core";
import { EmployeeModalTab } from "./EmployeeModalTab";
import { employeeFieldsToTabsMap } from "./employeeFieldsToTabsMap";

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
              const {
                category,
                fields,
                requiredFields,
                fieldPatterns,
                readOnlyFields,
                hasSubTabs,
              } = value;
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
                        requiredFields={requiredFields}
                        fieldPatterns={fieldPatterns}
                        readOnlyFields={readOnlyFields}
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
  const {
    fields,
    requiredFields,
    fieldPatterns,
    readOnlyFields,
    category,
    types,
    inputTypes,
  } = value;
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
                requiredFields={requiredFields[key]}
                fieldPatterns={fieldPatterns[key]}
                readOnlyFields={readOnlyFields[key]}
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
