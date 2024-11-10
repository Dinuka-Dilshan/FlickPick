import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

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
  const { user } = useAuth();
  const result = useQuery<T, TError>({
    queryKey: [queryKey],
    queryFn: queryFn
      ? queryFn
      : async () => {
          const response = await fetch(url || "", {
            method,
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
              Authorization: `${user?.accessToken}`,
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
