import { Colors } from '@blueprintjs/core';


export const THEME = {
    backgroundColor: Colors.LIGHT_GRAY3,
    primary: Colors.BLUE3
}

// TECHDEBT: move this to a suitable place where all dynamic styling is handled)
document.body.style.backgroundColor = THEME.backgroundColor