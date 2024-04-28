import React, { useState, useEffect } from "react";
import { Input } from "@material-tailwind/react";

export default function SearchInput({ label, data, setData, mainData }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (val) => {
    setSearchTerm(val);

    if (val === "") {
      setData(mainData);
    } else {
      const results = mainData.filter((item) =>
        Object.values(item).join(" ").toLowerCase().includes(val.toLowerCase())
      );
      setData(results);
    }
  };

  const handleChange = (e) => {
    handleSearch(e.target.value);
  };

  useEffect(() => {
    setData(mainData);
  }, [mainData]);

  return (
    <Input
      placeholder={label}
      className="rounded-[3px] !border !border-lightGray bg-white text-gray shadow-none placeholder:text-gray"
      icon={<i className="fas fa-search" />}
      labelProps={{
        className: "hidden",
      }}
      containerProps={{ className: "min-w-[96px] h-[36px]" }}
      value={searchTerm}
      onChange={handleChange}
    />
  );
}
