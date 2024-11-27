import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
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
          width: 28,
          height: 28,
          cursor: "pointer",
          backgroundColor: "#0072F5",
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
            <Typography fontSize="0.75rem" fontWeight="bold">
              {user?.name}
            </Typography>
            <Typography fontSize="0.75rem" component="span">
              {user?.email}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Divider />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Button
              disabled={isLoading}
              onClick={logout}
              size="small"
              startIcon={
                isLoading ? (
                  <CircularProgress size="1.2rem" color="inherit" />
                ) : (
                  <LogoutOutlinedIcon />
                )
              }
              sx={{ textTransform: "none", px: "1rem" }}
              color="inherit"
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
