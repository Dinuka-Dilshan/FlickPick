import { Box } from "@mui/material";
import "./styles.css";

const FullScreenLoader = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "#2D2D2D",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="dancingLetters"></div>
    </Box>
  );
};

export default FullScreenLoader;
