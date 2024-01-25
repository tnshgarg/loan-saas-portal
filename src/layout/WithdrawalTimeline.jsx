import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useGetWithdrawalTimelineQuery } from "../store/slices/apiSlices/employer/ewaApiSlice";
import FieldItem from "./FieldItem";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 m-4 ml-1 text-gray"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const WithdrawalTimeline = ({ employeeId }) => {
  const [open, setOpen] = React.useState(0);
  //FIXME: use lazy query instead of useQuery
  const responseFromQuery = useGetWithdrawalTimelineQuery(employeeId);
  const { data, isLoading, error } = responseFromQuery;
  console.log("WithdrawalTimeline:", data?.body);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return data?.body?.map((item, index) => {
    const timestamp = item.availedAt;
    const dateObject = new Date(timestamp);
    const day = dateObject.getUTCDate();
    const month = dateObject.toLocaleString("default", { month: "short" });
    const year = dateObject.getUTCFullYear().toString().slice(-2);
    return (
      <Accordion
        open={open === index + 1}
        icon={<Icon id={index + 1} open={open} />}
        className="focus:outline-none active:outline-none rounded-xl drop-shadow-md mt-8 bg-white"
        style={{ outline: "none" }}
      >
        <AccordionHeader
          onClick={() => handleOpen(index + 1)}
          className="flex flex-row w-full rounded-xl m-0 p-0 border-white border-0 focus:outline-none"
        >
          <div className="bg-lightgray_01 px-4 py-2 rounded-l-xl flex flex-col items-center">
            <Typography className="text-2xl font-medium text-gray">
              {day}
            </Typography>
            <Typography className="text-[10px] font-regular text-gray">
              {month + "'" + year}
            </Typography>
          </div>
          <div className="p-4 flex flex-col w-full">
            <Typography className="text-xs text-danger">
              ₹{item.loanAmount}
            </Typography>
            <Typography className="text-xs text-gray">
              Due date: {new Date(item.dueDate).toLocaleDateString()}
            </Typography>
          </div>
          <div className="bg-primary rounded-xl">
            <Typography className="text-[10px] mx-4 my-1 font-semibold text-white">
              Due
            </Typography>
          </div>
        </AccordionHeader>
        <AccordionBody className="w-full grid grid-cols-3 p-4 pt-0">
          <FieldItem label={"On-Demand Salary "} value={item.loanAmount} />
          <FieldItem
            label={"Loan Account Number "}
            value={item.loanAccountNumber}
          />
          <FieldItem
            label={"Net Disbursement Amount"}
            value={item.netDisbursementAmount}
          />
          <FieldItem label={"Lender"} value={item.lender} />
        </AccordionBody>
      </Accordion>
    );
  });
};

export default WithdrawalTimeline;
