import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { createContext } from "react";
import {
  CognitoLoginProps,
  CognitoSignupProps,
  CognitoVerifyProps,
} from "../../../services/cognito";
import { AuthenticatedUser } from "../../../types/user";

export type AuthContext = {
  user: AuthenticatedUser | null;
  login: (params: CognitoLoginProps) => void;
  logout: () => void;
  isLoading: boolean;
  signUp: (authParams: CognitoSignupProps) => void;
  verify: (params: CognitoVerifyProps) => void;
  errorMessage?: string;
  clearErrorMessage: () => void;
  refresh: UseMutateAsyncFunction<
    AuthenticatedUser,
    Error,
    AuthenticatedUser,
    unknown
  >;
  isInitializing: boolean;
  googleLogin: () => void;
  isGoogleLoginLoading: boolean;
};
export const AuthContext = createContext<AuthContext>({
  googleLogin: () => null,
  login: () => null,
  logout: () => null,
  user: null,
  isLoading: false,
  signUp: () => null,
  errorMessage: "",
  clearErrorMessage: () => null,
  verify: () => null,
  refresh: () =>
    Promise.resolve({
      accessToken: "",
      accessTokenExpiresOn: 0,
      picture: "",
      email: "",
      idToken: "",
      name: "",
      refreshToken: "",
      refreshTokenExpiresOn: 0,
      isGoogleUser: false,
    }),
  isInitializing: true,
  isGoogleLoginLoading: false,
});
