import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Checkbox,
  Typography,
} from "@material-tailwind/react";
import { CSVFileInput } from "../atomic/atoms/forms/CSVFileInput";
import { Intent } from "@blueprintjs/core";
import { read, utils } from "xlsx";
import { useToastContext } from "../contexts/ToastContext";
import * as Papa from "papaparse";
import { connect, useSelector } from "react-redux";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { MAX_SIZE } from "../atomic/organisms/csvUploads/CSVUploadDashlet";
import ErrorReportButton from "./ErrorReportButton";
import FullReportButton from "./FullReportButton";
import { useGetUploadedFilesQuery } from "../store/slices/apiSlices/files/filesApiSlice.js";
import ProgressBar from "./ProgressBar.jsx";
import IntervalTimer from "../utils/intervalTimer.js";
import PrimaryButton from "./PrimaryButton.jsx";
import { DateDropdown } from "../components/dashboard/payouts/info/DateDropdown.jsx";
import { TemplateDownloadButton } from "../atomic/atoms/forms/TemplateDownloadButton.jsx";
import CloseIcon from "../atomic/atoms/icons/CloseIcon.jsx";
import UploadSuccess from "./atoms/csvUploads/common/UploadSuccess.jsx";
import UploadStepper, {
  UploadStep,
} from "./atoms/csvUploads/common/UploadStepper.jsx";
import {
  clearActiveFileName,
  initCsvTable,
  setActiveFileName,
} from "../store/slices/csvSlice.js";

const mapOnboardPropsToState = (state, ownProps) => {
  const { module } = ownProps;

  const savedFileName =
    state?.["csvUploads"]?.[module]?.["activeFileName"] ?? "";
  return {
    employerId: state.auth.user?.attributes.sub || "",
    isReadOnly:
      state.auth.user?.attributes["custom:read_only"] === "true" || false,
    savedFileName,
  };
};

