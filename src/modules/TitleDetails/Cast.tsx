import { Avatar, Box, Typography } from "@mui/material";
import { Swiper } from "swiper/react";
import { TitleDetails } from "../../types/apiResponses";
import { getImageURL } from "../../utils/image";

import Slider from "../../components/Slider/Slider";

type Props = {
  cast: TitleDetails["cast"];
  itemsPerView: number;
};

const Cast = ({ itemsPerView, cast }: Props) => {
  return (
    <Swiper spaceBetween={10} slidesPerView={itemsPerView}>
      <Slider<TitleDetails["cast"][0]>
        list={cast}
        itemsPerView={itemsPerView}
        itemRenderer={(actor) => (
          <Box
            sx={{
              bgcolor: "#2C3032",
              p: "0.5rem",
              borderRadius: "12px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
              }}
              src={getImageURL(actor.image, 150)}
            />
            <Typography
              variant="subtitle1"
              textAlign="center"
              sx={{ color: "#EFEFEF", fontSize: "0.9rem", mt: "1rem" }}
            >
              {actor.name}
            </Typography>
          </Box>
        )}
        getId={(actor) => actor.id}
      />
    </Swiper>
  );
};

export default Cast;
