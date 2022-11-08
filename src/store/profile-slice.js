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
  reducers: {},
});

export const profileActions = profileSlice.actions;

export default profileSlice;
