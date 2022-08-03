const ALERT_STYLING = {
  width: "20%",
  marginTop: "5%",
  marginRight: "auto",
  marginLeft: "auto",
  textAlign: "center",
};

export default function ErrorDialog({ message, success }) {
  if (message) {
    return (
      <div style={ALERT_STYLING}>
        <div
          className={success ? "alert alert-success" : "alert alert-danger"}
          role="alert"
        >
          {message}
        </div>
      </div>
    );
  }
  return <></>;
}
