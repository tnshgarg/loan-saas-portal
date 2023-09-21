import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

export function StatisticsCard({
  color,
  icon,
  title,
  value,
  footer,
  data,
  span,
}) {
  console.log({ span });
  return (
    <Card className={`rounded-lg shadow-none col-span-${span}`}>
      <div className="flex flex-row w-full justify-between">
        <CardHeader floated={false} className="col-span-1 shadow-none">
          <Typography className="col-span-3 text-sm">{title}</Typography>
        </CardHeader>

        <CardHeader
          floated={false}
          className="grid h-12 w-12 place-items-center rounded-md bg-gradient-to-b from-[#d9f4a6] to-[#e2f798]"
          // variant="gradient"
          // color={color}
        >
          {icon}
        </CardHeader>
      </div>

      <CardBody className="p-4 text-left pt-0">
        <div className={`grid grid-cols-${data.length} gap-x-2`}>
          {data.map(({ label, value, type, color }, index) => (
            <div
              className={`flex flex-col pl-${index != 0 ? 4 : 0} ${
                data.length > 2 && index + 1 != data.length
                  ? "border-lightGray border-r"
                  : null
              }`}
            >
              <Typography variant="h3" className={`text-${color}`}>
                {value}
              </Typography>
              <Typography variant="small" className="font-normal text-black">
                {label}
              </Typography>
            </div>
          ))}
        </div>
      </CardBody>

      {footer && (
        <CardFooter className="border-t border-blue-gray-50 p-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
