import React from "react";
import { Input, Button } from "@material-tailwind/react";

export default function TextInput({ label }) {
  const [email, setEmail] = React.useState("");
  const onChange = ({ target }) => setEmail(target.value);

  return (
    <Input
      label={label}
      className="bg-white rounded-sm w-full"
      icon={<i className="fas fa-search" />}
    />
  );
}
