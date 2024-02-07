import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  List,
  ListItem,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";
import PrimaryButton from "../PrimaryButton";

export default function WithdrawalsCard({ title, className, footer, data }) {
  return (
    <Card className={`rounded-lg shadow-none ${className}`}>
      <div className="flex flex-row w-full justify-between">
        <CardHeader
          floated={false}
          className="w-full shadow-none rounded-none flex flex-row justify-between"
        >
          <Typography className="text-xs font-medium">{title}</Typography>
          <Typography className="text-xs font-medium text-secondary">
            View All
          </Typography>
        </CardHeader>
      </div>
      <CardBody className="p-4 ">
        <List className="w-full p-0">
          {data.map(({ loanAmount, dueDate }) => {
            const month = new Intl.DateTimeFormat("en-US", {
              month: "short",
            }).format(new Date());
            const year = new Date(dueDate).getFullYear();

            return (
              <ListItem
                ripple={false}
                className="px-3 my-1 py-1 w-full bg-lightgray_01 rounded-md"
              >
                <div>
                  <Typography className="text-xs font-medium text-black">
                    ₹{loanAmount}
                  </Typography>
                  <Typography className="text-xs text-[10px] text-black">
                    {month} {year}
                  </Typography>
                </div>

                <ListItemSuffix>
                  <PrimaryButton
                    title={"Pay Now"}
                    className={"h-8 mr-0"}
                    size={"sm"}
                    color={"primary"}
                    variant={"outlined"}
                  />
                </ListItemSuffix>
              </ListItem>
            );
          })}
        </List>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 p-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
