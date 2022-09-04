import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  if (role !== undefined) {
    if (
      localStorage.getItem("login") === "true" &&
      localStorage.getItem("role") === role
    ) {
      return <Outlet />;
    } else {
      return <Navigate to="/connexion" />;
    }
  } else {
    return localStorage.getItem("login") === "true" ? (
      <Outlet />
    ) : (
      <Navigate to="/connexion" />
    );
  }
};

export default PrivateRoute;
