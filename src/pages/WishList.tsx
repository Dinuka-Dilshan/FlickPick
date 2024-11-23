import { Box } from "@mui/material";
import { QUERY_KEYS } from "../constants/queryKeys";
import { URLS } from "../constants/urls";
import useAppQuery from "../services/query/useAppQuery";

const WishList = () => {
  const { data, isFetching } = useAppQuery({
    url: URLS.WISH_LIST(),
    queryKey: QUERY_KEYS.WISH_LIST,
  });
  console.log(data);
  return <Box></Box>;
};

export default WishList;
