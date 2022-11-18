import {
  Button,
  ControlGroup,
  Intent,
  Label,
  Switch,
  Tag,
  Text,
} from "@blueprintjs/core";
import { useState } from "react";
import { useFetchInstrumentMutation } from "../../../../store/slices/apiSlices/employer/payrollApiSlice";

const Field = ({ label, contents }) => (
  <>
    <Label>
      {label}
      <Text tagName={"div"} style={{ fontSize: 20, width: "30vw" }}>
        {contents}
      </Text>
    </Label>
  </>
);

export function VirtualAccountInfo({
  employerId,
  accountNumber: account_number,
  verifyStatus: account_status,
  balance,
  ifsc,
  balance_updated_on: updated_at,
}) {
  const [fetchInstrument, { isLoading: isFetching }] =
    useFetchInstrumentMutation();
  const [mask, setMasked] = useState(true);
  const intentMap = {
    PENDING: Intent.WARNING,
    ACTIVE: Intent.SUCCESS,
  };
  if (mask) {
    account_number = "**********" + account_number.slice(10);
    ifsc = "**********" + ifsc.slice(8);
  }
  const refetchInstrument = () => {
    fetchInstrument({ employerId });
  };
  return (
    <div style={{ position: "relative" }}>
      <Button
        icon={"refresh"}
        minimal
        style={{ position: "absolute", top: "-3em", right: "-1em" }}
        onClick={refetchInstrument}
      />
      <ControlGroup fill={true}>
        <Field label={"Bank Account Number"} contents={account_number} />
        <Field label={"IFSC"} contents={ifsc} />
        <Field
          label={"Hide Details"}
          contents={
            <Switch
              checked={mask}
              onChange={() => setMasked(!mask)}
              innerLabel={"visible"}
              innerLabelChecked={"masked"}
            />
          }
        />
      </ControlGroup>
      <ControlGroup fill={true}>
        <Field label={"Balance"} contents={(balance ?? 0).toINR() + " INR"} />
        <Field
          label={"Updated On"}
          contents={
            <Tag minimal>{new Date(updated_at).toString().split("GMT")[0]}</Tag>
          }
        />
        <Field
          label={"Status"}
          contents={
            <Tag intent={intentMap[account_status] ?? Intent.DANGER}>
              {account_status}
            </Tag>
          }
        />
      </ControlGroup>
    </div>
  );
}
