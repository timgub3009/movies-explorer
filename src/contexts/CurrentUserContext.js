import React from "react";

export const CurrentUserContext = React.createContext();

export function useCurrentUser() {
  const currentUser = React.useContext(CurrentUserContext);
  return currentUser;
}

