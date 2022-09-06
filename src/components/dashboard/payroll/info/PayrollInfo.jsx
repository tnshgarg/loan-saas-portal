import { Dashlet } from "../../../../atomic/molecules/dashlets/dashlet";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Intent } from "@blueprintjs/core";
import { connect } from "react-redux";

// tech-debt: move to utilities or atoms
const Spacer = () => <>&nbsp;&nbsp;&nbsp;&nbsp;</>;

function mapStateToProps(state, ownProps) {}

export function _PayrollInfo({ dispatch }) {
  return (
    <>
      <Dashlet
        icon={<FontAwesomeIcon icon={faMoneyCheck} />}
        title={"Payout Details"}
        actions={
          <>
            <Button intent={Intent.PRIMARY}>Process Payout</Button>
            <Spacer />
            <Button intent={Intent.SUCCESS}>Update Changes</Button>
          </>
        }
      ></Dashlet>
    </>
  );
}

export const PayrollInfo = connect(mapStateToProps)(_PayrollInfo);
