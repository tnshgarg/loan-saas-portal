import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import steps_background from "../../../../assets/background/steps_background.png";
import { useState } from "react";

import employee_icon from "../../../../assets/icons/employee_data.png";
import { HEADER_LIST } from "../../../../components/dashboard/employee/onboarding/fields";
import PrimaryButton from "../../../PrimaryButton";
import { TemplateDownloadButton } from "../../../../atomic/atoms/forms/TemplateDownloadButton";

export default function OnboardingStep({ setOpen }) {
  return (
    <Card className="mt-6 w-1/2 p-0 w-[80%] rounded-sm">
      <CardHeader
        style={{ backgroundImage: `url(${steps_background})` }}
        className="h-36 w-full shadow-none m-0 bg-no-repeat bg-cover bg-center flex flex-col p-4 px-12 justify-end rounded-t-sm rounded-b-none"
        floated={false}
      >
        <Typography variant="h3" className="text-[#215B6B]">
          Welcome to Unipe
        </Typography>
      </CardHeader>
      <CardBody className="p-8 px-12">
        <Typography variant="small" className="text-black">
          Kickstart your journey with us. Just a few simple steps, and your
          employees will be onboarded in no time.
        </Typography>
        <div className="flex flex-row items-center justify-between my-16">
          <img src={employee_icon} className="h-24 w-18" />
          <div className="flex w-full flex-col items-start pl-8">
            <Typography variant="h6" color="black">
              Step 1: Import Your Employee Data
            </Typography>
            <Typography
              variant="paragraph"
              className="my-2 text-xs text-gray font-normal"
            >
              Start by uploading your employee data. If you're unsure, download
              our template to guide you
            </Typography>
          </div>
        </div>
        <div>
          <div className="flex flex-row w-full items-center justify-center">
            <TemplateDownloadButton
              title={`Download Employees Template`}
              fileName={"Employees Upload"}
              templateData={HEADER_LIST}
            />

            <PrimaryButton
              title={`Upload Employees CSV`}
              color="primary"
              className={"w-full"}
              onClick={(e) => {
                setOpen(true);
              }}
            />
          </div>
          <p className="text-xs text-center mt-4 mx-4 text-gray">
            Quick Tip: Always ensure your data is up-to-date and accurate. It
            helps in ensuring seamless processing and payouts.
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
