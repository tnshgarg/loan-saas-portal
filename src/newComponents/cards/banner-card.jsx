import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export default function BannerCard() {
  return (
    <Card className="w-full rounded-lg bg-[#EAEFFF] shadow-none">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          No out-of-pocket expense
        </Typography>
        <Typography>Unipe funds the advance salary requests</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <a href="#" className="inline-block">
          <Button
            onClick={() => {
              window.open("https://www.unipe.money/for-employers", "_blank");
            }}
            size="sm"
            variant="text"
            className="flex items-center gap-2"
          >
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
