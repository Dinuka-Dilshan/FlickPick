import { Box } from "@mui/material";
import { QUERY_KEYS } from "../constants/queryKeys";
import { URLS } from "../constants/urls";
import useAppQuery from "../services/query/useAppQuery";

const WatchList = () => {
  const { data, isFetching } = useAppQuery({
    url: URLS.WATCH_LIST(),
    queryKey: QUERY_KEYS.WATCH_LIST,
  });
  console.log(data);
  return <Box></Box>;
};

export default WatchList;
