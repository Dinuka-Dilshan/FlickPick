import { Typography, TypographyProps } from "@mui/material";

const Logo = (props: TypographyProps) => {
  return (
    <Typography
      sx={{
        fontWeight: 700,
        color: "primary.main",
        fontSize: "1.5rem",
      }}
      {...props}
    >
      <span style={{ color: "#1A1A1A" }}>Flick</span>Pick
    </Typography>
  );
};

export default Logo;
