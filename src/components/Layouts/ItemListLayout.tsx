import { Box, Grid2, Typography } from "@mui/material";
import { ReactNode } from "react";
import LoadingItemIndicator from "../LoadingItemIndicator/LoadingItemIndicator";

type Props<T> = {
  title: string;
  error: unknown;
  isLoading: boolean;
  itemRenderer: (item: T) => ReactNode;
  itemList: T[];
};

const ItemListLayout = <T,>({
  title,
  isLoading,
  itemRenderer,
  itemList,
  error,
}: Props<T>) => {
  if (error) {
    return <Box>Somthing went wrong! refresh the browser</Box>;
  }
  return (
    <Box>
      <Typography fontWeight="bold" sx={{ color: "#EFEFEF" }}>
        {title}
      </Typography>
      <LoadingItemIndicator
        isLoading={isLoading}
        itemCount={25}
        itemsPerRow={{
          xs: 2,
          md: 3,
          lg: 5,
        }}
        itemHeight={{ xs: 250, md: 300, lg: 350 }}
      />
      {!isLoading && (
        <Grid2 container spacing={2} mt={"1rem"}>
          {itemList?.map?.((movie, index) => (
            <Grid2 size={{ xs: 6, md: 4, lg: 12 / 5 }} key={index}>
              {itemRenderer(movie)}
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
};

export default ItemListLayout;
