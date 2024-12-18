import { Avatar, Box, Typography } from "@mui/material";
import { useKeenSlider } from "keen-slider/react";
import { TitleDetails } from "../../types/apiResponses";

type Props = {
  cast: TitleDetails["cast"];
  itemsPerView: number;
};

const Cast = ({ itemsPerView, cast }: Props) => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: itemsPerView,
      spacing: 10,
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider">
      {cast?.map((actor) => (
        <div className="keen-slider__slide" key={actor.id}>
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
              src={actor.image}
            />
            <Typography
              variant="subtitle1"
              textAlign="center"
              sx={{ color: "#EFEFEF", fontSize: "0.9rem", mt: "1rem" }}
            >
              {actor.name}
            </Typography>
          </Box>
        </div>
      ))}
    </div>
  );
};

export default Cast;
