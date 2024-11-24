import ItemListLayout from "../../../components/Layouts/ItemListLayout";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { URLS } from "../../../constants/urls";
import useAppQuery from "../../../services/query/useAppQuery";
import { WatchListResponse } from "../../../types/apiResponses";
import { WatchListMovie } from "../../../types/movie";
import WatchListItem from "../WatchListItem";

const WatchList = () => {
  const { data, isFetching, error } = useAppQuery<WatchListResponse>({
    url: URLS.WATCH_LIST(),
    queryKey: QUERY_KEYS.WATCH_LIST,
  });

  return (
    <ItemListLayout<WatchListMovie>
      error={error}
      isLoading={isFetching}
      itemList={data || []}
      itemRenderer={(movie) => <WatchListItem movie={movie} />}
      title=" Your WatchList"
    />
  );
};

export default WatchList;
