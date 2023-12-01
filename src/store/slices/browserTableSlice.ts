import { createSlice } from "@reduxjs/toolkit";
import { DATE_FIELDS } from "../../components/dashboard/employee/onboarding/fields";
import {
  FS,
  reg,
  VALIDATIONS,
} from "../../components/dashboard/employee/onboarding/validations.js";
import { convertExcelSerialToDateString } from "../../utils/excelHandling";

export const FILTER_OP = {
  ADD: true,
  REMOVE: false,
};

const BLANK_VALUE = "(Blank)";

function isNaN(value) {
  return value === null || value === undefined || value === "";
}
type TableRow = {
  [columnName: string]: any;
  rowNumber: number;
};
type TableData = Array<TableRow>;

interface TablePagination {
  pageSize: number;
}

interface TableFields {
  [fieldName: string]: {
    required: boolean;
    validations: any;
  };
}

interface TableErrors {
  errors: {
    [fieldName: string]: string;
  };
  warnings: {
    [fieldName: string]: string;
  };
}

interface TableStats {
  [columnName: string]: number;
}

type ErrorFilters = Array<number>;

interface TableFilters {
  [columnName: string]: {
    [value: string]: boolean;
  };
}
interface PanelValues {
  data: TableData;
  filteredData: TableData;
  fields: TableFields;
  fieldMap: any;
  updates: TableData;
  errors: TableErrors;
  pagination: TablePagination;
  stats: TableStats;
  errorFilters: ErrorFilters;
  dataFilters: TableFilters;
}

function defaultPanelValues(): PanelValues {
  return {
    data: {} as TableData,
    filteredData: {} as TableData,
    fields: {} as TableFields,
    fieldMap: {} as any,
    updates: {} as TableData,
    errors: {} as TableErrors,
    pagination: {} as TablePagination,
    stats: {} as TableStats,
    errorFilters: [] as ErrorFilters,
    dataFilters: {} as TableFilters,
  };
}

interface RootState {
  [module: string]: {
    activeFileName: string;
    tableData: {
      [fileName: string]: {
        data: TableData;
        filteredData: TableData;
        fields: TableFields;
        fieldMap: any;
        updates: TableData;
        errors: TableErrors;
        pagination: TablePagination;
        stats: TableStats;
        errorFilters: Array<Number>;
        dataFilters: TableFilters;
      };
    };
  };
}

const BROWSER_TABULAR_DATA_INITIAL: RootState = {};

function populateFilteredData(
  data: any,
  errorFilters: any,
  dataFilters: any,
  filteredData: any
) {
  filteredData.splice(0, filteredData.length);
  data.forEach((row: any) => {
    const appliedErrorFilters = errorFilters.filter(
      (f: string) => !!row.status[f]
    );
    const filterCount = Object.keys(dataFilters).length;
    let appliedFilters = 0;

    Object.keys(dataFilters).forEach((key) => {
      if (
        (!isNaN(row[key]) && dataFilters[key][row[key]]) ||
        (isNaN(row[key]) && dataFilters[key][BLANK_VALUE]) ||
        (Array.isArray(row[key]) &&
          ((row[key].length == 0 && dataFilters[key][BLANK_VALUE]) ||
            row[key]
              .map((value) => dataFilters[key][value])
              .reduce((p, v) => v || p, false)))
      )
        appliedFilters += 1;
      else {
        console.log("appliedFilters not", key, row[key]);
      }
    });
    console.log("filteredDataDebug", { row, filterCount, appliedFilters });
    if (
      (appliedErrorFilters.length > 0 || errorFilters.length === 0) &&
      filterCount === appliedFilters
    ) {
      filteredData.push(row);
    }
  });
}

const extractCurrentTableDataFromState = ({ module, tableName, state }) => {
  const {
    [module]: {
      tableData: {
        [tableName]: { data, errorFilters, dataFilters, filteredData, stats },
      },
    },
  } = state;

  return { data, errorFilters, dataFilters, filteredData, stats };
};

