import { Intent, Tag } from "@blueprintjs/core";
import { Alert } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const ALERT_STYLING = {
  marginTop: "1em",
  textAlign: "center",
};
function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function ErrorDialog({ message, success }) {
  const [open, setOpen] = useState(message ? true : false);
  useEffect(() => {}, [open]);

  if (message) {
    return (
      <Alert
        // icon={<Icon />}
        className={`rounded-none border-l-4  font-medium  mb-2 ${
          !success
            ? "text-danger border-danger bg-danger/10"
            : "text-primary border-primary bg-primary/10"
        }`}
        open={open}
        onClose={() => setOpen(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        {message}
      </Alert>
      // <div style={ALERT_STYLING}>
      //   <Tag
      //     intent={success ? Intent.SUCCESS : Intent.DANGER}
      //     icon={success ? "tick-circle" : "error"}
      //     large
      //     minimal
      //   >
      //     {message}
      //   </Tag>
      // </div>
    );
  }
  return <></>;
}
