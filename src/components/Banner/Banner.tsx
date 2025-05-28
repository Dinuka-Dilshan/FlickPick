import { Box, Typography } from "@mui/material";

const Banner = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#f5f5f5",
        padding: "16px",
        zIndex: 1000,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        This site is no longer maintained. Plese visit{" "}
        <a
          href="https://www.myanimelist.net/"
          target="_blank"
          rel="noopener noreferrer"
        >
          for the new preview site.
        </a>
      </Typography>
    </Box>
  );
};

export default Banner;
