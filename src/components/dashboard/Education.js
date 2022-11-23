import React, { Fragment } from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import axios from "axios";
import { profileActions } from "../../store/profile-slice";
import { alertActions } from "../../store/alert-slice";
import { v4 as uuid } from "uuid";

const Education = (props) => {
  const dispatch = useDispatch();

  function timing(idd) {
    setTimeout(() => dispatch(alertActions.REMOVE_ALERT(idd)), 5000);
  }

  async function deleteEducation(id) {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);
      dispatch(profileActions.UPDATE_PROFILE(res.data));
      var idd = uuid();
      dispatch(
        alertActions.SET_ALERT({
          id: idd,
          msg: "education deleted",
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

  const education = props.education;
  const educations = education.map((edd) => {
    return (
      <tr key={edd._id}>
        <td> {edd.school} </td>
        <td className="hide-sm"> {edd.degree} </td>
        <td>
          <Moment format="YYYY/MM/DD" date={edd.from} /> -{" "}
          {edd.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD" date={edd.to} />
          )}
        </td>
        <td>
          <button
            onClick={() => deleteEducation(edd._id)}
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
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

export default Education;
