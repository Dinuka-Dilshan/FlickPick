import { Grid2, Skeleton } from "@mui/material";

type Props = {
  itemCount: number;
  itemsPerRow: {
    xs?: number;
    md?: number;
    lg?: number;
  };
  itemHeight?: {
    xs?: number;
    md?: number;
    lg?: number;
  };
  isLoading: boolean;
};

const LoadingItemIndicator = ({
  itemCount,
  itemsPerRow,
  itemHeight,
  isLoading,
}: Props) => {
  if (!isLoading) {
    return null;
  }
  return (
    <Grid2 container spacing={1.5} mt={"1rem"}>
      {[...Array(itemCount)].map((_, index) => (
        <Grid2
          size={{
            xs: 12 / (itemsPerRow.xs || 1),
            md: 12 / (itemsPerRow.md || 1),
            lg: 12 / (itemsPerRow.lg || 1),
          }}
          key={index}
        >
          <Skeleton
            variant="rounded"
            width="100%"
            sx={{
              borderRadius: "12px",
              height: { xs: itemHeight?.xs, lg: itemHeight?.lg },
            }}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default LoadingItemIndicator;
