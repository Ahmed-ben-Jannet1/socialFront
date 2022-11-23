import React, { Fragment } from "react";
import Moment from "react-moment";

const ProfileEducation = ({
  experience: { school, degree, fieledofstudy, current, to, from, description },
}) => {
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        <Moment format="YYYY/MM/DD" date={from} /> -{" "}
        {to === null ? " Now" : <Moment format="YYYY/MM/DD" date={to} />}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {fieledofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

export default ProfileEducation;
