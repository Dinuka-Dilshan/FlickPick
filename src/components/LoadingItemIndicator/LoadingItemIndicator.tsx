import { Grid2, Skeleton } from "@mui/material";

const LoadingItemIndicator = () => {
  return (
    <Grid2 container spacing={1.5} mt={"1rem"}>
      {[...Array(25)].map((_, index) => (
        <Grid2 size={{ xs: 6, md: 3 }} key={index}>
          <Skeleton variant="rounded" width="100%" height={300} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default LoadingItemIndicator;
