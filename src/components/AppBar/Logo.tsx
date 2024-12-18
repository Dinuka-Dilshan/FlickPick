import VideoStableIcon from '@mui/icons-material/VideoStable';
import { Box, Typography, TypographyProps } from "@mui/material";

const Logo = ({ sx, ...rest }: TypographyProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" , alignItems:'center', gap:1}}>
      <VideoStableIcon sx={{fontSize:'1.9rem', color:'#9333ea'}}/>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "1.2rem",
          color: "#E7E7E7",
          background: "linear-gradient(90deg, #9333ea, #f472b6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          ml: { xs:  "-0.4rem" },
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
