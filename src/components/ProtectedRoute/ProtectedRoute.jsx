import React from "react";
import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function ProtectedRoute({ component: Component, ...props }) {
  const currentUser = useCurrentUser();
  const isCurrentUserLoading = typeof currentUser == "undefined";

  if (isCurrentUserLoading) {
    return null;
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Component {...props} />;
}

export default ProtectedRoute;
