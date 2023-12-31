import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useUserContext } from "../context/UserProvider";

const PrivateRoute = () => {
  const { user } = useUserContext();
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
