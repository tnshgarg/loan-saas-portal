import { 
    updateCSVRow,
    toggleFilter,
    updateFilters,
    deleteCSVRow,
    selectCSVRow,
    deselectCSVRow,
    restoreCSVRow,
    clearFilters
} from "../../../store/slices/csvUploadSlice.ts";

export function createTableService({ module, tableName, setSkipPageReset, dispatch}) {
    return {
        updateMyData: (rowIndex, columnId, value) => {
            // We also turn on the flag to not reset the page;
            setSkipPageReset(true);
            dispatch(updateCSVRow({ tableName, rowIndex, columnId, value, module }));
        },
        updateErrorFilters: (errorFilter) => {
            setSkipPageReset(true);
            dispatch(toggleFilter({ tableName, module, errorFilter }));
        },
        updateDataFilters: (column, filters) => {
            setSkipPageReset(true);
            dispatch(updateFilters({ tableName, module, column, filters }));
        },
        clearFilters: () => {
            dispatch(clearFilters({ tableName, module }));
        },
        deleteRow: (rowIndex) => {
            setSkipPageReset(true);
            dispatch(deleteCSVRow({ tableName, rowIndex, module }));
        },
        restoreRow: (rowIndex) => {
            setSkipPageReset(true);
            dispatch(restoreCSVRow({ tableName, rowIndex, module }));
        },
        selectRow: (rowIndex) => {
            setSkipPageReset(true);
            dispatch(selectCSVRow({ tableName, rowIndex, module }));
        },
        deselectRow: (rowIndex) => {
            setSkipPageReset(true);
            dispatch(deselectCSVRow({ tableName, rowIndex, module }));
        },
    }
}