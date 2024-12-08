import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  Avatar,
  Button,
  Divider,
  Grid2,
  Popover,
  Typography,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";

type Props = {
  anchorEl: Element | null;
  open: boolean;
  onClose: () => void;
};

const UserDetailsPopOver = ({ anchorEl, open, onClose }: Props) => {
  const { user, logout, isLoading } = useAuth();
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
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
          <Avatar sx={{ width: "32px", height: "32px" }} />
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
            sx={{ color: "#1F1F1F" }}
          >
            {user?.name}
          </Typography>
          <Typography
            fontSize="0.75rem"
            component="span"
            sx={{ color: "#1F1F1F" }}
          >
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
            startIcon={<LogoutOutlinedIcon />}
            sx={{ textTransform: "none", px: "1rem" }}
            color="inherit"
          >
            Logout
          </Button>
        </Grid2>
      </Grid2>
    </Popover>
  );
};

export default UserDetailsPopOver;
