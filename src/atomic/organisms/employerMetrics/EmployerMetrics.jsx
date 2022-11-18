import { capitalize } from "lodash";
import React from "react";

//Molecules
import Metrics, { MetricsContainer } from "../../molecules/metrics/metrics";

export default function EmployerMetrics({ data, primaryKey, config }) {
  const { labels, secondaryConfig } = config;
  console.log({ labels, data, config });
  return (
    <MetricsContainer>
      {data?.body &&
        Object.keys(data?.body).map((key) => {
          const metricData = data?.body;
          const primaryData = {
            title: capitalize(primaryKey),
            count: metricData[key][primaryKey] ?? 0,
          };
          const secondaryData = Object.keys(metricData[key])
            .filter((item) => item !== primaryKey)
            .map((item) => ({
              title: capitalize(item),
              count: metricData[key][item] ?? 0,
            }));
          return (
            <Metrics
              title={labels[key]}
              primary={primaryData}
              secondary={secondaryData}
              secondaryConfig={secondaryConfig}
            />
          );
        })}
    </MetricsContainer>
  );
}
