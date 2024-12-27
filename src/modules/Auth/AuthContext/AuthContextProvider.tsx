import { SignUpCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { PropsWithChildren, useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { MUTATION_KEYS } from "../../../constants/mutationKeys";
import { ROUTES } from "../../../constants/routes";
import {
  Cognito,
  CognitoLoginProps,
  CognitoSignupProps,
  CognitoVerifyProps,
} from "../../../services/cognito";
import { AuthenticatedUser } from "../../../types/user";
import {
  getLoggedInUserFromLocalStrorage,
  removeLoggedInUserFromLocalStrorage,
  setLoggedInUserToLocalStrorage,
} from "../../../utils/localStorage";
import {
  isAccessTokenValid,
  isRefreshTokenValid,
} from "../../../utils/validations";
import { AuthContext } from "./AuthContext";

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const googleAuthCode = params.get("code");
  const location = useLocation();
  const [user, setUser] = useState<AuthenticatedUser | null>();
  const [errorMessage, setErrorMessage] = useState("");
  const client = useQueryClient();
  const [isInitializing, setIsInitializing] = useState(true);
  const [isGoogleLoginLoading, setIsGoogleLoginLoading] = useState(false);

  const {
    mutate: login,
    isPending: isLoginLoading,
    reset: resetLogin,
  } = useMutation<AuthenticatedUser, Error, CognitoLoginProps>({
    onError: (error, props) => {
      setErrorMessage(error.message);
      setIsGoogleLoginLoading(false);
      if (error.message.includes("User is not confirmed.")) {
        navigate(ROUTES.VERIFY_ACCOUNT, {
          replace: true,
          state: { userName: props.userName },
        });
      } else {
        enqueueSnackbar(error.message);
      }
    },
    onSuccess: (user) => {
      if (user.isGoogleUser) {
        setIsGoogleLoginLoading(false);
      }
      setUser(user);
      setLoggedInUserToLocalStrorage(user);
      navigate(location.state?.from || ROUTES.DEFAULT, { replace: true });
      enqueueSnackbar("Hey, Welcome Back!");
    },
    mutationFn: async (props) => await Cognito.login(props),
    mutationKey: [MUTATION_KEYS.LOGIN],
  });

  const { mutate: logout, isPending: isLogOutLoading } = useMutation<
    void,
    Error,
    void
  >({
    onError: (error) => {
      enqueueSnackbar("Logout failed! please try again later");
      setErrorMessage(error.message);
    },
    onSuccess: () => {
      removeLoggedInUserFromLocalStrorage();
      setUser(null);
      navigate(ROUTES.LOGIN, { replace: true });
      client.clear();
      enqueueSnackbar("Bye, See you again!");
      resetLogin();
    },
    mutationFn: async () => await Cognito.logOut(),
    mutationKey: [MUTATION_KEYS.LOGOUT],
  });

  const { mutate: signUp, isPending: isSignUpLoading } = useMutation<
    SignUpCommandOutput,
    Error,
    CognitoSignupProps
  >({
    onError: (error) => {
      setErrorMessage(error.message);
      enqueueSnackbar(error.message);
    },
    onSuccess: (signUpData, props) => {
      if (!signUpData.UserConfirmed) {
        navigate(ROUTES.VERIFY_ACCOUNT, {
          replace: true,
          state: { userName: props.email },
        });
      }
    },
    mutationFn: async (props) => await Cognito.signUp(props),
    mutationKey: [MUTATION_KEYS.SIGNUP],
  });

  const { mutate: verify, isPending: isVerifyLoading } = useMutation<
    void,
    Error,
    CognitoVerifyProps
  >({
    onError: (error) => {
      setErrorMessage(error.message);
      enqueueSnackbar(error.message);
    },
    onSuccess: () => {
      navigate(ROUTES.LOGIN);
    },
    mutationFn: async (props) => await Cognito.verify(props),
    mutationKey: [MUTATION_KEYS.VERIFY],
  });

  const { mutateAsync: refresh, isPending: isRefreshLoading } = useMutation<
    AuthenticatedUser,
    Error,
    AuthenticatedUser
  >({
    onError: (error) => {
      setErrorMessage(error.message);
      removeLoggedInUserFromLocalStrorage();
      setUser(null);
      enqueueSnackbar("Session expired. Please log in again.");
    },
    onSuccess: (user) => {
      setUser(user);
      setLoggedInUserToLocalStrorage(user);
    },
    mutationFn: async (props) => await Cognito.refreshTokens(props),
    mutationKey: [MUTATION_KEYS.VERIFY],
  });

  const googleLogin = () => {
    setIsGoogleLoginLoading(true);
    const url = `${
      import.meta.env.VITE_COGNITO_DOMAIN
    }/oauth2/authorize?client_id=${
      import.meta.env.VITE_COGNITO_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_AUTH_REDIRECT_URL
    }&identity_provider=Google&response_type=code`;

    window.location.href = url;
  };

  useEffect(() => {
    setErrorMessage("");
  }, [location]);

  useLayoutEffect(() => {
    if (isLoginLoading) {
      return;
    }

    if (googleAuthCode) {
      setIsGoogleLoginLoading(true);
      login({ googleAuthCode, passWord: "", userName: "" });
    }
  }, [googleAuthCode, isLoginLoading, login]);

  useLayoutEffect(() => {
    const cachedUser = getLoggedInUserFromLocalStrorage();

    if (!cachedUser) {
      setIsInitializing(false);
      return;
    }

    if (isAccessTokenValid(cachedUser)) {
      setUser(cachedUser);
      setIsInitializing(false);
      return;
    }

    if (isRefreshTokenValid(cachedUser)) {
      refresh(cachedUser);
      setIsInitializing(false);
    }
  }, [login, refresh]);

  return (
    <AuthContext.Provider
      value={{
        isLoading:
          isLoginLoading ||
          isLogOutLoading ||
          isSignUpLoading ||
          isVerifyLoading ||
          isRefreshLoading,
        isGoogleLoginLoading,
        login,
        logout,
        signUp,
        verify,
        refresh,
        googleLogin,
        user: user ?? null,
        errorMessage,
        clearErrorMessage: () => setErrorMessage(""),
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
