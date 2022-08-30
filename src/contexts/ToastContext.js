import {
  Classes,
  Intent,
  Position,
  ProgressBar,
  Toaster,
} from "@blueprintjs/core";
import { createContext, useContext, useRef, useState } from "react";
import classNames from "classnames";

const ToastContext = createContext();

export default ToastContext;

export const AppToaster = Toaster.create({
  className: "AppToaster",
  position: Position.BOTTOM_RIGHT,
});

export function ToastContextProvider({ children }) {
  const [config, setConfig] = useState({
    autoFocus: false,
    canEscapeKeyClear: true,
    position: Position.BOTTOM_RIGHT,
    usePortal: true,
  });
  const toastRef = useRef(null);

  let progressToastInterval;

  const renderProgress = (amount, fileName) => {
    return {
      icon: "cloud-upload",
      message: (
        <>
          <h6>File {fileName} upload in progress</h6>
          <ProgressBar
            className={classNames("docs-toast-progress", {
              [Classes.PROGRESS_NO_STRIPES]: amount >= 100,
            })}
            intent={amount < 100 ? Intent.PRIMARY : Intent.SUCCESS}
            value={amount / 100}
          />
        </>
      ),
      onDismiss: (didTimeoutExpire) => {
        window.clearInterval(progressToastInterval);
        config?.onDismiss && config?.onDismiss();
      },
      timeout: amount < 100 ? 0 : 2000,
    };
  };

  const handleProgressToast = (fileName = "", interval = 5000) => {
    let progress = 0;
    let percent = interval / 100;
    const key = toastRef.current.show(renderProgress(0, fileName));
    progressToastInterval = window.setInterval(() => {
      if (toastRef.current == null || progress > 100) {
        window.clearInterval(progressToastInterval);
      } else {
        progress = progress + 1;
        toastRef.current.show(renderProgress(progress, fileName), key);
      }
    }, percent);
  };

  return (
    <ToastContext.Provider value={{ config, handleProgressToast, setConfig }}>
      {children}
      <>{<Toaster {...config} ref={toastRef} />}</>;
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  return useContext(ToastContext);
}
