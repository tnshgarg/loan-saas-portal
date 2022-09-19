import {
  Button,
  Card,
  Classes,
  Colors,
  Divider,
  Elevation,
  H3,
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

function makeClasses(classes) {
  return Object.entries(classes).reduce((classString, [classname, exists]) => {
    if (exists) classString += ` ${classname}`;
    return classString;
  }, "");
}

export default function Metrics({
  title,
  icon,
  intent,
  primary,
  secondary,
  secondaryConfig,
  loading,
}) {
  primary = primary ?? {};
  secondary = secondary ?? [];
  secondaryConfig = secondaryConfig ?? {};
  return (
    <Card elevation={Elevation.TWO} style={{ position: "relative" }}>
      <Button
        large
        disabled
        intent={intent}
        style={{ position: "absolute", float: "left", borderRadius: "0.3em" }}
        className={makeClasses({ [Classes.SKELETON]: loading })}
      >
        <Icon icon={icon ?? "chart"} size={40} />
      </Button>
      <div
        className={makeClasses({
          [styles.heading]: true,
          [Classes.SKELETON]: loading,
        })}
      >
        <H3 style={{ color: Colors.GRAY1 }}>{title}</H3>
      </div>
      <div
        className={makeClasses({
          [styles.primaryContainer]: true,
          [Classes.SKELETON]: loading,
        })}
      >
        {primary.component ?? (
          <H3
            style={{
              color: primary.color ?? Colors.GREEN1,
              display: "inline-block",
            }}
            icon={<Icon icon="tick" size={15} />}
          >
            {primary.count}
            <br />
            <span className={styles.tag}>{primary.title}</span>
          </H3>
        )}
      </div>
      <Divider className={styles.divider} />
      <div
        className={
          styles.secondaryContainer + " " + (loading ? Classes.SKELETON : " ")
        }
      >
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
              intent={item.intent ?? Intent.PRIMARY}
              large={true}
              icon={item.icon ?? <Icon icon="tag" size={15} />}
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
