import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("vendorToken");

  if (!token) {
    return <Navigate to="/vendor-login" replace />;
  }

  return children;
};

export default ProtectedRoute;
