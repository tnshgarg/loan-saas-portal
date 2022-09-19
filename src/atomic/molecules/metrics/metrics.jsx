import {
  Button,
  Card,
  Divider,
  Elevation,
  H5,
  Icon,
  Intent,
  Tag,
} from "@blueprintjs/core";
import React from "react";
import styles from "./metrics.module.css";

export function MetricsContainer(props) {
  return (
    <div className={styles.metricsContainer} {...props}>
      {props.children}
    </div>
  );
}

export default function Metrics({
  title,
  primary,
  secondary,
  secondaryConfig,
}) {
  primary = primary ?? {};
  secondary = secondary ?? [];
  return (
    <Card elevation={Elevation.TWO} className={styles.cardRoot}>
      <H5 className={styles.heading}>
        <Button className="pt-large">
          <Icon icon="chart" size={20} />
        </Button>
        <span>{title}</span>
      </H5>
      <div className={styles.primaryContainer}>
        <Tag
          minimal={true}
          intent={Intent.SUCCESS}
          large={true}
          icon={<Icon icon="tick" size={15} />}
        >
          <span className={styles.tag}>
            {primary.title} : {primary.count}
          </span>
        </Tag>
      </div>
      <Divider className={styles.divider} />
      <div className={styles.secondaryContainer}>
        {secondary.map((item) => {
          let tagProps = {};
          let secondaryConfigKey = secondaryConfig[item.title];
          if (secondaryConfigKey) {
            tagProps = {
              intent: Intent[secondaryConfigKey.intent],
              icon: <Icon icon={secondaryConfigKey.icon} size={15} />,
            };
          }
          return (
            <Tag
              style={{ marginRight: "10px" }}
              round={false}
              minimal={true}
              intent={Intent.PRIMARY}
              large={true}
              icon={<Icon icon="tag" size={15} />}
              {...tagProps}
            >
              <span className={styles.tag}>
                {item.title}: {item.count}
              </span>
            </Tag>
          );
        })}
      </div>
    </Card>
  );
}
