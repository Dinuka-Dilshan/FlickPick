import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  Grid2,
  Popover,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const ProfileAvatar = () => {
  const { user, isLoading, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const isPopOverOpen = Boolean(anchorEl);

  const handleOnClosePopOver = () => setAnchorEl(null);

  const handleOnClickAvatar = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => setAnchorEl(e.currentTarget);

  return (
    <>
      <Avatar
        onClick={handleOnClickAvatar}
        sx={{
          width: 38,
          height: 38,
          cursor: "pointer",
        }}
      ></Avatar>
      <Popover
        open={isPopOverOpen}
        anchorEl={anchorEl}
        onClose={handleOnClosePopOver}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPopover-paper": {
            backgroundColor: "#1F1F1F",
          },
          p: "1rem",
        }}
      >
        <Grid2 container gap={1.5}>
          <Grid2
            size={{ xs: 2 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar sx={{ width: "32px", height: "32px" }}></Avatar>
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
              sx={{ color: "#FFF" }}
            >
              {user?.name}
            </Typography>
            <Typography
              fontSize="0.75rem"
              component="span"
              sx={{ color: "#FFF" }}
            >
              {user?.email}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Divider />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Button
              fullWidth
              disabled={isLoading}
              onClick={logout}
              size="small"
              startIcon={
                isLoading ? (
                  <CircularProgress size="1.2rem" sx={{ color: "#FFF" }} />
                ) : null
              }
              sx={{ textTransform: "none", px: "1rem" }}
            >
              Logout
            </Button>
          </Grid2>
        </Grid2>
      </Popover>
    </>
  );
};

export default ProfileAvatar;
