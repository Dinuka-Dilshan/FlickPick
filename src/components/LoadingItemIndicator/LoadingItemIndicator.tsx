import { Grid2, Skeleton } from "@mui/material";

const LoadingItemIndicator = () => {
  return (
    <Grid2 container spacing={1.5} mt={"1rem"}>
      {[...Array(25)].map((_, index) => (
        <Grid2 size={{ xs: 6, md: 4, lg: 12 / 5 }} key={index}>
          <Skeleton
            variant="rounded"
            width="100%"
            sx={{ borderRadius: "12px", height: { xs: 300, lg: 350 } }}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default LoadingItemIndicator;
