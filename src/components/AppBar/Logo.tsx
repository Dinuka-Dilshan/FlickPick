import { Typography, TypographyProps } from "@mui/material";

const Logo = ({ sx, ...rest }: TypographyProps) => {
  return (
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: "1.2rem",
        color: "#E7E7E7",
        background: "linear-gradient(90deg, #9333ea, #f472b6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        ml: { xs: 0, lg: "-0.5rem" },
        ...sx,
      }}
      {...rest}
    >
      FlickPick
    </Typography>
  );
};

export default Logo;
