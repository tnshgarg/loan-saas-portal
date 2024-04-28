import { Callout, Intent, Text } from "@blueprintjs/core";
import { useSearchParams } from "react-router-dom";

export const EmployerUnapproved = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSupportEmail = "support@unipe.money";
  const supportEmail = searchParams.get("supportEmail") ?? defaultSupportEmail;

  return (
    <div style={{ textAlign: "center", width: "80%", margin: "20px auto" }}>
      <Callout title="Employer Not Approved" intent={Intent.DANGER}>
        <br></br>
        <Text>Please check this page later.</Text>
        <Text>Contact {supportEmail} for further support.</Text>
      </Callout>
    </div>
  );
};
