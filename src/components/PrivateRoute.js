import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ authUser, children }) => {
  const location = useLocation();

  if (!authUser) {
    // Redirect to login, with redirect state set to current location
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
