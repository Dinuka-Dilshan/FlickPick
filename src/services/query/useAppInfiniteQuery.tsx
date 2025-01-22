import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { AuthenticatedUser } from "../../types/user";
import {
  isAccessTokenValid,
  isRefreshTokenValid,
} from "../../utils/validations";

type Props = {
  queryKey: string;
  url?: string;
  method?: "GET" | "POST";
  body?: object;
  enabled?: boolean;
};

const useAppInfiniteQuery = <
  T extends {
    lastEvaluatedKey?: {
      PK?: string;
      SK?: string;
    };
  },
  TError = unknown
>({
  queryKey,
  url,
  method = "GET",
  body,
  enabled = true,
}: Props) => {
  const { user, refresh, logout } = useAuth();

  const result = useInfiniteQuery<
    T,
    TError,
    InfiniteData<
      T,
      {
        lastEvaluatedKey?: {
          PK?: string;
          SK?: string;
        };
      }
    >,
    QueryKey,
    {
      PK?: string;
      SK?: string;
    }
  >({
    queryKey: [queryKey],
    queryFn: async ({ pageParam }) => {
      let refreshedUser: AuthenticatedUser | null = null;

      if (user && !isAccessTokenValid(user)) {
        if (isRefreshTokenValid(user)) {
          refreshedUser = await refresh(user);
        } else {
          logout();
        }
      }

      const response = await fetch(
        `${url}${
          pageParam?.SK && pageParam?.PK
            ? `?SK=${encodeURIComponent(pageParam?.SK)}&PK=${encodeURIComponent(
                pageParam?.PK
              )}`
            : ""
        }`,
        {
          method,
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: refreshedUser
              ? `${refreshedUser.accessToken}`
              : `${user?.accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    staleTime: Infinity,
    enabled,
    initialPageParam: { PK: "", SK: "" },
    getNextPageParam: (lastPage) => lastPage.lastEvaluatedKey,
  });
  return result;
};

export default useAppInfiniteQuery;
