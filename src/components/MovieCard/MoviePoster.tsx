import { styled, SxProps, Theme } from "@mui/system";
import { motion } from "framer-motion";

type Props = {
  image: string;
  sx?: SxProps<Theme>;
  hideAnimation?: boolean;
  containerSx?: React.CSSProperties;
};

const animation = {
  whileHover: {
    scale: 1.1, // Zoom in the image when hovered
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  initial: { scale: 1 }, // Initial size of the image
  animate: { scale: 1 }, // Ensure it stays the same when not hovered or tapped
  whileTap: {
    scale: 1.1, // Slight zoom when tapped
    transition: {
      duration: 0.2,
    },
  },
};

const Image = styled(motion.img)({
  objectFit: "cover",
  borderRadius: "12px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  height: "100%",
  width: "100%",
});

const MoviePoster = ({ image, sx, hideAnimation, containerSx }: Props) => {
  return (
    <motion.div
      style={{
        overflow: "hidden",
        width: "100%",
        height: "100%",
        borderRadius: "16px",
        ...containerSx,
      }}
    >
      <Image
        src={image}
        sx={sx}
        loading="lazy"
        {...(hideAnimation ? {} : animation)}
        style={{
          height: "100%",
          width: "100%",
          transformOrigin: "center",
        }}
      />
    </motion.div>
  );
};

export default MoviePoster;
