import { createSlice } from "@reduxjs/toolkit";
import { DATE_FIELDS } from "../../components/dashboard/employee/onboarding/fields";
import { convertExcelSerialToDateString } from "../../utils/excelHandling";
import {
  FS,
  reg,
  VALIDATIONS,
} from "../../components/dashboard/employee/onboarding/validations.js";
import { Console } from "console";

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
  data: TableData,
  filteredData: TableData,
  fields: TableFields,
  fieldMap: any,
  updates: TableData,
  errors: TableErrors,
  pagination: TablePagination,
  stats: TableStats,
  errorFilters: ErrorFilters,
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
    errorFilters: {} as ErrorFilters,
  }
}

interface RootState {
  [panelName: string]: {
    [fileName: string]: {
      data: TableData,
      filteredData: TableData,
      fields: TableFields,
      fieldMap: any,
      updates: TableData,
      errors: TableErrors,
      pagination: TablePagination,
      stats: TableStats,
      errorFilters: ErrorFilters,
    }
  }
}

const CSV_UPLOADS_INITIAL_STATE: RootState = {}

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
      const { data, fileName, fields, panelName } = action.payload;
      state[panelName] = {};
      state[panelName][fileName] = defaultPanelValues()
      state[panelName][fileName].fields = fields;
      state[panelName][fileName].errorFilters = [];
      // techdebt: fix type issues
      state[panelName][fileName].filteredData = [] as any;
      state[panelName][fileName].fieldMap = fields.reduce((res, field) => {
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
      state[panelName][fileName].stats = getErrorDict();
      data.forEach((row, index: number) => {
        const rowEntries = Object.entries(row);
        row.rowNumber = index;
        row.status = getErrorDict();
        rowEntries.forEach(([key, value]: [string, any]) => {
          if (value) {
            if(typeof value === 'object') return;
            if (!(typeof value === "string" || value instanceof String))
              value = String(value);
            row[key] = value.trim();
            if (DATE_FIELDS.includes(key) && !reg.DATE.test(value)) {
              const serialTime = parseInt(value.trim());
              if (serialTime && !value.includes('/'))
                value = row[key] = convertExcelSerialToDateString(serialTime);
            }
          }
          let errState = FS.VALID;
          if (state[panelName][fileName].fieldMap[key]) {
            errState = VALIDATIONS[state[panelName][fileName].fieldMap[key]](value || "");
          }
          state[panelName][fileName].stats[errState] += 1;
          row.status[errState] += 1;
        });
      });
      state[panelName][fileName].data = data;
    },
    updateCSVRow: (state, action) => {
      const {
        payload: { tableName, rowIndex, columnId, value, panelName },
      } = action;
      const {
        data,
        errorFilters,
        filteredData,
        stats
      } = state[panelName][tableName];
      let row = data[rowIndex];
      if (errorFilters.length) {
        row = data[filteredData[rowIndex].rowNumber];
      }
      const validate = VALIDATIONS[state[panelName][tableName].fieldMap[columnId]];
      const currentState = validate(row[columnId] || "");
      row[columnId] = value;
      const updatedState = validate(row[columnId] || "");
      if (currentState !== updatedState) {
        stats[currentState] -= 1;
        stats[updatedState] += 1;

        console.assert(state[panelName][tableName].stats[currentState] >= 0);

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
        payload: { tableName, errorFilter, panelName },
      } = action;

      const {
        data,
        filteredData,
        errorFilters,
      } = state[panelName][tableName];

      var filterIndex = errorFilters.indexOf(errorFilter);
      if (filterIndex === -1) {
        errorFilters.push(errorFilter);
      } else {
        errorFilters.splice(filterIndex, 1);
      }
      // reusing the same `filteredData` to maintain object reference
      populateFilteredData(data, errorFilters, filteredData);
    },
    // WIP: discuss and add
    // deleteCSVRow: (state, action) => {
    //   //pass
    // },
  },
});

export const { initCSVUpload, updateCSVRow, toggleFilter } =
  CSVUploadsSlice.actions;

export default CSVUploadsSlice.reducer;

function getErrorDict(): any {
  return {
    [FS.ERROR]: 0,
    [FS.WARN]: 0,
    [FS.VALID]: 0,
  };
}
