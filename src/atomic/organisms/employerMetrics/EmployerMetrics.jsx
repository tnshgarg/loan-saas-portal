import React from "react";
import { capitalize } from "lodash";

//Molecules
import Metrics from "../../molecules/metrics/metrics";

//Styles
import styles from './employerMetrics.module.css';

export default function EmployerMetrics({ data, primaryKey, labelsMap }) {
  return (
    <div
      className={styles.metricsWrapper}
    >
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
              title={labelsMap[key]}
              primary={primaryData}
              secondary={secondaryData}
            />
          );
        })}
    </div>
  );
}
