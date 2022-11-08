import React from "react";

import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoutes;