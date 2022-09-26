import { createSlice } from "@reduxjs/toolkit";
import { DATE_FIELDS } from "../../components/dashboard/employee/onboarding/fields";
import { convertExcelSerialToDateString } from "../../utils/excelHandling";
import {
  FS,
  reg,
  VALIDATIONS,
} from "../../components/dashboard/employee/onboarding/validations.js";

interface TableData {
  [tableName: string]: [
    {
      [field: string]: null | string | number;
    }
  ];
}

interface TablePagination {
  [tableName: string]: {
    pageSize: number;
  };
}

interface TableFields {
  [tableName: string]: {
    [fieldName: string]: {
      required: boolean;
      validations: any;
    };
  };
}

interface TableErrors {
  [tableName: string]: {
    errors: {
      [fieldName: string]: string;
    };
    warnings: {
      [fieldName: string]: string;
    };
  };
}

interface TableStats {
  [tableName: string]: object;
}

interface ErrorFilters {
  [tableName: string]: Array<Number>;
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
  };
}

interface RootState {
  [module: string]: {
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
    };
  };
}

const CSV_UPLOADS_INITIAL_STATE: RootState = {};

function populateFilteredData(data: any, errorFilters: any, filteredData: any) {
  filteredData.splice(0, filteredData.length);
  data.forEach((row) => {
    const appliedFilters = errorFilters.filter((f) => !!row.status[f]);
    if (appliedFilters.length > 0) {
      filteredData.push(row);
    }
  });
}

