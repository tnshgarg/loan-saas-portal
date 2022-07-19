import { createSlice } from "@reduxjs/toolkit";

interface TableData {
  [tableName: string]: {
    [rowId: string]: {
      [field: string]: null | string | number;
    };
  };
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
    [fieldName: string]: string;
  };
}

const CSV_UPLOADS_INITIAL_STATE = {
  data: {} as TableData,
  fields: {} as TableFields,
  updates: {} as TableData,
  errors: {} as TableErrors,
  pagination: {} as TablePagination,
  stats: {}
};

export const CSVUploadsSlice = createSlice({
  name: "CSVUploads",
  initialState: CSV_UPLOADS_INITIAL_STATE,
  reducers: {
    initCSVUpload: (state, action) => {
      console.log({ action });
      const { data, fileName, fields } = action.payload;
      data.forEach((row) => {
        Object.entries(row).forEach(([key, value]: [string, any]) => {
          if (value) {
            if (!(typeof value === "string" || value instanceof String))
              value = String(value);
            row[key] = value.trim();
          }
        });
      });
      state.data[fileName] = data;
      state.fields[fileName] = fields;
      console.log(fields, data);
    },
    updateCSVRow: (state, action) => {
      const { payload: { tableName, rowIndex, columnId, value } } = action;
      state.data[tableName][rowIndex][columnId] = value;
    },
    deleteCSVRow: (state, action) => {
      //pass
    }
  }
});

export const { initCSVUpload, updateCSVRow, deleteCSVRow } =
  CSVUploadsSlice.actions;

export default CSVUploadsSlice.reducer;
