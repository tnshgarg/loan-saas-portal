import React from "react";

const UploadSuccess = () => {
  return (
    <div className="w-full flex flex-col py-4">
      <img
        src="https://cdn-icons-png.flaticon.com/512/808/808680.png"
        className="h-36 w-40 self-center mb-4"
      />
      <p className="text-md w-[80%] self-center text-center font-semibold text-black mt-4">
        Your data has been imported successfully
      </p>
      <p className="text-sm w-[80%] self-center text-center font-regular text-black mt-1">
        {/* BUG: Make the below text dynamic */}
        as a next step Upload Your Employee Attendance Data
      </p>
    </div>
  );
};

export default UploadSuccess;
