import { Button, Intent, Spinner, Tag } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useGetUploadedFilesQuery
} from "../../../store/slices/apiSlices/files/filesApiSlice";
import { initBrowserTable } from "../../../store/slices/csvUploadSlice.ts";
import { Dashlet } from "../../molecules/dashlets/dashlet";
import BrowserTable from "../browserTable";
import { StatusCell } from "../browserTable/cells";

const DownloadFileCell = ({ value }) => (
  <div style={{marginTop: "-6px",marginBottom: "-6px", textAlign: "center",marginLeft: "-2em",marginRight: "-2em",padding: 0}}>
    <a
      href={value ?? null}
      target="_blank"
      rel="noreferrer"
    >
      <Button icon={"download"} intent={Intent.PRIMARY} minimal={true}>
        Download
      </Button>
    </a>
  </div>
)

const TABLE_COLUMNS = [
  { Header: "File Name", accessor: "inputFileName" },
  { Header: "Upload Time", accessor: "uploadedAt" },
  { Header: "Status", accessor: "inputFileStatus" },
  { Header: "Download File", accessor: "inputFileUrl" },
]
const UploadHistoryTable = ({ employerId, module, handlers }) => {

  const { data, isLoading, error, refetch } = useGetUploadedFilesQuery({
    id: employerId,
    module,
  });

  const stateTableName = module + "-uploads-history";
  const dispatch = useDispatch();
  const updateTableRows = (body) => {
    dispatch(initBrowserTable({
      data: body.map((val) => Object.assign({}, val)),
      fields: TABLE_COLUMNS,
      fileName: stateTableName,
      module: stateTableName,
    }))
  };

  useEffect(() => {
    console.log("data Updated 1",data)
    if (data) {
      console.log("data Updated 2",data)
      const body = data?.body || [];
      updateTableRows(body);
    }
    
  }, [data]);


  handlers["refresh"] = () => {
    refetch();
  };

  let component = ""
  console.log({isLoading,error})
  if (isLoading) {
    component = (<Spinner style={{ marginTop: "2em", marginBottom: "2em" }} size={54} />)
  } else if (error) {
    component = (
      <Tag icon={"error"} intent={Intent.DANGER} large minimal>
        {error}
      </Tag>
    )
  } else {
    component = (
      <BrowserTable
        key="csv-dashlet-tabular-view"
        module={stateTableName}
        tableName={stateTableName}
        disableEdits={true}
        customCells={{
          "inputFileStatus": StatusCell,
          "inputFileUrl": DownloadFileCell
        }}
      />
    )
  }

  return (
    <>
      {component}
    </>
  );
};

export const UploadHistoryPanel = ({ employerId, module }) => {
  const handlers = {};
  return (
    <>
      <Dashlet
        icon={"history"}
        title={"Uploaded Files"}
        actions={
          <>
            <Button icon={"refresh"} onClick={() => handlers['refresh']()}>
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
