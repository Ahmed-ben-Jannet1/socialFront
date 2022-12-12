import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../store/alert-slice";
import { authActions } from "../../store/auth-slice";

import axios from "axios";
import { v4 as uuid } from "uuid";

const Register = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function timing(idd) {
    setTimeout(() => dispatch(alertActions.REMOVE_ALERT(idd)), 5000);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (password !== password2) {
      let idd = uuid();
      dispatch(
        alertActions.SET_ALERT({
          id: idd,
          msg: "password do not match",
          type: "danger",
        })
      );
      setTimeout(() => dispatch(alertActions.REMOVE_ALERT(idd)), 5000);
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ name, email, password });
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BACK}/api/users`,
          body,
          config
        );
        dispatch(authActions.REGISTER_SUCCESS({ token: res.data.token }));
      } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
          errors.forEach(function (err) {
            var idd = uuid();
            dispatch(
              alertActions.SET_ALERT({
                id: idd,
                msg: err.msg,
                type: "danger",
              })
            );
            timing(idd);
          });
        }
        dispatch(authActions.LOGOUT_OR_FAIL());
      }
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

export default Register;
