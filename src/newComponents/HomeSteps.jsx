import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import steps_background from "../assets/background/steps_background.png";
import { useState } from "react";
import { TemplateDownloadButton } from "../atomic/atoms/forms/TemplateDownloadButton";
import PrimaryButton from "./PrimaryButton";

export default function HomeSteps({
  header,
  subHeader,
  templateData,
  templateDownloadProps,
  stepTitle,
  stepSubtitle,
  setOpen,
  headerImage,
  note,
  btnName,
}) {
  return (
    <Card className="mt-6 w-1/2 p-0 w-[80%] rounded-sm">
      <CardHeader
        style={{ backgroundImage: `url(${steps_background})` }}
        className="h-36 w-full shadow-none m-0 bg-no-repeat bg-cover bg-center flex flex-col p-4 px-12 justify-end rounded-t-sm rounded-b-none"
        floated={false}
      >
        <Typography variant="h3" className="text-[#215B6B]">
          {header}
        </Typography>
      </CardHeader>
      <CardBody className="p-8 px-12">
        <Typography variant="small" className="text-black">
          {subHeader}
        </Typography>
        <div className="flex flex-row items-center justify-between my-16">
          <img src={headerImage} className="h-24 w-18" />
          <div className="flex w-full flex-col items-start pl-8">
            <Typography variant="h6" color="black">
              {stepTitle}
            </Typography>
            <Typography
              variant="paragraph"
              className="my-2 text-xs text-gray font-normal"
            >
              {stepSubtitle}
            </Typography>
          </div>
        </div>
        <div>
          <div className="flex flex-row w-full items-center justify-center">
            <TemplateDownloadButton
              title={`Download ${btnName} Template`}
              fileName={btnName + " Upload"}
              templateData={templateData}
              {...templateDownloadProps}
            />

            <PrimaryButton
              title={`Upload ${btnName} CSV`}
              color="primary"
              className={"w-full"}
              onClick={(e) => {
                setOpen(true);
              }}
            />
          </div>
          <p className="text-xs text-center mt-4 mx-4 text-gray">{note}</p>
        </div>
      </CardBody>
    </Card>
  );
}
