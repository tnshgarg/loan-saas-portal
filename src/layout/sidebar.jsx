import { Classes, Colors, Drawer, Position } from "@blueprintjs/core";
import { THEME } from "../theme/base";
import NAV_MENU from "./navigation";
import SidebarItem from "./components/SidebarItem";
import unipeLogo from "../theme/logo_small.png";

const { sidebar } = THEME;

export function AppSidebar() {
  console.log(NAV_MENU);
  const sideItems = NAV_MENU.map((navItem) => (
    <SidebarItem key={navItem.route} {...navItem} />
  ));
  return (
    <div style={{ position: "absolute", top: "0px", left: "0px", height: "100vh", width: sidebar.width }}>
      <Drawer
        className={Classes.DARK}
        usePortal={false}
        hasBackdrop={false}
        size={sidebar.width}
        isOpen={"true"}
        enforceFocus={false}
        autoFocus={false}
        position={Position.LEFT}

      >
        <div style={{
          textAlign: "center",
          width: sidebar.width,
          padding: "1em",
          backgroundColor: Colors.GREEN5,
          marginBottom: "1em"
        }}>
          <img src={unipeLogo} alt="unipe logo" style={{ width: "100%" }} />
        </div>
        {sideItems}
      </Drawer>
    </div>
  );
}