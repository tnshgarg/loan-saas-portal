import {
  Alignment,
  Breadcrumbs,
  Button,
  Intent,
  Menu,
  MenuItem,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Position,
} from "@blueprintjs/core";
import { THEME } from "../theme/base";
import { useLocation, useNavigate } from "react-router-dom";
import { BREAD_CRUMBS } from "./navigation";
import { connect } from "react-redux";
import { Popover2 } from "@blueprintjs/popover2";
import { logout } from "../store/slices/authSlice";
import { AppToaster } from "../contexts/ToastContext";

function _UserMenuItem(props) {
  const { isLoggedIn, user, dispatch } = props;
  const navigate = useNavigate();
  if (!isLoggedIn) {
    return (
      <Button
        onClick={() => {
          navigate("auth/login", { replace: true });
        }}
      >
        {" "}
        Log In
      </Button>
    );
  }
  let userId = user?.attributes?.sub ?? "";
  return (
    <Popover2
      minimal={true}
      content={
        <Menu key={"user-menu"}>
          <MenuItem
            text={`UserId: ${userId.substring(0, 5)}..`}
            icon={"duplicate"}
            onClick={() => {
              navigator.clipboard.writeText(userId);
              AppToaster.show({
                message: `Text "${userId}" Copied`,
                intent: Intent.SUCCESS,
              });
            }}
          />
          <MenuItem
            icon="log-out"
            text="Logout"
            onClick={() => {
              dispatch(logout());
            }}
          />
        </Menu>
      }
      position={Position.BOTTOM_LEFT}
    >
      <Button
        icon="user"
        text={`Hi  ${user.attributes.name}!`}
        minimal={true}
      />
    </Popover2>
  );
}

function mapStateToProps(state) {
  return {
    ...state.auth,
  };
}

const UserMenuItem = connect(mapStateToProps)(_UserMenuItem);
export default function AppNavigation(props) {
  const { pathname } = useLocation();
  const breadCrumbs = (BREAD_CRUMBS[pathname] || []).map((item) => ({
    href: item.fullRoute,
    icon: item.icon,
    text: item.name,
  }));
  return (
    <Navbar
      style={{
        height: THEME.navbar.height,
        paddingLeft: props.sidebarWidth,
        paddingTop: "0.7em",
      }}
      fixedToTop={true}
    >
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading />
        <Breadcrumbs items={breadCrumbs} />
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <UserMenuItem />
      </NavbarGroup>
    </Navbar>
  );
}
