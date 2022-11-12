import { createSlice } from "@reduxjs/toolkit";

const initialProfileState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {
    GET_PROFILE(state, action) {
      state.profile = action.payload;
      state.loading = false;
    },
    PROFILE_ERROR(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    UPDATE_PROFILE(state, action) {
      state.loading = false;
      state.profile = action.payload;
    },
    CLEAR_PROFILE(state) {
      state.loading = false;
      state.profile = null;
      state.profiles = [];
      state.repos = [];
    },
    GET_PROFILES(state, action) {
      state.profiles = action.payload;
      state.loading = false;
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
