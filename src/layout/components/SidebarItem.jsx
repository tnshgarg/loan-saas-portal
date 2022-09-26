import {
  Colors,
  Icon,
  Menu,
  MenuDivider,
  MenuItem,
  Card,
} from "@blueprintjs/core";
import { THEME } from "../../theme/base";
import { Popover2 } from "@blueprintjs/popover2";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const {
  sidebar: { iconSize, iconPadding },
  cornerRadius,
} = THEME;

function SidebarMenu(props) {
  const { title, items, parent } = props;
  const navigate = useNavigate();
  return (
    <Card style={{ borderRadius: cornerRadius }}>
      <Menu key={parent}>
        {title ? <MenuDivider title={title} /> : ""}
        {(items || []).map((item) => (
          <MenuItem
            icon={item.icon}
            text={item.name}
            onClick={() => {
              navigate(`${parent}${item.route}`, { replace: true });
            }}
          />
        ))}
      </Menu>
    </Card>
  );
}

function PopupMenuWrapper(props) {
  const { name, items, route, children } = props;
  const navigate = useNavigate();
  if (items && items.length)
    return (
      <Popover2
        interactionKind={"hover"}
        content={<SidebarMenu parent={route} title={name} items={items} />}
        usePortal={false}
      >
        {children}
      </Popover2>
    );
  return (
    <div
      onClick={() => {
        navigate(route, { replace: true });
      }}
      style={{ cursor: "pointer" }}
    >
      {children}
    </div>
  );
}

export default function SidebarItem(props) {
  const { icon, name, showTitle, children, route } = props;
  const { pathname } = useLocation();
  const isActive = pathname.indexOf(route) === 0;
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => {
    setHovered(!hovered);
  };
  // techdebt: code repetition
  return (
    <div style={{ textAlign: "center", padding: "1em" }}>
      <PopupMenuWrapper items={children} name={name} route={route}>
        <div
          style={{
            backgroundColor: hovered
              ? Colors.GRAY1
              : isActive
              ? Colors.GREEN5
              : "",
            padding: iconPadding,
            borderRadius: cornerRadius,
          }}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
        >
          <Icon icon={icon} size={iconSize} />
          {showTitle ? (
            <p>
              <small>{name}</small>
            </p>
          ) : (
            ""
          )}
        </div>
      </PopupMenuWrapper>
    </div>
  );
}
