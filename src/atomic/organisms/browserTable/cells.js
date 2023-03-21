import React, { } from "react";
import {
    Checkbox,
    Colors,
    EditableText,
    Icon,
    Intent,
} from "@blueprintjs/core";

import {
    FS,
    VALIDATIONS,
} from "../../../components/dashboard/employee/onboarding/validations";

const intentMap = {
    [FS.WARN]: Intent.WARNING,
    [FS.ERROR]: Intent.DANGER,
};

export const EditableCell = ({
    value: initialValue,
    row: { index, values },
    column,
    updateMyData,
    disableEdits,
}) => {
    let isDeleted = false;
    if (values.status) isDeleted = values.status[FS.DELETED];
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue || "");

    let validLevel = FS.VALID;
    if (VALIDATIONS[column.validations]) {
        validLevel = VALIDATIONS[column.validations](value ?? "");
    }

    const intent = intentMap[validLevel] || Intent.NONE;
    const backgroundColor = {
        [Intent.WARNING]: "rgb(247, 252, 162, 0.5)",
        [Intent.DANGER]: "rgb(255, 215, 213, 0.5)",
    }[intent];
    const onChange = (e) => {
        setValue(e);
    };

    const onFocus = () => {
        //pass
    };

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, column.id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <div
            style={{
                backgroundColor,
                margin: "-6px -8px -6px -8px",
                padding: " 6px  8px  6px  8px",
            }}
        >
            {isDeleted ? (
                <>
                    <strike style={{ backgroundColor }}>{value || "xxxx"}</strike>
                </>
            ) : (
                <EditableText
                    disabled={disableEdits}
                    placeholder={disableEdits ? "" : null}
                    value={value}
                    intent={intent}
                    onChange={onChange}
                    onConfirm={onBlur}
                    onEdit={onFocus}
                />
            )}
        </div>
    );
};

export const DeleteActionCell = ({
    row: {
        index,
        values: { status },
    },
    deleteRow,
    restoreRow,
}) => {
    const onClick = () => {
        if (status[FS.DELETED]) {
            restoreRow(index);
        } else {
            deleteRow(index);
        }
    };
    return (
        <div style={{ textAlign: "center", padding: 0, margin: 0 }}>
            <Icon
                minimal
                icon={status[FS.DELETED] ? "undo" : "trash"}
                onClick={onClick}
                color={Colors.GRAY1}
            />
        </div>
    );
};

export const SelectActionCell = ({
    row: {
        index,
        values: { status },
    },
    selectRow,
    deselectRow,
}) => {
    const onChange = () => {
        if (status[FS.SELECTED]) {
            deselectRow(index);
        } else {
            selectRow(index);
        }
    };
    return (
        <div style={{ textAlign: "center", padding: 0, margin: 0 }}>
            <Checkbox
                minimal={true}
                disabled={status[FS.DELETED]}
                checked={status[FS.SELECTED]}
                onChange={onChange}
            />
        </div>
    );
};