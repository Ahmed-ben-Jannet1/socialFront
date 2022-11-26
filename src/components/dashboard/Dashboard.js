import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../../store/profile-slice";
import axios from "axios";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardAction from "./DashboardAction";
import Experience from "./Experience";
import Education from "./Education";
import { alertActions } from "../../store/alert-slice";
import { v4 as uuid } from "uuid";
import { authActions } from "../../store/auth-slice";

const Dashboard = () => {
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getCurrentProfile() {
      try {
        const res = await axios.get("/api/profile/me");

        dispatch(profileActions.GET_PROFILE(res.data));
      } catch (error) {
        console.log("here in get profile");
        dispatch(
          profileActions.PROFILE_ERROR({
            msg: error.response.statusText,
            status: error.response.status,
          })
        );
      }
    }
    getCurrentProfile();
  }, [dispatch]);

  function timing(idd) {
    setTimeout(() => dispatch(alertActions.REMOVE_ALERT(idd)), 5000);
  }

  async function deleteAccount() {
    if (window.confirm("Are you sure ? this can not be undone !"))
      try {
        await axios.delete(`/api/profile`);
        dispatch(profileActions.CLEAR_PROFILE());
        dispatch(authActions.LOGOUT_OR_FAIL());
        var idd = uuid();
        dispatch(
          alertActions.SET_ALERT({
            id: idd,
            msg: "Account deleted",
            type: "success",
          })
        );
        timing(idd);
      } catch (error) {
        dispatch(
          profileActions.PROFILE_ERROR({
            msg: error.response.statusText,
            status: error.response.status,
          })
        );
      }
  }

  return profile === null && loading ? (
    <section className="container">
      <Spinner />
    </section>
  ) : (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <Fragment>
            <DashboardAction />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div className="my-2">
              <button
                onClick={() => deleteAccount()}
                className="btn btn-danger"
              >
                <i className="fas fa-user-minus"></i> Delete My Account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p> You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

export default Dashboard;
