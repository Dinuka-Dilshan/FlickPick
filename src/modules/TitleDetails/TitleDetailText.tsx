import { Box, Grid2, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  label?: string;
  value?: ReactNode | null;
  size?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
};

const TitleDetailText = ({ label, value, size = { xs: 6 } }: Props) => {
  if (!value) return null;
  return (
    <Grid2 size={size}>
      <Box
        display="flex"
        alignItems="flex-start"
        bgcolor="#2C3032"
        p="0.75rem"
        borderRadius="12px"
        height="100%"
        flexDirection="column"
        justifyContent="center"
        gap="0.75rem"
      >
        {label && <Typography sx={{ color: "#E8F2F7" }}>{label}</Typography>}
        <Typography sx={{ color: "#E8F2F7", textAlign: "justify" }}>
          {value}
        </Typography>
      </Box>
    </Grid2>
  );
};

export default TitleDetailText;
