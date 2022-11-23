import { createSlice } from "@reduxjs/toolkit";

const initialPostState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const postSlice = createSlice({
  name: "post",
  initialState: initialPostState,
  reducers: {
    GET_POSTS(state, action) {
      state.posts = action.payload;
      state.loading = false;
    },
    GET_POST(state, action) {
      state.post = action.payload;
      state.loading = false;
    },
    ADD_POST(state, action) {
      state.posts.push(action.payload);
      state.loading = false;
    },
    ADD_COMMENT(state, action) {
      state.post = action.payload;
      state.loading = false;
    },
    REMOVE_COMMENT(state, action) {
      state.post.comments = state.post.comments.filter(
        (comment) => comment._id !== action.payload
      );
      state.loading = false;
    },
    UPDATE_LIKES(state, { payload }) {
      state.posts.map((post) => {
        if (post._id === payload.id) {
          post.likes = payload.likes;
        }
      });

      state.loading = false;
    },
    DELETE_POST(state, action) {
      state.loading = false;
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    ERROR_POST(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice;
