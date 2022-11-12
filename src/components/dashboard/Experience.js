import React, { Fragment } from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import axios from "axios";
import { profileActions } from "../../store/profile-slice";
import { alertActions } from "../../store/alert-slice";
import { v4 as uuid } from "uuid";

const Experience = (props) => {
  const dispatch = useDispatch();

  function timing(idd) {
    setTimeout(() => dispatch(alertActions.REMOVE_ALERT(idd)), 5000);
  }

  async function deleteExperience(id) {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);
      dispatch(profileActions.UPDATE_PROFILE(res.data));
      var idd = uuid();
      dispatch(
        alertActions.SET_ALERT({
          id: idd,
          msg: "experience deleted",
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

  const experience = props.experience;
  const experiences = experience.map((exp) => {
    return (
      <tr key={exp._id}>
        <td> {exp.company} </td>
        <td className="hide-sm"> {exp.title} </td>
        <td>
          <Moment format="YYYY/MM/DD"> {exp.from} </Moment> -
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD"> {exp.to} </Moment>
          )}
        </td>
        <td>
          <button
            onClick={() => deleteExperience(exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody> {experiences} </tbody>
      </table>
    </Fragment>
  );
};

export default Experience;
