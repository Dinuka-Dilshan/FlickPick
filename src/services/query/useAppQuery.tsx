import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { AuthenticatedUser } from "../../types/user";
import {
  isAccessTokenValid,
  isRefreshTokenValid,
} from "../../utils/validations";

type Props<T, K> = {
  queryKey: string;
  url?: string;
  method?: "GET" | "POST";
  body?: object;
  enabled?: boolean;
  queryFn?: () => Promise<T>;
  select?: ((data: T) => K) | undefined;
};

const useAppQuery = <T, TError = unknown, K = T>({
  queryKey,
  url,
  method = "GET",
  body,
  enabled = true,
  queryFn,
  select,
}: Props<T, K>) => {
  const { user, refresh, logout } = useAuth();

  const result = useQuery<T, TError, K>({
    queryKey: [queryKey],
    queryFn: queryFn
      ? queryFn
      : async () => {
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
            body: JSON.stringify(body),
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
    staleTime: Infinity,
    enabled,
    select,
  });

  return result;
};

export default useAppQuery;
