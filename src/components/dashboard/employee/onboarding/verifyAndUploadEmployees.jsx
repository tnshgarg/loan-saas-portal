import { Button, Classes, Dialog, Intent, Tag } from "@blueprintjs/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { addOrRemoveFilter } from "../../../../store/slices/csvUploadSlice.ts";
import { FS } from "./validations";

const mapStateToProps = (state, ownProps) => {
  const { fileName, module } = ownProps;
  const {
    csvUploads: {
      [module]: { tableData: { [fileName]: { stats = {} } = {} } = {} } = {},
    } = {},
  } = state;

  const fileStats = stats ?? {};
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
    dispatch,
    tableName,
    module,
  } = props ?? {};

  const [overrideDialog, setOverrideDialog] = useState(false);

  const filterMyData = (errorFilter) => {
    const shouldAddFilter = true;
    dispatch(
      addOrRemoveFilter({ tableName, errorFilter, module, shouldAddFilter })
    );
  };

  const openOverrideDialog = () => {
    setOverrideDialog(true);
  };

  const closeOverrideDialog = () => {
    filterMyData(FS.ERROR);
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
          <i>Note: File with errors cannot be uploaded</i>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button intent={Intent.PRIMARY} onClick={closeOverrideDialog}>
              {" "}
              Fix Errors{" "}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export const VerifyAndUploadEmployees = connect(mapStateToProps)(
  _VerifyAndUploadEmployees
);
