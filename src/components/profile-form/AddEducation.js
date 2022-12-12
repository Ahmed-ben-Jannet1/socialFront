import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

import { alertActions } from "../../store/alert-slice";
import { profileActions } from "../../store/profile-slice";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddEducation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    form: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisabled, setToDateDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

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
      const res = await axios.put(
        `${process.env.REACT_APP_BACK}/api/profile/education`,
        formData,
        config
      );
      dispatch(profileActions.UPDATE_PROFILE(res.data));
      const idd = uuid();
      dispatch(
        alertActions.SET_ALERT({
          id: idd,
          msg: "education added",
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
        <h1 class="large text-primary">Add Your Education</h1>
        <p class="lead">
          <i class="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
          that you have attended
        </p>
        <small>* = required field</small>
        <form class="form" onSubmit={(e) => onSubmit(e)}>
          <div class="form-group">
            <input
              type="text"
              placeholder="* School or Bootcamp"
              name="school"
              value={school}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="* Degree or Certificate"
              name="degree"
              value={degree}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Field Of Study"
              name="fieldofstudy"
              value={fieldofstudy}
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
              Current
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
              placeholder="program Description"
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

export default AddEducation;