const _CsvUploadDialog = ({
  name,
  title,
  description,
  templateData,
  templateDownloadProps,
  headerGroups,
  fields,
  employerId,
  dispatch,
  preProcessing,
  onToastDismiss,
  module,
  savedFileName,
  dateDropDown,
  isReadOnly,
  validations,
  handleOpen,
  setOpen,
  open,
  employeesData,
  headerImage,
  note,
  year,
  month,
}) => {
  const { handleProgressToast, setConfig } = useToastContext();

  const [uploadedFileName, setUploadedFileName] = useState("");
  const [currentFileIndex, setCurrentFileIndex] = useState(null);
  const [uploadStarted, setUploadStarted] = useState(false);
  const [existingEmployees, setExistingEmployees] = useState(0);
  const [checked, setChecked] = useState(false);

  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    intent: "SUCCESS",
    icon: "tick",
  });

  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const [file, setFile] = useState({ object: null, validations: [] });
  const [fileSize, setFileSize] = useState(0);
  const [fileName, setFileName] = useState("");
  const [progressValue, setProgressValue] = useState(0);
  const currentFileName =
    useSelector((state) => state?.csvUploads?.[module]?.activeFileName) ?? "";
  const stats =
    useSelector(
      (state) => state?.csvUploads?.[module]?.tableData[currentFileName]?.stats
    ) ?? "";
  const currentData =
    useSelector(
      (state) => state?.csvUploads?.[module]?.tableData[currentFileName]
    ) ?? [];

  const [uploadStatus, setUploadStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cloudUploadDisabled, setCloudUploadDisabled] = useState(false);

  const S3_BUCKET = `${process.env.REACT_APP_STAGE}-unipe-employer-raw`;
  const REGION = process.env.REACT_APP_S3_REGION;

  const credentials = {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  };

  const [csvUploadButtonIntent, setCsvUploadButtonIntent] = useState(
    Intent.PRIMARY
  );

  const setActiveCSVName = (fileName) => {
    dispatch(setActiveFileName({ fileName, module }));
  };
  const clearActiveCSVName = () => {
    dispatch(clearActiveFileName({ module }));
  };

  const {
    data: uploadedData,
    isLoading,
    error,
    refetch,
  } = useGetUploadedFilesQuery({
    id: employerId,
    module,
  });

  const handleFileUpload = async () => {
    let uploadArray = [];
    let eachElement;
    currentData?.data?.forEach((item, index) => {
      let updatedElement = "";
      let updatedItem = Object.assign({}, item);

      fields?.forEach(({ field, validations }, i) => {
        eachElement = item[field];
        console.log("eachElement", eachElement);
        if (eachElement?.includes("[")) {
          updatedElement = eachElement?.substring(0, eachElement?.indexOf("["));

          updatedItem[field] = updatedElement;
        }
        // if (validLevel == validations.ERROR || validLevel == validations.WARN)
        //   updatedItem[
        //     field
        //   ] = `${item[field]} [${VALIDATIONS_MESSAGES[validations]}]`;
      });
      console.log("updatedItem", updatedItem);
      uploadArray.push(updatedItem);
    });

    // const tableData = getter["data"]();
    let erroredData = uploadArray.filter(
      (row) => row.status[validations.ERROR] >= 1
    );

    const tableCSV = Papa.unparse(
      uploadArray
        ?.filter((row) => !row.status[validations.DELETED])
        .map((row) => {
          let csvRow = Object.assign({}, row);
          delete csvRow?.status;
          delete csvRow?.rowNumber;
          return csvRow;
        })
    );

    const csvFile = new Blob([tableCSV], { type: "text/csv" });
    const timestamp = new Date().getTime();
    const uploadedFileName = `${timestamp}_${file.object.name.replace(
      /\W/g,
      "_"
    )}`;

    setUploadStarted((prev) => !prev);
    setUploadedFileName(uploadedFileName);
    const searchIndex = uploadedData?.body?.findIndex(
      (item) => item.inputFileName == uploadedFileName
    );
    console.log("searchIndex", searchIndex);
    setCurrentFileIndex(searchIndex);

    // console.log("uploadedFileName", uploadedFileName);

    // dispatch(
    //   allEmployeesPanelDetails.util.invalidateTags([
    //     "AllEmployeesPanelDetails",
    //   ])
    // );

    const params = {
      Body: csvFile,
      Bucket: S3_BUCKET,
      Key: `${employerId}/${module}/${timestamp}_${file.object.name.replace(
        /\W/g,
        "_"
      )}`,
    };

    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({ region: REGION, credentials: credentials }),
        params,
        partSize: 1024 * 1024 * 5,
        leavePartsOnError: false,
      });

      if (fileSize > MAX_SIZE) {
        alert("File is too large. Please upload the file in parts.");
      } else {
        await parallelUploads3.done();
        if (erroredData.length) {
          setAlertMessage({
            message: `File ${file.object.name} has been added to the queue successfully but please fix the following errors`,
            intent: "SUCCESS",
            icon: "tick",
          });
          setUploadStatus(true);
          // dispatch(
          //   initBrowserTable({
          //     data: erroredData,
          //     fileName: file.object.name,
          //     headerGroups,
          //     module,
          //   })
          // );
        } else {
          setUploadStatus(true);
          setFile({ object: null, validations: [] });
        }
        setAlertMessage({
          message: `File ${file.object.name} has been added to the queue successfully`,
          intent: "SUCCESS",
          icon: "tick",
        });
        clearActiveCSVName(file.object.name);
        setUploadStatus(true);
        handleProgressToast(file?.object?.name, 900000);
      }
    } catch (err) {
      console.log(err);
      alert(
        "An error occurred while uploading the file. Please try uploading again."
      );
    } finally {
      setCloudUploadDisabled(false);
      setLoading(false);
    }
  };

  const handleFileImport = (data) => {
    console.log("init", data);
    dispatch(
      initCsvTable({
        data: preProcessing(data, year, month),
        fileName: file.object.name,
        fields: headerGroups,
        module: module,
      })
    );
    setActiveCSVName(file.object.name);
  };

  IntervalTimer(
    progressValue,
    setProgressValue,
    uploadStarted,
    uploadedData,
    currentFileIndex,
    refetch,
    uploadedFileName
  );
  const uploadCSV = (e) => {
    setCloudUploadDisabled(true);
    setLoading(true);
    handleFileUpload(e);
  };

  useEffect(() => {
    if (savedFileName) {
      setFile({ object: { name: savedFileName }, validations: [] });
    }
  }, [savedFileName]);

  useEffect(() => {
    if (file?.object?.name && file?.object?.size) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result, {
          type: "string",
          raw: true,
        });
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          handleFileImport(rows);
        }
      };
      reader.readAsArrayBuffer(file.object);
      setConfig((prevState) => ({
        ...prevState,
        onDismiss: onToastDismiss,
      }));
      setCsvUploadButtonIntent(Intent.NONE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file.object, onToastDismiss, savedFileName, setConfig]);

  const handleChange = (e) => {
    const [file] = e.target.files;
    setFileSize(file.size);
    setFileName(file.name);
    setFile({ object: file, validations: [] });
    let count = 0;
    console.log("current data:", currentData?.data);
    currentData?.data?.forEach((item, index) => {
      if (employeesData.find((e) => e.mobile === item.mobile)) {
        /* same result as above, but a different function return type */
        count++;
      }
    });
    setExistingEmployees(count);
  };

  const uploadSuccess =
    uploadStarted &&
    uploadedData?.body?.[currentFileIndex]?.fileStatus === "SUCCESS";

  // const [csvUploadButtonIntent, setCsvUploadButtonIntent] = useState(
  //   Intent.PRIMARY
  // );

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size={"md"}
      dismiss={() => console.log("first")}
    >
      <div className="flex items-center justify-between p-4 pb-0">
        <DialogHeader className="p-0"></DialogHeader>
        <CloseIcon
          onClick={() => {
            setOpen(false);
            setActiveStep(0);
          }}
        />
      </div>
      {uploadSuccess ? (
        <UploadSuccess />
      ) : (
        <UploadStepper
          headerImage={headerImage}
          title={title}
          active={activeStep}
        >
          <UploadStep label="Upload CSV" step={1}>
            {dateDropDown?.exists ? (
              <DateDropdown onChange={dateDropDown.onChange} />
            ) : (
              <></>
            )}
            <p className="text-sm w-[80%] self-center text-center font-normal text-black mt-4 mb-8">
              {description}
            </p>

            <CSVFileInput
              handleChange={handleChange}
              fileName={fileName}
              templateData={templateData}
              templateDownloadProps={templateDownloadProps}
              title={title}
              btnName={name}
              setFileName={setFileName}
              setFile={setFile}
              description={note}
            />
          </UploadStep>
          <UploadStep label="Review" step={2}>
            <p className="text-sm w-[80%]  self-center text-center font-normal text-black mt-4 mb-8">
              Your file is validated and data is ready to be impoted.
            </p>
            <div className="w-full border border-lightGray p-4 rounded-md grid grid-cols-4 gap-4">
              <div className="flex flex-col col-span-1">
                <p className="text-2xl font-bold text-black">
                  {currentData?.data?.length - existingEmployees}
                </p>
                <p className="text-xs text-black">New Employees</p>
              </div>
              <div className="flex flex-col col-span-1">
                <p className="text-2xl font-bold text-black">
                  {existingEmployees}
                </p>
                <p className="text-xs text-black">Existing Employees</p>
              </div>
              <div className="flex flex-col col-span-1">
                <p className="text-2xl font-bold text-danger">
                  {stats[validations.ERROR]}
                </p>
                <p className="text-xs text-black">Errors</p>
              </div>
              <div className="flex flex-col col-span-1">
                <p className="text-2xl font-bold text-danger">
                  {stats[validations.WARN]}
                </p>
                <p className="text-xs text-black">Warning</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 my-4 w-full">
              {/* <TemplateDownloadButton
                    fileName={"Test"}
                    templateData={currentData}
                  /> */}
              <ErrorReportButton
                fileName={"Error_Report"}
                templateData={currentData}
                fields={fields}
              />
              <FullReportButton
                fileName={"Full_Report"}
                templateData={currentData}
                fields={fields}
              />
            </div>
            <div className="flex flex-row items-center justify-start w-full">
              <Checkbox
                color="gray"
                size={"xs"}
                ripple={false}
                value={checked}
                onChange={(v) => {
                  console.log(v.target.value);
                  setChecked(!checked);
                }}
                label={
                  <Typography
                    color="blue-gray"
                    className="flex font-medium text-sm"
                  >
                    In case of conflict, overwrite data of existing employee
                  </Typography>
                }
              />
              {/* <p className="text-xs pl-1 text-gray">
                    In case of conflict, overwrite data of existing employee
                  </p> */}
            </div>
          </UploadStep>
          <UploadStep label="Import" step={3}>
            {/* <img
                  src="https://img.freepik.com/premium-vector/cloud-upload-icon-flat-color-style_755164-834.jpg"
                  className="h-24 w-24 self-center"
                /> */}
            <p className="text-lg w-[80%] self-center text-center font-semibold text-black mt-4">
              {progressValue != 100
                ? "Your file is uploading..."
                : uploadedData?.body?.[0]?.fileStatus === "FAILED"
                ? "ERROR IN UPLOADING FILE"
                : "Your data has been imported successfully"}
            </p>
            <ProgressBar value={progressValue} />
          </UploadStep>
        </UploadStepper>
      )}
      <DialogFooter className="space-x-2 items-center justify-center mb-4 mt-4">
        {activeStep == 0 && fileName && (
          <Button
            onClick={() => {
              setActiveStep((cur) => cur + 1);
            }}
            className="w-1/3 rounded-md bg-primary"
            disabled={!fileName}
          >
            Next
          </Button>
        )}
        {activeStep == 1 && (
          <>
            <Button
              variant="outlined"
              color="black"
              onClick={handlePrev}
              className="w-1/3 rounded-md"
            >
              Back
            </Button>
            <Button
              onClick={() => {
                setActiveStep((cur) => cur + 1);
                uploadCSV();
              }}
              className="w-1/3 rounded-md bg-primary"
              disabled={!checked || stats[validations.ERROR] > 0}
            >
              {activeStep == 1 ? "Import" : "Next"}
            </Button>
          </>
        )}

        {activeStep == 2 && (
          <Button
            onClick={() => {
              setActiveStep(0);
              setOpen(false);
            }}
            className="w-1/3 rounded-md bg-primary"
            disabled={progressValue != 100}
          >
            Done
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
};

export const CsvUploadDialog = connect(mapOnboardPropsToState)(
  _CsvUploadDialog
);
