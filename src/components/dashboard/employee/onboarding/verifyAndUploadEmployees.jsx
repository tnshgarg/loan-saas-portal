import { Button, Classes, Dialog, Intent, Tag } from "@blueprintjs/core";
import { connect } from "react-redux";
import { FS } from "./validations";
import React, { useState } from "react";

const mapStateToProps = (state, ownProps) => {
  const { fileName } = ownProps;
  const {
    csvUploads: { stats },
  } = state;
  const fileStats = stats[fileName] ?? {};
  return {
    errors: fileStats[FS.ERROR] || 0,
  };
};

function _VerifyAndUploadEmployees(props) {
  const {
    disableButton,
    loading,
    fileName,
    onClick: parentOnClick,
    errors,
    buttonText,
  } = props ?? {};

  const [overrideDialog, setOverrideDialog] = useState(false);

  const openOverrideDialog = () => {
    setOverrideDialog(true);
  };

  const closeOverrideDialog = () => {
    setOverrideDialog(false);
  };

  const overrideDialogSubmit = () => {
    setOverrideDialog(false);
    parentOnClick();
  };
  const buttonOnClick = errors ? openOverrideDialog : parentOnClick;
  return (
    <>
      <Button
        disabled={disableButton}
        onClick={buttonOnClick}
        loading={loading}
        intent={Intent.SUCCESS}
        icon="cloud-upload"
      >
        {buttonText}
      </Button>
      <Dialog
        isOpen={overrideDialog}
        onClose={closeOverrideDialog}
        title={`${errors} errors in current file`}
        icon={"error"}
        intent={Intent.DANGER}
      >
        <div className={Classes.DIALOG_BODY}>
          <br />
          Looks like your file{" "}
          <Tag intent={Intent.SUCCESS} icon={"document"}>
            {fileName}
          </Tag>{" "}
          has{" "}
          <Tag intent={Intent.DANGER} icon={"error"}>
            {errors} errors
          </Tag>{" "}
          The employees related to these errors will not be able to register to
          your company.
          <br />
          <br />
          <i>Note: these employees will not be able to register on the APP</i>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button intent={Intent.DANGER} onClick={overrideDialogSubmit}>
              Upload Immediately
            </Button>
            <Button onClick={closeOverrideDialog}> Fix Errors </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export const VerifyAndUploadEmployees = connect(mapStateToProps)(
  _VerifyAndUploadEmployees
);
