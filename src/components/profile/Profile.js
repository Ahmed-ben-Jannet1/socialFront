import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../../store/profile-slice";
import Spinner from "../layout/Spinner";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";

const Profile = () => {
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    async function getProfileById(id) {
      dispatch(profileActions.CLEAR_PROFILE());
      try {
        const res = await axios.get(`/api/profile/user/${id}`);

        dispatch(profileActions.GET_PROFILE(res.data));
      } catch (error) {
        dispatch(
          profileActions.PROFILE_ERROR({
            msg: error.response.statusText,
            status: error.response.status,
          })
        );
      }
    }
    getProfileById(id);
  }, []);
  let pathed = "/login";
  if (auth.isAuthenticated) {
    pathed = "/posts";
  }
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="container">
            <Link to="/profiles" className="btn btn-light">
              Back To Profiles
            </Link>
            {auth.isAuthenticated && (
              <Link to={pathed} className="btn btn-light">
                Back To Posts
              </Link>
            )}
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to="/edit-profile" className="btn btn-dark">
                  Edit Profile
                </Link>
              )}
            <div class="profile-grid my-1">
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />

              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {profile.experience.length > 0 ? (
                  <Fragment>
                    {profile.experience.map((experience) => (
                      <ProfileExperience
                        key={experience._id}
                        experience={experience}
                      />
                    ))}
                  </Fragment>
                ) : (
                  <h4> No experience credentials </h4>
                )}
              </div>

              <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {profile.education.length > 0 ? (
                  <Fragment>
                    {profile.education.map((education) => (
                      <ProfileEducation
                        key={education._id}
                        education={education}
                      />
                    ))}
                  </Fragment>
                ) : (
                  <h4> No Education credentials </h4>
                )}
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
