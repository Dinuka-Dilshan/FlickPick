import { Typography, TypographyProps } from "@mui/material";

const Logo = ({ sx, ...rest }: TypographyProps) => {
  return (
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: "1.2rem",
        color: "#E7E7E7",
        ...sx,
      }}
      {...rest}
    >
      FlickPick
    </Typography>
  );
};

export default Logo;
