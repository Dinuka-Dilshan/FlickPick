import { Box, Typography, TypographyProps } from "@mui/material";
import { MdVideoStable } from "react-icons/md";

const Logo = ({ sx, ...rest }: TypographyProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
      }}
    >
      <MdVideoStable style={{ fontSize: "1.9rem", color: "#9333ea" }} />
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "1.2rem",
          color: "#E7E7E7",
          background: "linear-gradient(90deg, #9333ea, #f472b6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          ml: { xs: "-0.4rem" },
          ...sx,
        }}
        {...rest}
      >
        FlickPick
      </Typography>
    </Box>
  );
};

export default Logo;
