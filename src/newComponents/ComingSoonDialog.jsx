import { Dialog, DialogHeader } from "@material-tailwind/react";
import React from "react";

export default function ComingSoonDialog({ open, setOpen }) {
  const handleOpen = () => setOpen(!open);

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>
        <p className="text-blue-gray-500 mx-auto">Coming Soon</p>
      </DialogHeader>
    </Dialog>
  );
}
