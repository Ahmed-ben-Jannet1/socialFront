import React, { Fragment } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { postActions } from "../../store/post-slice";

import { alertActions } from "../../store/alert-slice";
import { v4 as uuid } from "uuid";

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {
  const loading = useSelector((state) => state.auth.loading);
  const userr = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  function timing(idd) {
    setTimeout(() => dispatch(alertActions.REMOVE_ALERT(idd)), 5000);
  }

  const updateLike = async (postId) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACK}/api/posts/like/${postId}`
      );

      dispatch(postActions.UPDATE_LIKES({ id: postId, likes: res.data }));
      // window.location.reload();
    } catch (error) {
      dispatch(
        postActions.ERROR_POST({
          msg: error.response.statusText,
          status: error.response.status,
        })
      );
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACK}/api/posts/${id}`);
      dispatch(postActions.DELETE_POST(id));
      var idd = uuid();
      dispatch(
        alertActions.SET_ALERT({
          id: idd,
          msg: "post deleted",
          type: "success",
        })
      );
      timing(idd);
    } catch (error) {
      dispatch(
        postActions.ERROR_POST({
          msg: error.response.statusText,
          status: error.response.status,
        })
      );
    }
  };

  const like = likes.findIndex((like) => like.user === userr._id);

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD" date={date} />
        </p>
        {showActions && (
          <Fragment>
            <button
              onClick={(e) => {
                updateLike(_id);
              }}
              type="button"
              className="btn btn-light"
            >
              {likes.length > 0 && like !== -1 ? (
                <i className="fas fa-thumbs-up"></i>
              ) : (
                <i className="fa-regular fa-thumbs-up"></i>
              )}

              {likes.length > 0 && <span>{likes.length} </span>}
            </button>

            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length} </span>
              )}
            </Link>
            {!loading && user === userr._id && (
              <button
                onClick={(e) => deletePost(_id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};
PostItem.defaultProps = {
  showActions: true,
};
export default PostItem;
