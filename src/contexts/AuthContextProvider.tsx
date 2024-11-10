import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();

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
        if (error?.message?.includes("User is not confirmed.")) {
          navigate(ROUTES.VERIFY_ACCOUNT, {
            replace: true,
            state: { userName: authParams.username },
          });
        } else {
          enqueueSnackbar(error?.message);
          setErrorMessage(error?.message);
        }
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
        if (!result.UserConfirmed) {
          navigate(ROUTES.VERIFY_ACCOUNT, {
            replace: true,
            state: { userName: authParams.email },
          });
        }
      } catch (error) {
        enqueueSnackbar(error?.message);
        setErrorMessage(error?.message);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  const verify = useCallback(
    async (request: { userName: string; otp: string }) => {
      try {
        setInfoMessage("");
        setErrorMessage("");
        setIsLoading(true);
        await Cognito.verify(request);
        setInfoMessage("Verification Succesful. Please Login");
        navigate(ROUTES.LOGIN);
      } catch (error) {
        enqueueSnackbar(error?.message);
        setErrorMessage(error?.message);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  const clearInfo = () => setInfoMessage("");
  const clearErrorMessage = () => setErrorMessage("");

  useEffect(() => {
    clearInfo();
    clearErrorMessage();
  }, [location]);

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
        clearErrorMessage,
        clearInfo,
        verify,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
