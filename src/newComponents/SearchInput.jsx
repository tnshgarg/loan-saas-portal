import React from "react";
import { Input, Button } from "@material-tailwind/react";

export default function SearchInput({ label }) {
  const [email, setEmail] = React.useState("");
  const onChange = ({ target }) => setEmail(target.value);

  return (
    <Input
      placeholder={label}
      // size="sm"
      className="rounded-[3px] !border !border-lightGray bg-white text-gray shadow-none placeholder:text-gray"
      icon={<i className="fas fa-search" />}
      labelProps={{
        className: "hidden",
      }}
      containerProps={{ className: "min-w-[96px] h-[36px]" }}
    />
  );
}
