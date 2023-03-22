
import {
    Intent,
    Tag,
} from "@blueprintjs/core";
import {
    FS,
} from "../../../components/dashboard/employee/onboarding/validations";

export function ErrorFiltersToolbar({stats,tableActions,filters}) {
    
    return (
        <div style={{ textAlign: "center", paddingBottom: "1em" }}>
                {stats[FS.ERROR] ? (
                    <>
                        <Tag
                            large
                            minimal={!filters.includes(FS.ERROR)}
                            interactive={true}
                            intent={Intent.DANGER}
                            icon={"error"}
                            rightIcon={
                                <input type="checkbox" checked={filters.includes(FS.ERROR)} />
                            }
                            onClick={() => tableActions.updateErrorFilters(FS.ERROR)}
                        >
                            {stats[FS.ERROR]} problems need immediate attention
                        </Tag>
                        &nbsp;&nbsp;
                    </>
                ) : (
                    ""
                )}
                {stats[FS.WARN] ? (
                    <>
                        <Tag
                            large={true}
                            minimal={!filters.includes(FS.WARN)}
                            interactive={true}
                            intent={Intent.WARNING}
                            icon={"warning-sign"}
                            rightIcon={
                                <input type="checkbox" checked={filters.includes(FS.WARN)} />
                            }
                            onClick={() => tableActions.updateErrorFilters(FS.WARN)}
                        >
                            {stats[FS.WARN]} fields are incorrect, but can be fixed later
                        </Tag>
                    </>
                ) : (
                    ""
                )}
            </div>
    )
}