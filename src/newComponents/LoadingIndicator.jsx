import { Spinner } from "@material-tailwind/react";
import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="flex flex-col h-[85vh] items-center justify-center">
      <div className="w-24 flex flex-col items-center justify-center bg-white rounded-md shadow p-8 ">
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
