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
});
