import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { postActions } from "../../store/post-slice";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.post.loading);
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    async function getPosts() {
      try {
        const res = await axios.get("/api/posts");
        dispatch(postActions.GET_POSTS(res.data));
      } catch (error) {
        dispatch(
          postActions.ERROR_POST({
            msg: error.response.statusText,
            status: error.response.status,
          })
        );
      }
    }
    getPosts();
  }, [dispatch]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome to the community
        </p>
        <PostForm />
        <div className="posts">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </section>
    </Fragment>
  );
};

export default Posts;
