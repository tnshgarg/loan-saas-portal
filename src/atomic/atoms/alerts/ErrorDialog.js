import { Intent, Tag } from "@blueprintjs/core";

const ALERT_STYLING = {
  marginTop: "1em",
  textAlign: "center",
};

export default function ErrorDialog({ message, success }) {
  if (message) {
    return (
      <div style={ALERT_STYLING}>
        <Tag
          intent={success ? Intent.SUCCESS : Intent.DANGER}
          icon={success ? "tick-circle" : "error"}
          large
          minimal
        >
          {message}
        </Tag>
      </div>
    );
  }
  return <></>;
}
