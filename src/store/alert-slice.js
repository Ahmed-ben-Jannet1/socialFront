import { createSlice } from "@reduxjs/toolkit";

const initialAlertState = [];

const alertSlice = createSlice({
  name: "alert",
  initialState: initialAlertState,
  reducers: {
    SET_ALERT(state, action) {
      state.push({
        id: action.payload.id,
        msg: action.payload.msg,
        type: action.payload.type,
      });
    },
    REMOVE_ALERT(state, action) {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice;