export const BrowserTabularDataSlice = createSlice({
  name: "CSVUploads",
  initialState: BROWSER_TABULAR_DATA_INITIAL,
  reducers: {
    initBrowserTable: (state, action) => {
      const { data, fileName, fields, module } = action.payload;
      if (!state[module]) state[module] = { activeFileName: "", tableData: {} };

      state[module].tableData[fileName] = defaultPanelValues();
      state[module].tableData[fileName].fields = fields;
      state[module].tableData[fileName].errorFilters = [];
      state[module].tableData[fileName].filteredData = [] as any;
      const fieldMap = (state[module].tableData[fileName].fieldMap =
        fields?.reduce((res, field) => {
          if (field.columns) {
            field.columns.reduce((res, field) => {
              res[field.field] = field.validations;
              return res;
            }, res);
          } else {
            res[field.field] = field.validations;
          }
          return res;
        }, {}));
      state[module].tableData[fileName].stats = getStatusDict();
      const dataFilters = (state[module].tableData[fileName].dataFilters = {});
      data.forEach((row: any, index: number) => {
        const rowEntries = Object.entries(row);
        console.log(row);
        row.rowNumber = index;
        row.status = getStatusDict();
        const fieldExists = Object.keys(fieldMap).reduce((obj, key) => {
          obj[key] = false;
          return obj;
        }, {});
        rowEntries.forEach(([key, value]: [string, any]) => {
          if (value) {
            if (Array.isArray(value)) {
              console.log("ArrayDebubFilters", { key, value });
            } else if (typeof value === "object") {
              return;
            } else if (
              !(
                typeof value === "string" ||
                value instanceof String ||
                Array.isArray(value)
              )
            ) {
              value = String(value);
              row[key] = value.trim();
              if (DATE_FIELDS.includes(key) && !reg.DATE.test(value)) {
                const serialTime = parseInt(value.trim());
                if (serialTime && !value.includes("/"))
                  value = row[key] = convertExcelSerialToDateString(serialTime);
              }
            }
          }
          fieldExists[key] = true;

          if (!["status", "rowNumber", "context"].includes(key)) {
            if (!dataFilters[key]) dataFilters[key] = {};
            if (isNaN(value)) {
              dataFilters[key][BLANK_VALUE] = true;
            } else if (Array.isArray(value)) {
              console.log("ArrayDebubFilters", { key, value });
              if (value.length == 0) {
                dataFilters[key][BLANK_VALUE] = true;
              } else {
                value.forEach((item) => {
                  dataFilters[key][String(item)] = true;
                });
              }
            } else {
              dataFilters[key][value] = true;
            }
          }
          let errState = FS.VALID;
          if (state[module].tableData[fileName].fieldMap[key]) {
            errState = VALIDATIONS[
              state[module].tableData[fileName].fieldMap[key]
            ](value || "");
          }
          state[module].tableData[fileName].stats[errState] += 1;
          row.status[errState] += 1;
        });
        const missingFields = Object.entries(fieldExists).filter(
          ([key, exists]) => !exists
        );
        console.log({ missingFields });
        missingFields.forEach(([key]) => {
          if (!dataFilters[key]) dataFilters[key] = {};
          dataFilters[key][BLANK_VALUE] = true;
        });
      });
      state[module].tableData[fileName].data = data;
      populateFilteredData(
        data,
        [],
        dataFilters,
        state[module].tableData[fileName].filteredData
      );
    },
    updateBrowserTableRow: (state, action) => {
      const {
        payload: { tableName, rowIndex, columnId, value, module },
      } = action;
      const { data, errorFilters, dataFilters, filteredData, stats } =
        state[module].tableData[tableName];
      let row = data[rowIndex];
      if (filteredData.length) {
        if (filteredData[rowIndex].rowNumber >= 0)
          row = data[filteredData[rowIndex].rowNumber];
        else row = data[-1];
      }
      const validate =
        VALIDATIONS[state[module].tableData[tableName].fieldMap[columnId]];
      const currentState = validate(row[columnId] || "");
      row[columnId] = value;
      if (isNaN(dataFilters[columnId][value]))
        dataFilters[columnId][value] = true;
      const updatedState = validate(row[columnId] || "");
      if (currentState !== updatedState) {
        stats[currentState] -= 1;
        stats[updatedState] += 1;

        console.assert(
          state[module].tableData[tableName].stats[currentState] >= 0
        );
        if (row.status) {
          row.status[currentState] -= 1;
          row.status[updatedState] += 1;
          console.assert(row.status[currentState] >= 0);
        } else {
          console.error("row.status is not set", row);
        }
        console.log(currentState, updatedState);
      }
      populateFilteredData(data, errorFilters, dataFilters, filteredData);
    },
    toggleErrorFilter: (state, action) => {
      const {
        payload: { tableName, errorFilter, module },
      } = action;

      const { data, filteredData, errorFilters, dataFilters } =
        state[module].tableData[tableName];

      var filterIndex = errorFilters.indexOf(errorFilter);
      if (filterIndex === -1) {
        errorFilters.push(errorFilter);
      } else {
        errorFilters.splice(filterIndex, 1);
      }
      // reusing the same `filteredData` to maintain object reference
      populateFilteredData(data, errorFilters, dataFilters, filteredData);
    },
    setErrorFilter: (state, action) => {
      const {
        payload: { tableName, errorFilter, module, operation },
      } = action;

      const { data, filteredData, errorFilters, dataFilters } =
        state[module].tableData[tableName];
      var filterIndex = errorFilters.indexOf(errorFilter);
      var filterStatus = filterIndex > -1;

      if (operation !== filterStatus) {
        if (operation === FILTER_OP.ADD) {
          errorFilters.push(errorFilter);
        } else {
          errorFilters.splice(filterIndex, 1);
        }
      }
      // reusing the same `filteredData` to maintain object reference
      populateFilteredData(data, errorFilters, dataFilters, filteredData);
    },
    updateFilters: (state, action) => {
      const {
        payload: { tableName, module, column, filters },
      } = action;

      const { data, filteredData, errorFilters, dataFilters } =
        state[module].tableData[tableName];
      dataFilters[column] = filters;
      console.log("updateFilters", dataFilters);
      populateFilteredData(data, errorFilters, dataFilters, filteredData);
    },
    clearFilters: (state, action) => {
      const {
        payload: { tableName, module },
      } = action;

      const { data, filteredData, errorFilters, dataFilters } =
        state[module].tableData[tableName];
      while (errorFilters.length) errorFilters.pop();
      Object.values(dataFilters).forEach((filterState) => {
        Object.keys(filterState).forEach((key) => {
          filterState[key] = true;
        });
      });
      populateFilteredData(data, errorFilters, dataFilters, filteredData);
    },
    selectBrowserTableRow: (state, action) => {
      const {
        payload: { tableName, rowIndex, module },
      } = action;

      const { data, errorFilters, dataFilters, filteredData, stats } =
        extractCurrentTableDataFromState({ module, tableName, state });

      let filteredRow = filteredData[rowIndex];
      let row = data[filteredRow.rowNumber];
      row.status[FS.SELECTED] = true;
      filteredRow.status = row.status;

      stats[FS.SELECTED] = (stats[FS.SELECTED] || 0) + 1;
    },
    deselectBrowserTableRow: (state, action) => {
      const {
        payload: { tableName, rowIndex, module },
      } = action;

      const { data, errorFilters, dataFilters, filteredData, stats } =
        extractCurrentTableDataFromState({ module, tableName, state });

      let filteredRow = filteredData[rowIndex];
      let row = data[filteredRow.rowNumber];
      row.status[FS.SELECTED] = false;
      filteredRow.status = row.status;

      stats[FS.SELECTED] = (stats[FS.SELECTED] || 1) - 1;
    },
    deleteBrowserTableRow: (state, action) => {
      const {
        payload: { tableName, rowIndex, module },
      } = action;
      console.log(state);
      const { data, filteredData, stats } = extractCurrentTableDataFromState({
        module,
        tableName,
        state,
      });

      let filteredRow = filteredData[rowIndex];
      let row = data[filteredRow.rowNumber];

      row.status[FS.DELETED] = true;
      filteredRow.status = row.status;

      [FS.ERROR, FS.VALID, FS.WARN].forEach((errState) => {
        stats[errState] -= row.status[errState];
      });
      stats[FS.DELETED] = (stats[FS.DELETED] || 0) + 1;
    },
    restoreBrowserTableRow: (state, action) => {
      const {
        payload: { tableName, rowIndex, module },
      } = action;

      const { data, errorFilters, dataFilters, filteredData, stats } =
        extractCurrentTableDataFromState({ module, tableName, state });
      let filteredRow = filteredData[rowIndex];
      let row = data[filteredRow.rowNumber];
      delete row.status[FS.DELETED];
      filteredRow.status = row.status;

      [FS.ERROR, FS.VALID, FS.WARN].forEach((errState) => {
        stats[errState] += row.status[errState];
      });
      stats[FS.DELETED] = (stats[FS.DELETED] || 1) - 1;
    },
    setActiveFileName: (state, action) => {
      const {
        payload: { fileName, module },
      } = action;
      if (!state[module]) state[module] = { activeFileName: "", tableData: {} };
      state[module].activeFileName = fileName;
    },
    clearActiveFileName: (state, action) => {
      const {
        payload: { module },
      } = action;
      if (!state[module]) state[module] = { activeFileName: "", tableData: {} };
      state[module].activeFileName = "";
    },
  },
});

export const {
  initBrowserTable,
  updateBrowserTableRow,
  toggleErrorFilter: toggleFilter,
  setErrorFilter: setFilter,
  deleteBrowserTableRow,
  restoreBrowserTableRow,
  selectBrowserTableRow,
  deselectBrowserTableRow,
  setActiveFileName,
  clearActiveFileName,
  updateFilters,
  clearFilters,
} = BrowserTabularDataSlice.actions;

export default BrowserTabularDataSlice.reducer;

function getStatusDict(): any {
  return {
    [FS.ERROR]: 0,
    [FS.WARN]: 0,
    [FS.VALID]: 0,
    [FS.SELECTED]: 0,
    [FS.DELETED]: 0,
  };
}
