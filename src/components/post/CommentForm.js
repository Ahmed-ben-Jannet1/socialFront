import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { postActions } from "../../store/post-slice";
import { alertActions } from "../../store/alert-slice";
import { v4 as uuid } from "uuid";

const CommentForm = ({ postId }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const addComment = async (postId, formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACK}/api/posts/comment/${postId}`,
        formData,
        config
      );
      dispatch(postActions.ADD_COMMENT(res.data));
      var idd = uuid();
      dispatch(
        alertActions.SET_ALERT({
          id: idd,
          msg: "comment added",
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
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Add comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default CommentForm;
