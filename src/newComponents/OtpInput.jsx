// import React, { useState, useRef, useEffect } from "react";

// function OTPInput({ length = 6, otp, setOtp }) {
//   const otpFields = Array(length).fill(null);
//   const otpInputRefs = useRef(otpFields.map(() => React.createRef()));

//   const handleInputChange = (e, index) => {
//     const newOTP = [...otp];
//     newOTP[index] = e.target.value;

//     setOtp(newOTP);

//     // Move focus to the next input field if the input is not empty
//     if (e.target.value !== "" && index < length - 1) {
//       otpInputRefs.current[index + 1].current.focus();
//     } else if (e.target.value === "" && index > 0) {
//       // If the input is cleared and not the first field, set autofocus to the current input
//       otpInputRefs.current[index].current.focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && index > 0 && otp[index] === "") {
//       // If Backspace is pressed and the current input is empty, move focus to the previous input
//       otpInputRefs.current[index - 1].focus();
//     }
//   };

//   // Set autofocus on the first input field after rendering
//   useEffect(() => {
//     otpInputRefs.current[0].current.focus();
//   }, []);

//   return (
//     <div className="w-full items-center flex flex-row justify-center">
//       {otp.map((value, index) => (
//         <input
//           key={index}
//           type="text"
//           value={value}
//           onChange={(e) => handleInputChange(e, index)}
//           onKeyDown={(e) => handleKeyDown(e, index)}
//           maxLength={1}
//           ref={otpInputRefs.current[index]}
//           className="rounded-[3px] w-12 h-12 !border !border-lightGray bg-white text-gray shadow-none placeholder:text-gray mx-2 text-md font-semibold text-center"
//         />
//       ))}
//     </div>
//   );
// }

// export default OTPInput;

import OtpInput from "react-otp-input";
import { useState } from "react";

export default function OTPInput({ otp, setOtp }) {
  const [code, setCode] = useState("");

  const handleChange = (code) => setCode(code);

  return (
    <div className="flex flex-col items-center">
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        inputStyle={{
          border: "1px solid",
          borderColor: "#DDE5E5",
          borderRadius: "8px",
          width: "54px",
          height: "54px",
          fontSize: "16px",
          color: "#000",
          fontWeight: "400",
          caretColor: "blue",
        }}
        shouldAutoFocus
        renderSeparator={<span style={{ width: "8px" }}></span>}
        renderInput={(props) => <input {...props} />}
      />
    </div>
  );
}
