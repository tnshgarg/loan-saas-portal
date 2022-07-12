import { Colors } from "@blueprintjs/core";

export const THEME = {
  backgroundColor: Colors.LIGHT_GRAY3,
  primary: Colors.BLUE3,
  sidebar: {
    width: "5em",
    iconSize: "1.2em",
    iconPadding: "0.4em",
    showTitle: false,
  },
  navbar: {
    height: "5em",
  },
  cornerRadius: "0.3em",
};

// TECHDEBT: move this to a suitable place where all dynamic styling is handled)
document.body.style.backgroundColor = THEME.backgroundColor;
