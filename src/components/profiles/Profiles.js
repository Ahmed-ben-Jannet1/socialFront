import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../../store/profile-slice";
import Spinner from "../layout/Spinner";
import axios from "axios";
import ProfileItem from "./ProfileItem";

const Profiles = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.profile.loading);
  const profiles = useSelector((state) => state.profile.profiles);
  useEffect(() => {
    async function getProfiles() {
      dispatch(profileActions.CLEAR_PROFILE);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACK}/api/profile`
        );

        dispatch(profileActions.GET_PROFILES(res.data));
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
    getProfiles();
  }, []);

  return loading ? (
    <section className="container">
      <Spinner />
    </section>
  ) : (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Developers</h1>
        <p className="lead">
          <i className="fab fa-connectdevelop"></i> Browse and connect with
          developers
        </p>
        <div className="profiles">
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <ProfileItem key={profile._id} profile={profile} />
            ))
          ) : (
            <h4> No PROFILES FOUND... </h4>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default Profiles;
