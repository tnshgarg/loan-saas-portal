import {
  Classes,
  Intent,
  Position,
  ProgressBar,
  Toaster,
} from "@blueprintjs/core";
import classNames from "classnames";
import React, { useEffect, useRef } from "react";

const Toast = ({ showToast, fileName, interval, onDismiss }) => {
  const defaultOptions = {
    autoFocus: false,
    canEscapeKeyClear: true,
    position: Position.BOTTOM_RIGHT,
    usePortal: true,
    canEscapeKeyClear: false,
  };

  let progressToastInterval;

  const toastRef = useRef(null);

  useEffect(() => {
    if (showToast) {
      handleProgressToast();
    }
  }, [showToast]);

  const renderProgress = (amount) => {
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
        onDismiss && onDismiss();
      },
      timeout: amount < 100 ? 0 : 2000,
    };
  };

  const handleProgressToast = () => {
    let progress = 0;
    let percent = interval / 100;
    const key = toastRef.current.show(renderProgress(0));
    progressToastInterval = window.setInterval(() => {
      if (toastRef.current == null || progress > 100) {
        window.clearInterval(progressToastInterval);
      } else {
        progress = progress + 1;
        toastRef.current.show(renderProgress(progress), key);
      }
    }, percent);
  };

  return <>{showToast && <Toaster {...defaultOptions} ref={toastRef} />}</>;
};

export default Toast;
