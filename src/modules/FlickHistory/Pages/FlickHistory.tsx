import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ItemListLayout from "../../../components/Layouts/ItemListLayout";
import MovieCard from "../../../components/MovieCard/MovieCard";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { ROUTES } from "../../../constants/routes";
import { URLS } from "../../../constants/urls";
import useVisible from "../../../hooks/useVisible";
import useAppInfiniteQuery from "../../../services/query/useAppInfiniteQuery";
import { FlickHistoryGetResponse } from "../../../types/flickHistory";

const FlickHistory = () => {
  const navigate = useNavigate();

  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } =
    useAppInfiniteQuery<FlickHistoryGetResponse>({
      queryKey: QUERY_KEYS.FLICK_HISTORY,
      url: URLS.FLICK_HISTORY(),
    });

  const { isVisible, ref } = useVisible();

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [fetchNextPage, isVisible]);

  const fullList = useMemo(
    () => data?.pages.flatMap((page) => page.historyItems) || [],
    [data?.pages]
  );

  return (
    <ItemListLayout
      error={error}
      isLoading={isLoading}
      isNextPageLoading={isFetchingNextPage}
      itemList={fullList}
      title="Flick History"
      itemRenderer={(movie, index) => (
        <span ref={index + 1 === fullList.length ? ref : null}>
          <MovieCard
            hideWishListButton
            movie={{
              posterUrl: movie.image,
              addedOn: movie.addedOn,
              imdbId: movie.imdbId,
              title: movie.title,
            }}
            isAddedToWatchList={false} //flick history page does not have watchlist button ):
          >
            <MovieCard.MovieCardHistoryDetails />
          </MovieCard>
        </span>
      )}
      emptyMessage={{
        show: true,
        actionLabel: "Explore the Top Chart",
        message:
          "Your History is emptier than a popcorn bucket after movie night.",
        action: () => navigate(ROUTES.POPULAR_MOVIES),
      }}
    />
  );
};

export default FlickHistory;
