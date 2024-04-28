import { Button, Card, Classes, Divider, Icon, InputGroup, Intent, Menu, PopoverPosition } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { matchSorter } from "match-sorter";
import { useState } from "react";
import { Spacer } from "../../atoms/layouts/alignment";


function FilterList({ filterList, filterState, onChange }) {
    let [filterChanges, changeFilters] = useState(Object.assign(filterState, {}))
    let [searchList, setSearchList] = useState(filterList)
    const updatedState = {
        ...filterState,
        ...filterChanges
    }
    // const numSelected = Object.values(filterChanges).reduce((s, a) => s + a, 0)
    const setAll = (state) => {
        let updatedFilters = {}
        Object.keys(updatedState).forEach(k => {
            updatedFilters[k] = state
        })
        changeFilters(updatedFilters)
    }
    
    return (
        <Card style={{ fontWeight: 400, zIndex: 0 }}>
            <InputGroup
                type="search"
                leftIcon="search"
                onChange={(e) => {
                    let searchText = e.target.value;
                    setSearchList(matchSorter(filterList, searchText))
                }}
            />

            <small>
                <br />
                <a onClick={() => setAll(true)}>Select All</a>
                {" - "}
                <a onClick={() => setAll(false)}>Clear All</a>
                <br />
            </small>
            <Divider/>
            <Menu style={{ maxHeight: "13em", overflowY: "scroll", }}>
                {searchList.map((filterValue, i) => {
                    return (
                        <div
                            className="hoverBackground"
                            style={{
                                height: "2.5em",
                                paddingTop: "0.6em",
                                paddingRight: "1em",
                                fontSize: "1em",
                                cursor: "pointer",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis"
                            }}
                            key={`filter-value-${filterValue}-${i}`}
                            onClick={() => {
                                changeFilters({
                                    ...filterChanges,
                                    [filterValue]: !filterChanges[filterValue]
                                })
                            }}>
                            <Icon icon={"blank"} />
                            <Icon icon={updatedState[filterValue] ? "tick" : "blank"} />
                            <Icon icon={"blank"} />
                            {filterValue}
                        </div>
                    )
                })}
            </Menu>
            <Divider/>
            <div style={{textAlign: "right"}}>
            <Button className={Classes.POPOVER_DISMISS}> Cancel </Button>
            <Spacer/>
            <Button className={Classes.POPOVER_DISMISS} intent={Intent.SUCCESS} onClick={() => onChange(updatedState)}> Okay </Button>
            </div>
        </Card>
    )
}
export function ColumnFilter({ header, filters, onFilter }) {
    filters = filters || {}
    onFilter = onFilter || (() => {})
    let filterEnabled = Object.values(filters).some(x => !x)
    let filterValues = Object.keys(filters)
    if (filterValues.length < 2) {
        return <></>
    }
    console.log({ filterEnabled, filterValues })

    return (
        <div
            key={`column-filter-${header}`}
            style={{ position: "absolute", top: "-0.425em", right: "-0.55em" }}

        >
            <Popover2
                minimal
                position={PopoverPosition.RIGHT_TOP}
                usePortal={true}

                content={
                    <FilterList
                        filterList={filterValues}
                        filterState={filters}
                        onChange={onFilter}
                    />
                }>
                <Button icon={filterEnabled ? "filter-keep" : "filter"} 
                    minimal
                    active={filterEnabled} 
                    intent={filterEnabled ? Intent.SUCCESS : Intent.NONE}
                />
            </Popover2>
        </div>
    )
}