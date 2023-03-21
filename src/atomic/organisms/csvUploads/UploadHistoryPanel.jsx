import { Button, Intent, NonIdealState, Spinner, Tag } from "@blueprintjs/core";
import { isObject } from "lodash";
import { matchSorter } from "match-sorter";
import { useEffect, useMemo, useState } from "react";
import {
  useGetUploadedFilesQuery,
  useLazyGetUploadedFilesQuery,
} from "../../../store/slices/apiSlices/files/filesApiSlice";
import { Dashlet } from "../../molecules/dashlets/dashlet";
import Table from "../table";

const TABLE_COLUMNS = ["File Name", "Upload Time", "Status"];
const reformatFilesData = (filesData) => {
  return filesData.map((file) => {
    const { inputFileName, inputFileStatus, inputFileUrl,uploadedAt } = file;
    return {
      "File Name": inputFileName,
      "Upload Time": uploadedAt,
      Status: inputFileStatus,
      inputFileUrl,
    };
  });
};

const FILTER_INPUT_STYLING = {
  border: "1px solid rgba(0, 0, 0, 0.3)",
  marginTop: "5px",
  padding: "5px 5px",
};

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      style={FILTER_INPUT_STYLING}
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val) => !val;

const UploadHistoryTable = ({ employerId, module, handlers }) => {
  const responseFromQuery = useGetUploadedFilesQuery({
    id: employerId,
    module,
  });
  const { data, isLoading, error, refetch } = responseFromQuery;
  console.log({ data, isLoading, error, refetch });
  const responseFromLazyQuery = useLazyGetUploadedFilesQuery();
  const [
    trigger,
    { data: lazyData, isLoading: lazyIsLoading, error: lazyError },
  ] = responseFromLazyQuery;

  const [fetchedRows, setFetchedRows] = useState([]);

  const setFetchedRowsFromBody = (body) => {
    const fetchedRowsData = reformatFilesData(body);
    setFetchedRows(fetchedRowsData);
  };

  useEffect(() => {
    if (data) {
      const body = data?.body ?? [];
      setFetchedRowsFromBody(body);
    }
  }, [data]);

  useEffect(() => {
    if (lazyData) {
      const body = lazyData.body ?? [];
      setFetchedRowsFromBody(body);
    }
  }, [lazyData]);

  const columns = useMemo(
    () =>
      TABLE_COLUMNS.map((header) => {
        if (isObject(header)) {
          return {
            Header: header.Header,
            columns: header.columns,
          };
        }
        return {
          Header: header,
          accessor: header,
        };
      }),
    []
  );

  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const cellProps = (cell) => {
    let bgColor = "white";
    if (cell?.value) {
      if (["COMPLETED"].includes(cell.value)) {
        bgColor = "rgb(204, 255, 216, 0.5)";
      } else if (cell.value.includes("PENDING")) {
        bgColor = "rgb(247, 252, 162, 0.5)";
      } else if (["ERROR", "INACTIVE"].includes(cell.value)) {
        bgColor = "rgb(255, 215, 213, 0.5)";
      }
    }

    return {
      style: {
        backgroundColor: bgColor,
      },
    };
  };

  const noDataComponent = () => {
    return (
      <div style={{ height: "8vh", width: "100%" }}>
        <NonIdealState
          icon={"th-disconnect"}
          title={"No Files Uploaded Yet"}
          description={"Once you upload files, you will be able to see them here"}
          layout={"horizontal"}
        />
      </div>
    );
  };

  handlers["refresh"] = () => {
    refetch();
  };
  console.log(fetchedRows);
  return (
    <>
      {isLoading ? (
        <Spinner style={{ marginTop: "2em", marginBottom: "2em" }} size={54} />
      ) : error ? (
        <Tag icon={"error"} intent={Intent.DANGER} large minimal>
          {error}
        </Tag>
      ) : (
        <>
          <Table
            columns={[
              {
                Header: "S/N",
                id: "row",
                Cell: ({ row }) => {
                  return <div>{row.index + 1}</div>;
                },
              },
              ...columns,
              {
                Header: "Download File",
                id: "row_download",
                Cell: ({ row }) => {
                  console.log(row);
                  return (
                    <a
                      href={row.original?.inputFileUrl ?? null}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button icon={"download"} intent={Intent.PRIMARY} minimal={true}>
                        Download
                      </Button>
                    </a>
                  );
                },
              },
            ]}
            defaultColumn={defaultColumn}
            data={fetchedRows}
            showPagination={true}
            filterTypes={filterTypes}
            showEditColumn={false}
            showFilter={true}
            hoverEffect={true}
            cellProps={cellProps}
            showDownload={false}
            handlers={handlers}
            noDataComponent={noDataComponent}
          />
        </>
      )}
    </>
  );
};

export const UploadHistoryPanel = ({ employerId, module }) => {
  const handlers = {};
  const createHandler = (e) => {
    return () => {
      if (handlers[e]) handlers[e]();
    };
  };
  return (
    <>
      <Dashlet
        icon={"history"}
        title={"Uploaded Files"}
        actions={
          <>
            <Button icon={"refresh"} onClick={createHandler("refresh")}>
              Refresh
            </Button>
          </>
        }
      >
        <UploadHistoryTable
          employerId={employerId}
          module={module}
          handlers={handlers}
        />
      </Dashlet>
    </>
  );
};
