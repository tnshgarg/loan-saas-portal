import { Tab, Tabs } from "@blueprintjs/core";
import { CashfreeCredentialsForm } from "./CashfreeCredentialsForm";
import { RazorpayCredentialsForm } from "./RazorpayCredentialsForm";

const PayoutsIntegrationTabs = () => {
  return (
    <>
      <Tabs id="paymentIntegrationForm" defaultSelectedTabId="Payouts-1">
        <Tab
          id="Payouts-1"
          title="Cashfree"
          panel={<CashfreeCredentialsForm />}
        />
        <Tab
          id="Payouts-2"
          title="Razorpay"
          panel={<RazorpayCredentialsForm />}
        />
      </Tabs>
    </>
  );
};

export default PayoutsIntegrationTabs;
