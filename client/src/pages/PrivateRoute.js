import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUser } from "../UserContext";

const PrivateRoute = ({ path, element }) => {
  const { user } = useUser();

  return user ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
