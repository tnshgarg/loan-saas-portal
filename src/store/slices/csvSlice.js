import { createSlice } from "@reduxjs/toolkit";
import {
  FS,
  VALIDATIONS,
  reg,
} from "../../components/dashboard/employee/onboarding/validations";
import { DATE_FIELDS } from "../../components/dashboard/employee/onboarding/fields";
import { convertExcelSerialToDateString } from "../../utils/excelHandling";

const BLANK_VALUE = "(Blank)";

export const csvSlice = createSlice({
  name: "CsvData",
  initialState: {},
  reducers: {
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
    initCsvTable: function (state, action) {
      // Implement the logic for initializing the CSV table
      // This logic should be similar to what's in the original code
      const { data, fileName, fields, module } = action.payload;
      console.log("payload", data, fileName, fields, module);
      if (!state[module]) state[module] = { activeFileName: "", tableData: {} };

      state[module].tableData[fileName] = defaultPanelValues();
      state[module].tableData[fileName].fields = fields;
      state[module].tableData[fileName].errorFilters = [];
      state[module].tableData[fileName].filteredData = [];
      console.log("map:", state[module].tableData[fileName]);
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
      console.log({ fieldMap });
      state[module].tableData[fileName].stats = getStatusDict();
      const dataFilters = (state[module].tableData[fileName].dataFilters = {});
      data.forEach(function (row, index) {
        const rowEntries = Object.entries(row);
        console.log(row);
        row.rowNumber = index;
        row.status = getStatusDict();
        const fieldExists = Object.keys(fieldMap).reduce(function (obj, key) {
          obj[key] = false;
          return obj;
        }, {});
        rowEntries.forEach(function ([key, value]) {
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
                value.forEach(function (item) {
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
        const missingFields = Object.entries(fieldExists).filter(function ([
          key,
          exists,
        ]) {
          return !exists;
        });
        console.log({ missingFields });
        missingFields.forEach(function ([key]) {
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
  },
});

export const {
  setActiveFileName,
  clearActiveFileName,
  updateFilters,
  clearFilters,
  initCsvTable,
} = csvSlice.actions;

export default csvSlice.reducer;

function populateFilteredData(data, errorFilters, dataFilters, filteredData) {
  // Implement the logic for populating filtered data based on error and data filters
  // This logic should be similar to what's in the original code
}

function getStatusDict() {
  return {
    [FS.ERROR]: 0,
    [FS.WARN]: 0,
    [FS.VALID]: 0,
    [FS.SELECTED]: 0,
    [FS.DELETED]: 0,
  };
}

function defaultPanelValues() {
  return {
    data: {},
    filteredData: {},
    fields: {},
    fieldMap: {},
    updates: {},
    errors: {
      errors: {},
      warnings: {},
    },
    pagination: {},
    stats: {},
    errorFilters: [],
    dataFilters: {},
  };
}
