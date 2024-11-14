import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { createContext } from "react";
import {
  CognitoLoginProps,
  CognitoSignupProps,
  CognitoVerifyProps,
} from "../services/cognito";
import { AuthenticatedUser } from "../types/user";

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
};
export const AuthContext = createContext<AuthContext>({
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
      birthday: "",
      email: "",
      gender: "",
      idToken: "",
      name: "",
      refreshToken: "",
      refreshTokenExpiresOn: 0,
    }),
});
