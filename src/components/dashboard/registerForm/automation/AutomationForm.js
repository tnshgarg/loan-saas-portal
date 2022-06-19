import { Tabs, Tab } from "@blueprintjs/core";
import ESICComponent from "./ESICComponent";
import EPFOComponent from "./EPFOComponent";

const AutomationForm = () => {
  return (
    <>
      <Tabs id="automationForm" defaultSelectedTabId="1">
        <Tab id="1" title="EPFO " panel={<EPFOComponent />} />
        <Tab id="2" title="ESIC" panel={<ESICComponent />} />
      </Tabs>
    </>
  );
};

export default AutomationForm;
