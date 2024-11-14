import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { AuthenticatedUser } from "../../types/user";
import {
  isAccessTokenValid,
  isRefreshTokenValid,
} from "../../utils/validations";

type Props<T> = {
  queryKey: string;
  url?: string;
  method?: "GET" | "POST";
  body?: object;
  enabled?: boolean;
  queryFn?: () => Promise<T>;
};

const useAppQuery = <T, TError = unknown>({
  queryKey,
  url,
  method = "GET",
  body,
  enabled = true,
  queryFn,
}: Props<T>) => {
  const { user, refresh } = useAuth();

  const result = useQuery<T, TError>({
    queryKey: [queryKey],
    queryFn: queryFn
      ? queryFn
      : async () => {
          let refreshedUser: AuthenticatedUser | null = null;

          if (user && !isAccessTokenValid(user) && isRefreshTokenValid(user)) {
            refreshedUser = await refresh(user);
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
  });

  return result;
};

export default useAppQuery;
