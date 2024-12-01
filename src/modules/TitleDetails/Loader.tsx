import { Grid2, Skeleton } from "@mui/material";

const LoaderItem = () => (
  <Skeleton
    variant="rounded"
    width="100%"
    height="100%"
    sx={{ borderRadius: "12px" }}
  />
);

const Loader = () => {
  return (
    <Grid2 container height="100%" rowSpacing={1} columnSpacing={1} mb="2rem">
      <Grid2 size={{ xs: 12 }} sx={{ height: "10vh" }}>
        <LoaderItem />
      </Grid2>
      <Grid2 size={{ xs: 12 }} sx={{ height: 400 }}>
        <LoaderItem />
      </Grid2>
      <Grid2 size={{ xs: 6 }} sx={{ height: 150 }}>
        <LoaderItem />
      </Grid2>
      <Grid2 size={{ xs: 6 }} sx={{ height: 150 }}>
        <LoaderItem />
      </Grid2>
      <Grid2 size={{ xs: 12 }} sx={{ height: "10vh" }}>
        <LoaderItem />
      </Grid2>
    </Grid2>
  );
};

export default Loader;
