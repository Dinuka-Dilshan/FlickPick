import { LOGGED_IN_USER_DETAILS_KEY } from "../constants/localStorage";
import { AuthenticatedUser } from "../types/user";

export const getLoggedInUserFromLocalStrorage = () => {
  const user = localStorage.getItem(LOGGED_IN_USER_DETAILS_KEY);

  if (!user) {
    return null;
  }

  return JSON.parse(user) as AuthenticatedUser;
};

export const setLoggedInUserToLocalStrorage = (user: AuthenticatedUser) => {
  localStorage.setItem(LOGGED_IN_USER_DETAILS_KEY, JSON.stringify(user));
};

export const removeLoggedInUserFromLocalStrorage = () => {
  localStorage.removeItem(LOGGED_IN_USER_DETAILS_KEY);
};
