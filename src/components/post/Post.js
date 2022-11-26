import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { postActions } from "../../store/post-slice";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

import openSocket from "socket.io-client";

const Post = () => {
  const loading = useSelector((state) => state.post.loading);
  const post = useSelector((state) => state.post.post);

  const dispatch = useDispatch();

  let { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        dispatch(postActions.GET_POST(res.data));
      } catch (error) {
        dispatch(
          postActions.ERROR_POST({
            msg: error.response.statusText,
            status: error.response.status,
          })
        );
      }
    };
    getPost();
    const socket = openSocket("http://localhost:5000");
    socket.on("posts", (data) => {
      if (data.action === "comment") {
        getPost();
      }
    });
  }, [dispatch, id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome to the community
        </p>
        <Link to="/posts" className="btn">
          Back To Posts
        </Link>
        <div className="posts">
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
        </div>
        <div className="comments">
          {post.comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          ))}
        </div>
      </section>
    </Fragment>
  );
};

export default Post;
