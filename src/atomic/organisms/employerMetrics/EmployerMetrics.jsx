import { Intent } from "@blueprintjs/core";
import { capitalize } from "lodash";
import React from "react";

//Molecules
import Metrics, { MetricsContainer } from "../../molecules/metrics/metrics";

function KYCMetrics({ title, icon, intent, metric }) {
  return (<Metrics
    title={`${title} KYC`}
    icon={icon}
    intent={intent}
    primary={{
      title: "Verified",
      count: metric?.SUCCESS || 0,
      intent: Intent.SUCCESS
    }}
    secondary={[
      {
        title: "Pending",
        intent: Intent.WARNING,
        icon: "issue",
        count: metric?.PENDING || 0
      },
      {
        title: "Error",
        intent: Intent.DANGER,
        icon: "error",
        count: metric?.PENDING || 0
      }
    ]}
  />)
}
export default function EmployerMetrics({ data, primaryKey, config }) {
  const { labels, secondaryConfig } = config;
  const { onboarding, employment, aadhaar, pan, bank } = data;
  console.log({ labels, data, config });
  console.log("EmployerMetrics", { data })
  return (
    <MetricsContainer>
      <Metrics
        title={"Onboarding Status"}
        icon="form"
        intent={Intent.PRIMARY}
        primary={{
          title: "Success",
          count: onboarding?.SUCCESS || 0,
          intent: Intent.SUCCESS
        }}
        secondary={[
          {
            title: "Pending",
            intent: Intent.PRIMARY,
            icon: "issue",
            count: onboarding?.PENDING || 0
          }
        ]}
      />
      <Metrics
        title={"Employment Status"}
        icon="user"
        primary={{
          title: "Active",
          count: employment?.ACTIVE || 0,
          intent: Intent.SUCCESS
        }}
        secondary={[
          {
            title: "Inactive",
            intent: Intent.DANGER,
            icon: "issue",
            count: employment?.INACTIVE || 0
          }
        ]}
      />
      <KYCMetrics title="Aadhaar" icon={"id-number"} intent={Intent.SUCCESS} metric={aadhaar} />
      <KYCMetrics title="PAN" icon={"symbol-rectangle"} intent={Intent.PRIMARY} metric={pan} />
      <KYCMetrics title="Bank" icon={"credit-card"} intent={Intent.WARNING} metric={bank} />

    </MetricsContainer>
  );
}
