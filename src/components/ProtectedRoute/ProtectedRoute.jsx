import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, currentUser, ...props }) {
  if (currentUser === undefined) {
    // loading...
    return null;
  }

  return currentUser ? <Component {...props} /> : <Navigate to="/" replace />;
}
export default ProtectedRoute;
