import React, { Fragment } from "react";

const PrivateRoutes = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return (
      <Fragment>
        <section className="container">
          <div style={{ textAlign: "center" }}>
            <h1 className="large text-primary">Not Authenticated</h1>
            <p className="lead">Error 401</p>
          </div>
        </section>
      </Fragment>
    );
  }
  return children;
};

export default PrivateRoutes;
