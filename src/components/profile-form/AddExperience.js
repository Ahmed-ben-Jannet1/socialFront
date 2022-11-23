import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

import { alertActions } from "../../store/alert-slice";
import { profileActions } from "../../store/profile-slice";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddExperience = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    form: null,
    to: null,
    current: false,
    description: "",
  });
  const [toDateDisabled, setToDateDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function timing(idd) {
    setTimeout(() => dispatch(alertActions.REMOVE_ALERT(idd)), 5000);
  }
  async function onSubmit(e) {
    e.preventDefault();

    const config = {
      Headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put("/api/profile/experience", formData, config);
      dispatch(profileActions.UPDATE_PROFILE(res.data));
      const idd = uuid();
      dispatch(
        alertActions.SET_ALERT({
          id: idd,
          msg: "experience added",
          type: "success",
        })
      );
      timing(idd);
      navigate("/dashboard");
    } catch (error) {
      dispatch(
        profileActions.PROFILE_ERROR({
          msg: error.response.statusText,
          status: error.response.status,
        })
      );
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
    }
  }

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Add An Experience</h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Job Title"
              name="title"
              value={title}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Company"
              name="company"
              value={company}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input
              type="date"
              name="from"
              value={from}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <p>
              <input
                type="checkbox"
                name="current"
                checked={current}
                value={current}
                onChange={(e) => {
                  setFormData({ ...formData, current: !current });
                  setToDateDisabled(!toDateDisabled);
                }}
              />{" "}
              Current Job
            </p>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              value={to}
              onChange={(e) => onChange(e)}
              disabled={toDateDisabled ? "disabled" : ""}
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Job Description"
              value={description}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

export default AddExperience;
