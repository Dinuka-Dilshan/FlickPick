import { createContext } from "react";
import { AuthenticatedUser } from "../types/user";

export type AuthContext = {
  user: AuthenticatedUser | null;
  login: (params: { username: string; password: string }) => void;
  logout: () => void;
  isLoading: boolean;
  signUp: (authParams: {
    email: string;
    password: string;
    birthdate: string;
    gender: string;
    fullname: string;
  }) => void;
  errorMessage: string;
  infoMessage: string;
};
export const AuthContext = createContext<AuthContext>({
  login: () => null,
  logout: () => null,
  user: null,
  isLoading: false,
  signUp: () => null,
  errorMessage: "",
  infoMessage: "",
});
