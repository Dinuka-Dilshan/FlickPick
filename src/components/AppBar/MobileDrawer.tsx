import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Grid2,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import useAuth from "../../hooks/useAuth";

type Props = {
  isOpen: boolean;
  handleOpen: () => void;
};

const MobileDrawer = ({ handleOpen, isOpen }: Props) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const { logout, isLoading, user } = useAuth();

  if (isLargeScreen) {
    return null;
  }

  return (
    <Drawer
      variant="temporary"
      open={isOpen}
      onClose={handleOpen}
      ModalProps={{
        keepMounted: true,
      }}
      anchor="bottom"
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: "100vw",
          borderTopRightRadius: "20px",
          borderTopLeftRadius: "20px",
          backgroundColor: "#1F1F1F",
        },
      }}
    >
      <Box
        sx={{
          bgcolor: "#2D2D2D",
          height: "100%",
          p: "2rem",
          gap: 1.5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid2 container gap={1.5}>
          <Grid2
            size={{ xs: 2 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar sx={{ width: "32px", height: "32px" }} src={user?.picture}/>
          </Grid2>
          <Grid2
            size={{ xs: 9 }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography
              fontSize="0.75rem"
              fontWeight="bold"
              sx={{ color: "#EFEFEF" }}
            >
              {user?.name}
            </Typography>
            <Typography
              fontSize="0.75rem"
              component="span"
              sx={{ color: "#EFEFEF" }}
            >
              {user?.email}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Divider />
          </Grid2>
        </Grid2>

        <Button
          disabled={isLoading}
          onClick={logout}
          size="medium"
          sx={{
            textTransform: "none",
            px: "1rem",
            marginTop: "auto",

            mt: "1rem",
          }}
          variant="outlined"
          fullWidth
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
