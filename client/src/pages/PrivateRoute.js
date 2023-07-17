import React from "react";
import { Route, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const PrivateRoute = ({ path, element }) => {
  const { user } = UserContext();

  return user ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
