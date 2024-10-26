import { Avatar, AvatarProps, Box, useTheme } from "@mui/material";

const ProfileAvatar = (props: AvatarProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        p: "0.15rem",
        borderRadius: "50%",
        background: `linear-gradient(45deg, ${theme.palette.primary.main}, #FF6347)`,
      }}
    >
      <Avatar sx={{ width: 38, height: 38 }} {...props} />
    </Box>
  );
};

export default ProfileAvatar;
