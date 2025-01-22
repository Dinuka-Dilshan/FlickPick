import { Box, Grid2, LinearProgress, Typography } from "@mui/material";
import { ReactNode } from "react";
import LoadingItemIndicator from "../LoadingItemIndicator/LoadingItemIndicator";
import EmptyListMessage from "./EmptyListMessage";

type Props<T> = {
  title?: React.ReactNode;
  error: unknown;
  isLoading: boolean;
  isNextPageLoading?: boolean;
  itemRenderer: (item: T, index: number) => ReactNode;
  itemList: T[] | undefined | null;
  emptyMessage?: {
    show: boolean;
    message: string;
    actionLabel: string;
    action: () => void;
  };
};

const ItemListLayout = <T,>({
  title,
  isLoading,
  itemRenderer,
  itemList,
  error,
  emptyMessage,
  isNextPageLoading,
}: Props<T>) => {
  if (error) {
    return <Box>Somthing went wrong! refresh the browser</Box>;
  }
  return (
    <Box>
      {title && (
        <Typography fontWeight="bold" sx={{ color: "#EFEFEF" }}>
          {title}
        </Typography>
      )}
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
      {emptyMessage?.show && (
        <EmptyListMessage
          isLoading={isLoading}
          itemList={itemList}
          message={emptyMessage.message}
          actionLabel={emptyMessage.actionLabel}
          action={emptyMessage.action}
        />
      )}
      {!isLoading && (
        <Grid2 container spacing={2} mt={"1rem"}>
          {itemList?.map?.((movie, index) => (
            <Grid2 size={{ xs: 6, md: 4, lg: 12 / 5 }} key={index}>
              {itemRenderer(movie, index)}
            </Grid2>
          ))}
        </Grid2>
      )}
      {isNextPageLoading && <LinearProgress sx={{ my: "1rem" }} />}
    </Box>
  );
};

export default ItemListLayout;
