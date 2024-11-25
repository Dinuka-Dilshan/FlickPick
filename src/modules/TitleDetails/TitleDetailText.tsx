import { Box, Divider, Grid2, SxProps, Theme, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  showDivider?: { top: boolean; bottom: boolean };
  label?: string;
  value?: ReactNode | null;
  valueFontStyles?: SxProps<Theme>;
  chips?: boolean;
};

const TitleDetailText = ({
  label,
  value,
  showDivider = { bottom: true, top: true },
  valueFontStyles,
  chips,
}: Props) => {
  if (!value) return null;
  return (
    <Grid2
      mt={chips ? "0.5rem" : 0}
      size={{ xs: 12 }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      {showDivider.top && <Divider sx={{ bgcolor: "#B3B3B3", p: 0 }} />}
      {chips ? (
        value
      ) : (
        <Box display="flex" alignItems="center" gap={2}>
          {label && (
            <Typography
              fontWeight="bold"
              sx={{ color: "#B3B3B3" }}
              py="0.75rem"
            >
              {label}
            </Typography>
          )}
          <Typography
            fontWeight="bold"
            sx={{ color: "#EFEFEF", ...valueFontStyles }}
            py="0.75rem"
          >
            {value}
          </Typography>
        </Box>
      )}
      {showDivider.bottom && <Divider sx={{ bgcolor: "#B3B3B3", p: 0 }} />}
    </Grid2>
  );
};

export default TitleDetailText;
