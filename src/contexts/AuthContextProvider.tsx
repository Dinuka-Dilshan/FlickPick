import { SignUpCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import {
  Cognito,
  CognitoLoginProps,
  CognitoSignupProps,
  CognitoVerifyProps,
} from "../services/cognito";
import { AuthenticatedUser } from "../types/user";
import {
  removeLoggedInUserFromLocalStrorage,
  setLoggedInUserToLocalStrorage,
} from "../utils/localStorage";
import { AuthContext } from "./AuthContext";

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending: isLoginLoading,
    data: user,
    reset: resetLogin,
  } = useMutation<AuthenticatedUser, Error, CognitoLoginProps>({
    onError: (error, props) => {
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
      setLoggedInUserToLocalStrorage(user);
      navigate(ROUTES.DEFAULT, { replace: true });
      enqueueSnackbar("Hey, Welcome Back!");
    },
    mutationFn: async (props) => await Cognito.login(props),
  });

  const { mutate: logout, isPending: isLogOutLoading } = useMutation<
    void,
    Error,
    void
  >({
    onError: () => {
      enqueueSnackbar("Logout failed! please try again later");
    },
    onSuccess: () => {
      removeLoggedInUserFromLocalStrorage();
      navigate(ROUTES.LOGIN, { replace: true });
      enqueueSnackbar("Bye, See you again!");
      resetLogin();
    },
    mutationFn: async () => await Cognito.logOut(user!),
  });

  const { mutate: signUp, isPending: isSignUpLoading } = useMutation<
    SignUpCommandOutput,
    Error,
    CognitoSignupProps
  >({
    onError: (error) => {
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
  });

  const { mutate: verify, isPending: isVerifyLoading } = useMutation<
    void,
    Error,
    CognitoVerifyProps
  >({
    onError: (error) => {
      enqueueSnackbar(error.message);
    },
    onSuccess: () => {
      navigate(ROUTES.LOGIN);
    },
    mutationFn: async (props) => await Cognito.verify(props),
  });

  return (
    <AuthContext.Provider
      value={{
        isLoading:
          isLoginLoading ||
          isLogOutLoading ||
          isSignUpLoading ||
          isVerifyLoading,
        login,
        logout,
        signUp,
        verify,
        user: user ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