export const CSVUploadsSlice = createSlice({
  name: "CSVUploads",
  initialState: CSV_UPLOADS_INITIAL_STATE,
  reducers: {
    initCSVUpload: (state, action) => {
      const { data, fileName, fields, module } = action.payload;
      if (!state[module]) state[module] = {};

      state[module][fileName] = defaultPanelValues() as any;
      state[module][fileName].fields = fields;
      state[module][fileName].errorFilters = [];
      // techdebt: fix type issues
      state[module][fileName].filteredData = [] as any;
      state[module][fileName].fieldMap = fields.reduce((res, field) => {
        if (field.columns) {
          field.columns.reduce((res, field) => {
            res[field.field] = field.validations;
            return res;
          }, res);
        } else {
          res[field.field] = field.validations;
        }
        return res;
      }, {});
      state[module][fileName].stats = getStatusDict();
      data.forEach((row, index: number) => {
        const rowEntries = Object.entries(row);
        console.log(row);
        row.rowNumber = index;
        row.status = getStatusDict();
        rowEntries.forEach(([key, value]: [string, any]) => {
          if (value) {
            if (typeof value === "object") return;
            if (!(typeof value === "string" || value instanceof String))
              value = String(value);
            row[key] = value.trim();
            if (DATE_FIELDS.includes(key) && !reg.DATE.test(value)) {
              const serialTime = parseInt(value.trim());
              if (serialTime && !value.includes("/"))
                value = row[key] = convertExcelSerialToDateString(serialTime);
            }
          }
          let errState = FS.VALID;
          if (state[module][fileName].fieldMap[key]) {
            errState = VALIDATIONS[state[module][fileName].fieldMap[key]](
              value || ""
            );
          }
          state[module][fileName].stats[errState] += 1;
          row.status[errState] += 1;
        });
      });
      state[module][fileName].data = data;
    },
    updateCSVRow: (state, action) => {
      const {
        payload: { tableName, rowIndex, columnId, value, module },
      } = action;
      const { data, errorFilters, filteredData, stats } =
        state[module][tableName];
      let row = data[rowIndex];
      if (errorFilters.length) {
        row = data[filteredData[rowIndex].rowNumber];
      }
      const validate = VALIDATIONS[state[module][tableName].fieldMap[columnId]];
      const currentState = validate(row[columnId] || "");
      row[columnId] = value;
      const updatedState = validate(row[columnId] || "");
      if (currentState !== updatedState) {
        stats[currentState] -= 1;
        stats[updatedState] += 1;

        console.assert(state[module][tableName].stats[currentState] >= 0);

        row.status[currentState] -= 1;
        row.status[updatedState] += 1;

        console.assert(row.status[currentState] >= 0);
        console.log(currentState, updatedState);
        if (errorFilters.length) {
          populateFilteredData(data, errorFilters, filteredData);
        }
      }
    },
    toggleFilter: (state, action) => {
      const {
        payload: { tableName, errorFilter, module },
      } = action;

      const { data, filteredData, errorFilters } = state[module][tableName];

      var filterIndex = errorFilters.indexOf(errorFilter);
      if (filterIndex === -1) {
        errorFilters.push(errorFilter);
      } else {
        errorFilters.splice(filterIndex, 1);
      }
      // reusing the same `filteredData` to maintain object reference
      populateFilteredData(data, errorFilters, filteredData);
    },
    selectCSVRow: (state, action) => {
      const {
        payload: { tableName, rowIndex, module },
      } = action;

      const {
        [module]: {
          [tableName]: { data, errorFilters, filteredData, stats },
        },
      } = state;
      let row = data[rowIndex];
      if (errorFilters.length) {
        row = data[filteredData[rowIndex].rowNumber];
      }
      row.status[FS.SELECTED] = true;
      stats[FS.SELECTED] = (stats[FS.SELECTED] || 0) + 1;
    },
    deselectCSVRow: (state, action) => {
      const {
        payload: { tableName, rowIndex, module },
      } = action;

      const {
        [module]: {
          [tableName]: { data, errorFilters, filteredData, stats },
        },
      } = state;
      let row = data[rowIndex];
      if (errorFilters.length) {
        row = data[filteredData[rowIndex].rowNumber];
      }
      row.status[FS.SELECTED] = false;
      stats[FS.SELECTED] = (stats[FS.SELECTED] || 1) - 1;
    },
    deleteCSVRow: (state, action) => {
      const {
        payload: { tableName, rowIndex, module },
      } = action;
      console.log(state);
      const {
        [module]: {
          [tableName]: { data, errorFilters, filteredData, stats },
        },
      } = state;
      let row = data[rowIndex];
      if (errorFilters.length) {
        row = data[filteredData[rowIndex].rowNumber];
      }
      row.status[FS.DELETED] = true;
      [FS.ERROR, FS.VALID, FS.WARN].forEach((errState) => {
        stats[errState] -= row.status[errState];
      });
      stats[FS.DELETED] = (stats[FS.DELETED] || 0) + 1;
    },
    restoreCSVRow: (state, action) => {
      const {
        payload: { tableName, rowIndex, module },
      } = action;

      const {
        [module]: {
          [tableName]: { data, errorFilters, filteredData, stats },
        },
      } = state;
      let row = data[rowIndex];
      if (errorFilters.length) {
        row = data[filteredData[rowIndex].rowNumber];
      }
      delete row.status[FS.DELETED];
      [FS.ERROR, FS.VALID, FS.WARN].forEach((errState) => {
        stats[errState] += row.status[errState];
      });
      stats[FS.DELETED] = (stats[FS.DELETED] || 1) - 1;
    },
    // WIP: discuss and add
    // deleteCSVRow: (state, action) => {
    //   //pass
    // },
  },
});

export const {
  initCSVUpload,
  updateCSVRow,
  toggleFilter,
  deleteCSVRow,
  restoreCSVRow,
  selectCSVRow,
  deselectCSVRow,
} = CSVUploadsSlice.actions;

export default CSVUploadsSlice.reducer;

function getStatusDict(): any {
  return {
    [FS.ERROR]: 0,
    [FS.WARN]: 0,
    [FS.VALID]: 0,
    [FS.SELECTED]: 0,
    [FS.DELETED]: 0,
  };
}
