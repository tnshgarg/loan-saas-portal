import { Button, ButtonGroup, Intent } from "@blueprintjs/core";

export function HeaderGroupsToolbar({headerGroups,visibility,onToggle}) {
  return (
    <div style={{textAlign: "center"}}>
      {headerGroups && headerGroups.length ? (
        <>
          <ButtonGroup>
            <Button disabled minimal>
              {" "}
              Choose Columns to view{" "}
            </Button>
            <Button
              active={!visibility.hiddenHeaders["All"]}
              intent={visibility.hiddenHeaders["All"] ? Intent.NONE : Intent.PRIMARY}
              onClick={() => onToggle("All")}
            >
              {" "}
              {"All"}{" "}
            </Button>

            {headerGroups.map((item) => (
              <Button
                key={`header-groups-toolbar-${item.Header}`}
                active={!visibility.hiddenHeaders[item.Header]}
                intent={visibility.hiddenHeaders[item.Header] ? Intent.NONE : Intent.PRIMARY}
                onClick={() => onToggle(item.Header)}
              >
                {" "}
                {item.Header}{" "}
              </Button>
            ))}
          </ButtonGroup>
          <br />
          <small>&nbsp;</small>
        </>
      ) : (
        ""
      )}
    </div>
  )
}