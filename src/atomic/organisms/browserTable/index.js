import React, { } from "react";
import { connect } from "react-redux";

import { coalesce } from "../../../utils/array";
import styled from "styled-components";
import { DeleteActionCell, SelectActionCell } from "./cells"
import { Table } from "./table"
import { createTableService } from "./tableActions.service";


const Styles = styled.div`
  padding: 1rem;
  width: 100%;
  overflow-x: auto;

  table {
    border: 1px solid rgb(17 20 24 / 15%);
    border-spacing: 0;

    thead > tr {
      border-bottom: 1px solid rgb(17 20 24 / 15%);
      :last-child {
        tr {
          border-bottom: 0;
        }
      }
    }

    th {
      border-bottom: 1px solid rgb(17 20 24 / 15%);
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

export const CSVUploadsStateMapper = (state, ownProps) => {
  const { tableName, module } = ownProps;
  console.log({ tableName, module });
  const {
    csvUploads: {
      [module]: {
        tableData: {
          [tableName]: {
            errorFilters = {},
            filteredData = [],
            dataFilters = {},
            data = [],
            fields = [],
            stats = {},
          } = {},
        } = {},
      } = {},
    },
  } = state;
  return {
    data: coalesce([filteredData, []]),
    hasData: coalesce([filteredData, data, []]).length,
    columns: fields,
    dataFilters,
    stats,
    errorFilters,
  };
};

function addRenderers(columns, renderers) {
  let updatedColumns = []
  columns.forEach((item) => {
    let updatedItem = Object.assign({}, item)
    console.log(updatedItem)
    if (item.columns) {
      updatedItem.columns = addRenderers(item.columns, renderers)
    } else if (item.accessor && renderers[item.accessor]) {
      updatedItem["Cell"] = renderers[item.accessor]
    }
    updatedColumns.push(updatedItem)
  })
  return updatedColumns;
}
function BrowserTable({
  data,
  hasData,
  columns,
  tableName,
  dispatch,
  setter,
  stats,
  dataFilters,
  errorFilters,
  deletes,
  selection,
  module,
  disableEdits,
  onRowClick,
  customCells,
}) {
  const prefixColumns = [];
  const suffixColumns = [];

  if (deletes) {
    suffixColumns.push({
      Header: "Delete",
      accessor: "status",
      Cell: DeleteActionCell,
    });
  }
  columns = addRenderers(columns, customCells || {})
  if (selection) {
    prefixColumns.push({
      Header: "Select",
      accessor: "status-s",
      Cell: SelectActionCell,
    });
  }

  const columnsMemo = React.useMemo(
    () => prefixColumns.concat(columns).concat(suffixColumns),
    [columns]
  );
  const dataMemo = React.useMemo(() => data, [data]);
  console.log({ dataMemo });
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  if (setter) setter(() => data);
  React.useEffect(() => {
    setSkipPageReset(false);
  }, [data]);
  console.log(errorFilters)

  let empty = !hasData;

  const tableActions = createTableService({
    module,
    tableName,
    setSkipPageReset,
    dispatch
  })
  return (
    <Styles>
      <Table
        columns={columnsMemo}
        data={dataMemo}
        hasData={hasData}
        hasGroups={true}
        tableActions={tableActions}
        dataFilters={dataFilters}
        errorFilters={errorFilters}
        skipPageReset={skipPageReset}
        stats={stats}
        disableEdits={disableEdits}
        onRowClick={onRowClick}
      />
    </Styles>
  );
}

export default connect(CSVUploadsStateMapper)(BrowserTable);
