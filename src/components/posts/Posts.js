import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { postActions } from "../../store/post-slice";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

import openSocket from "socket.io-client";

const Posts = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.post.loading);
  const posts = useSelector((state) => state.post.posts);
  const [searchPosts, setSearch] = useState(null);

  useEffect(() => {
    async function getPosts() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACK}/api/posts`);
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
    const socket = openSocket(`${process.env.REACT_APP_BACK}`);
    socket.on("posts", (data) => {
      if (
        data.action === "create" ||
        data.action === "delete_post" ||
        data.action === "comment" ||
        data.action === "like"
      ) {
        getPosts();
      }
    });
  }, [dispatch]);

  let updatePosts = [];
  function search(textt) {
    posts.map((post) => {
      if (post.text.includes(textt)) {
        updatePosts.push(post);
      }
    });
    setSearch(updatePosts);
    if (textt === "" || updatePosts === []) {
      setSearch(posts);
    }
  }

  const getposts = () => searchPosts ?? posts;
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Posts</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            search(text);
            setText("");
          }}
          className="form my-1"
        >
          <div style={{ display: "flex" }}>
            <textarea
              name="text"
              cols="5"
              placeholder="Search"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <input
              style={{ marginLeft: "0.5rem" }}
              type="submit"
              className="btn btn-dark my-1"
              value="Search"
            />
          </div>
        </form>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome to the community
        </p>
        <PostForm />
        <div className="posts">
          {posts.map((post) => {
            if (!searchPosts) {
              return <PostItem key={post._id} post={post} />;
            } else if (
              searchPosts.findIndex((elm) => elm._id === post._id) > -1
            ) {
              return <PostItem key={post._id} post={post} />;
            }
          })}
        </div>
      </section>
    </Fragment>
  );
};

export default Posts;
