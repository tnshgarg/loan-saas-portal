import { useEffect, useState } from "react";

function IntervalTimer(
  progressValue,
  setProgressValue,
  uploadStarted,
  uploadedData,
  currentFileIndex,
  refetch,
  uploadedFileName
) {
  useEffect(() => {
    const counterValid = progressValue < 100;
    console.log("uploadedData", uploadedData);
    let searchIndex = uploadedData?.body?.findIndex(
      (item) => item.inputFileName == uploadedFileName
    );
    console.log("searchIndex", searchIndex);
    console.log("uploadedFileName", uploadedFileName);
    const intervalId =
      counterValid &&
      setInterval(() => {
        console.log(
          "Status",
          // uploadedData?.body?.[currentFileIndex]?.fileStatus,
          searchIndex
        );
        if (uploadedData?.body?.[searchIndex]?.fileStatus === "SUCCESS") {
          setProgressValue(100);
          clearInterval(intervalId);
        } else if (uploadedData?.body?.[searchIndex]?.fileStatus === "FAILED") {
          alert(uploadedData?.body?.[searchIndex]?.errorMessage);
          setProgressValue(100);
          clearInterval(intervalId);
          console.log("FAILED");
        } else if (uploadStarted) {
          refetch();
          if (progressValue < 95)
            setProgressValue((prevProgress) => prevProgress + 5);
        } else {
          clearInterval(intervalId);
        }
      }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [progressValue, uploadStarted, uploadedData, currentFileIndex, refetch]);
}

export default IntervalTimer;
