import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { postActions } from "../../store/post-slice";
import { alertActions } from "../../store/alert-slice";
import { v4 as uuid } from "uuid";

const PostForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  async function addPost(formData) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`/api/posts`, formData, config);
      console.log(res.data);
      dispatch(postActions.ADD_POST(res.data));
      var idd = uuid();
      dispatch(
        alertActions.SET_ALERT({
          id: idd,
          msg: "post added",
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
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
          setText("");
        }}
        className="form my-1"
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default PostForm;
