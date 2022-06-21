import {
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";

const NAVBAR_LINK_CLASS = `${Classes.MINIMAL}`;
export default function AppNavigation(props) {
  return (
    <Navbar fixedToTop={true}>
      <NavbarGroup>
        <NavbarHeading>Unipe</NavbarHeading>
        <NavbarDivider />
        <Button className={NAVBAR_LINK_CLASS} icon="home" text="Home" />
      </NavbarGroup>
    </Navbar>
  );
}
