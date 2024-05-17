import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth();

  return user ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
