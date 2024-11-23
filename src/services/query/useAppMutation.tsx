import { MutationFunction, useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { AuthenticatedUser } from "../../types/user";
import {
  isAccessTokenValid,
  isRefreshTokenValid,
} from "../../utils/validations";

type Props<T, K> = {
  url?: string;
  method?: "GET" | "POST" | "DELETE";
  mutationFn?: MutationFunction<T, K>;
  onSuccess?: (data: T, variables: K) => Promise<unknown>;
};

const useAppMutation = <T, TError = unknown, K = T>({
  url,
  method = "POST",
  mutationFn,
  onSuccess,
}: Props<T, K>) => {
  const { user, refresh, logout } = useAuth();

  const result = useMutation<T, TError, K>({
    mutationFn: mutationFn
      ? mutationFn
      : async (data) => {
          let refreshedUser: AuthenticatedUser | null = null;

          if (user && !isAccessTokenValid(user)) {
            if (isRefreshTokenValid(user)) {
              refreshedUser = await refresh(user);
            } else {
              logout();
            }
          }

          const response = await fetch(url || "", {
            method,
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
              Authorization: refreshedUser
                ? `${refreshedUser.accessToken}`
                : `${user?.accessToken}`,
            },
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        },
    onSuccess,
  });

  return result;
};

export default useAppMutation;
