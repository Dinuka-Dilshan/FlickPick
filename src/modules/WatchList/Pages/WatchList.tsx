import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ItemListLayout from "../../../components/Layouts/ItemListLayout";
import MovieCard from "../../../components/MovieCard/MovieCard";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { ROUTES } from "../../../constants/routes";
import { URLS } from "../../../constants/urls";
import useVisible from "../../../hooks/useVisible";
import useAppInfiniteQuery from "../../../services/query/useAppInfiniteQuery";
import { WatchListItem, WatchListResponse } from "../../../types/apiResponses";

const WatchList = () => {
  const { data, isLoading, error, fetchNextPage , isFetchingNextPage} =
    useAppInfiniteQuery<WatchListResponse>({
      url: URLS.WATCH_LIST(),
      queryKey: QUERY_KEYS.WATCH_LIST,
    });
  const navigate = useNavigate();

  const { isVisible, ref } = useVisible();

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [fetchNextPage, isVisible]);

  const fullList = useMemo(
    () => data?.pages?.flatMap((page) => page.watchListItems) || [],
    [data?.pages]
  );

  return (
    <ItemListLayout<WatchListItem>
      error={error}
      isLoading={isLoading}
      isNextPageLoading={isFetchingNextPage}
      itemList={fullList}
      itemRenderer={(movie, index) => (
        <span ref={index + 1 === fullList?.length ? ref : null}>
          <MovieCard movie={movie}>
            <MovieCard.TitleContainer>
              <MovieCard.Title />
              <MovieCard.AddedOn />
            </MovieCard.TitleContainer>
          </MovieCard>
        </span>
      )}
      title=" Your WatchList"
      emptyMessage={{
        show: true,
        actionLabel: "Explore the Top Chart",
        message:
          "Your watchlist is emptier than a popcorn bucket after movie night.",
        action: () => navigate(ROUTES.POPULAR_MOVIES),
      }}
    />
  );
};

export default WatchList;
