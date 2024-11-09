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
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<AuthenticatedUser | null>(
    () => getLoggedInUserFromLocalStrorage()
  );
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(
    async (authParams: { username: string; password: string }) => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const user = await Cognito.login(authParams);
        setLoggedInUser(user);
        setLoggedInUserToLocalStrorage(user);
        navigate(ROUTES.DEFAULT, { replace: true });
        enqueueSnackbar("Hey, Welcome Back!");
      } catch (error) {
        enqueueSnackbar(error?.message);
        setErrorMessage(error?.message);
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

  const signUp = useCallback(
    async (authParams: {
      email: string;
      password: string;
      birthdate: string;
      gender: string;
      fullname: string;
    }) => {
      try {
        setInfoMessage("");
        setErrorMessage("");
        setIsLoading(true);
        const result = await Cognito.signUp(authParams);
        setInfoMessage(
          !result.UserConfirmed
            ? "A verification email has been sent. Please check your inbox."
            : ""
        );
      } catch (error) {
        enqueueSnackbar(error?.message);
        setErrorMessage(error?.message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user: loggedInUser,
        isLoading,
        signUp,
        errorMessage,
        infoMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
