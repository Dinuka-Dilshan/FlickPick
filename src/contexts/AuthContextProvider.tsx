import { PropsWithChildren, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { enqueueSnackbar } from "notistack";
import { ROUTES } from "../constants/routes";
import { Cognito } from "../services/cognito";
import { AuthenticatedUser } from "../types/user";
import {
  getLoggedInUserFromLocalStrorage,
  removeLoggedInUserFromLocalStrorage,
  setLoggedInUserToLocalStrorage,
} from "../utils/localStorage";
import { AuthContext } from "./AuthContext";

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState<AuthenticatedUser | null>(
    () => getLoggedInUserFromLocalStrorage()
  );
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(
    async (authParams: { username: string; password: string }) => {
      try {
        setIsLoading(true);
        const user = await Cognito.login(authParams);
        setLoggedInUser(user);
        setLoggedInUserToLocalStrorage(user);
        navigate(ROUTES.DEFAULT, { replace: true });
        enqueueSnackbar("Hey, Welcome Back!");
      } catch (error) {
        enqueueSnackbar(error?.message);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await Cognito.logOut(loggedInUser!);
      setLoggedInUser(null);
      removeLoggedInUserFromLocalStrorage();
      navigate(ROUTES.LOGIN, { replace: true });
      enqueueSnackbar("Bye, See you again!");
    } catch {
      enqueueSnackbar("Logout failed! please try again later");
    } finally {
      setIsLoading(false);
    }
  }, [loggedInUser, navigate]);

  return (
    <AuthContext.Provider
      value={{ login, logout, user: loggedInUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
