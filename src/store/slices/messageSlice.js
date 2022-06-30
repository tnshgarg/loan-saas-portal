import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  message: "",
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = "";
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;

export default messageSlice.reducer;
