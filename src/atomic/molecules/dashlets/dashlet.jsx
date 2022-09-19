import styles from "./dashlet.module.css";
import { Card, Divider, Elevation, H3, Icon } from "@blueprintjs/core";

export const CARD_STYLING = {
  marginLeft: "2.7em",
  marginRight: "2.7em",
  marginBottom: "2.7em",
};

export const HEADER_CLASS = `${styles.column} ${styles.header}`;
export const ACTIONS_CLASS = `${styles.column} ${styles.actions}`;

export function Dashlet({ title, icon, actions, children }) {
  console.log({ title, children });
  return (
    <Card style={CARD_STYLING} elevation={Elevation.THREE}>
      <div className={styles.row}>
        <div className={HEADER_CLASS}>
          <H3>
            <Icon icon={icon} size={24} />
            &nbsp;{title}
          </H3>
        </div>
        <div className={ACTIONS_CLASS}>
          <div className={styles.alignRight}>{actions}</div>
        </div>
      </div>
      {children ? (
        <>
          <Divider />
          {children}
        </>
      ) : (
        <></>
      )}
    </Card>
  );
}
