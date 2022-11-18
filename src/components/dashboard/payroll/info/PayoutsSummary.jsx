import Metrics, {
  MetricsContainer,
} from "../../../../atomic/molecules/metrics/metrics";
import { Colors, Intent } from "@blueprintjs/core";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// techdebt: move to a utils/addons file
Number.prototype.toINR = function () {
  return this.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, "$1,");
};

export function PayoutsSummary({ data, loading }) {
  const metrics = {},
    totals = {};
  if (data) {
    data.forEach((item) => {
      metrics[item.status] = (metrics[item.status] ?? 0) + 1;
      totals[item.status] =
        (totals[item.status] ?? 0) + parseInt(item["amount"]);
    });
  }
  console.log("metrics", metrics, totals);
  return (
    <MetricsContainer>
      <Metrics
        title={"Pending"}
        icon={"time"}
        intent={Intent.WARNING}
        primary={{
          count: (totals["AWAITING_CONFIRMATION"] ?? 0).toINR(),
          title: "INR",
          color:
            (metrics["AWAITING_CONFIRMATION"] ?? 0) < 1
              ? Colors.GREEN1
              : Colors.GOLD3,
        }}
        loading={loading}
        secondary={[
          {
            title: "Pending",
            icon: <FontAwesomeIcon icon={faMoneyCheck} size={"1x"} />,
            count: metrics["AWAITING_CONFIRMATION"] ?? 0,
            intent:
              (metrics["AWAITING_CONFIRMATION"] ?? 0) < 1
                ? Intent.SUCCESS
                : Intent.WARNING,
          },
        ]}
      />
      <Metrics
        title={"Processing"}
        loading={loading}
        intent={Intent.PRIMARY}
        icon={"social-media"}
        primary={{
          title: "INR",
          icon: <FontAwesomeIcon icon={faMoneyCheck} size={"1x"} />,
          count: (
            (totals["CONFIRMED"] ?? 0) + (totals["INPROGRESS"] ?? 0)
          ).toINR(),
        }}
        secondary={[
          {
            title: "Confirmed",
            icon: <FontAwesomeIcon icon={faMoneyCheck} size={"1x"} />,
            count: metrics["CONFIRMED"] ?? 0,
          },
          {
            title: "In Progress",
            icon: <FontAwesomeIcon icon={faMoneyCheck} size={"1x"} />,
            count: metrics["INPROGRESS"] ?? 0,
          },
        ]}
      />
      <Metrics
        title={"Completed"}
        intent={Intent.SUCCESS}
        loading={loading}
        icon={"confirm"}
        primary={{
          title: "INR",
          icon: <FontAwesomeIcon icon={faMoneyCheck} size={"1x"} />,
          count: (totals["SUCCESS"] ?? 0).toINR(),
        }}
        secondary={[
          {
            title: "Successful",
            icon: <FontAwesomeIcon icon={faMoneyCheck} size={"1x"} />,
            count: metrics["SUCCESS"] ?? 0,
            intent: Intent.SUCCESS,
          },
        ]}
      />
      <Metrics
        title={"Errors"}
        icon={"issue"}
        intent={Intent.DANGER}
        loading={loading}
        primary={{
          title: "INR",
          icon: <FontAwesomeIcon icon={faMoneyCheck} size={"1x"} />,
          count: (totals["ERROR"] ?? 0).toINR(),
          color: Colors.RED3,
        }}
        secondary={[
          {
            title: "Failed",
            icon: <FontAwesomeIcon icon={faMoneyCheck} size={"1x"} />,
            count: metrics["ERROR"] ?? 0,
            intent: Intent.DANGER,
          },
        ]}
      />
    </MetricsContainer>
  );
}
