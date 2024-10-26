import { useQuery } from "@tanstack/react-query";

type Props = {
  queryKey: string;
  url: string;
  method?: "GET" | "POST";
  body?: object;
  enabled?: boolean;
};

const useAppQuery = <T, TError = unknown>({
  queryKey,
  url,
  method = "GET",
  body,
  enabled = true,
}: Props) => {
  const result = useQuery<T, TError>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    staleTime: Infinity,
    enabled
  });

  return result;
};

export default useAppQuery;
