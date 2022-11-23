import React, { Fragment } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { postActions } from "../../store/post-slice";
import { alertActions } from "../../store/alert-slice";
import { v4 as uuid } from "uuid";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
}) => {
  const loading = useSelector((state) => state.auth.loading);
  const userr = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const deleteComment = async (postId, commentId) => {
    try {
      await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
      dispatch(postActions.REMOVE_COMMENT(commentId));
      var idd = uuid();
      dispatch(
        alertActions.SET_ALERT({
          id: idd,
          msg: "comment removed",
          type: "success",
        })
      );
      setTimeout(() => dispatch(alertActions.REMOVE_ALERT(idd)), 5000);
    } catch (error) {
      dispatch(
        postActions.ERROR_POST({
          msg: error.response.statusText,
          status: error.response.status,
        })
      );
    }
  };

  return (
    <Fragment>
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
          {!loading && user === userr._id && (
            <button
              onClick={(e) => deleteComment(postId, _id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default CommentItem;
