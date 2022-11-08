import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    USER_LOADED(state, action) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },

    REGISTER_SUCCESS(state, action) {
      state.token = localStorage.setItem("token", action.payload.token);
      state.isAuthenticated = true;
      state.loading = false;
    },
    LOGOUT_OR_FAIL(state) {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
