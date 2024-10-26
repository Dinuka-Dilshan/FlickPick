import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import useAppQuery from "../Query/useAppQuery";
import { QUERY_KEYS } from "../constants/queryKeys";
import { URLS } from "../constants/urls";

const TitleDetails = () => {
  const params = useParams();
  const title = params.id ?? "";
  const { data } = useAppQuery({
    queryKey: QUERY_KEYS.TITLE_DETAILS(title),
    url: URLS.TITLE_DETAILS(title),
    enabled: !!title,
  });
  console.log(data);
  return <Box>{params.id}</Box>;
};

export default TitleDetails;
