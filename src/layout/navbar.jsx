import {
  Alignment,
  Button,
  Classes,
  H5,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Switch,
} from "@blueprintjs/core";
import { THEME } from "../theme/base";

const NAVBAR_LINK_CLASS = `${Classes.MINIMAL}`;
export default function AppNavigation(props) {
  return (
    <Navbar fixedToTop={true}>
      <NavbarGroup>
        <NavbarHeading>Pay Rocket</NavbarHeading>
        <NavbarDivider />
        <Button className={NAVBAR_LINK_CLASS} icon="home" text="Home" />
        <Button className={NAVBAR_LINK_CLASS} icon="document" text="Files" />
      </NavbarGroup>
    </Navbar>
  );
}
