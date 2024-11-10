import { Grid2, Grid2Props } from "@mui/material";
import { PropsWithChildren } from "react";

const AuthLayoutItem = ({
  children,
  ...rest
}: PropsWithChildren<Grid2Props>) => {
  return (
    <Grid2 size={{ xs: 12 }} {...rest}>
      {children}
    </Grid2>
  );
};

export default AuthLayoutItem;
