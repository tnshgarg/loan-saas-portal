import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function VideoCard() {
  return (
    <Card className="w-full shadow-none">
      <CardHeader floated={false} className="shadow-none">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          How to use Unipe?
        </Typography>
        <Typography>Watch demo</Typography>
      </CardHeader>
      <CardBody>
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="card-image"
          //   className="h-48"
        />
      </CardBody>
    </Card>
  );
}
