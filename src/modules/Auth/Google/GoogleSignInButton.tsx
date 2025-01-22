import { Button, ButtonProps, CircularProgress } from "@mui/material";
import Icon from "../../../Icons/google-icon-logo-svgrepo-com.svg";
import useAuth from "../../../hooks/useAuth";

const GoogleSignInButton = (props: ButtonProps) => {
  const { googleLogin, isGoogleLoginLoading } = useAuth();

  return (
    <Button
      disabled={isGoogleLoginLoading}
      onClick={googleLogin}
      {...props}
      sx={{
        bgcolor: "#FFF",
        color: "#131314",
        textTransform: "none",
        ":disabled": {
          color: "#131314",
        },
      }}
      fullWidth
      startIcon={
        isGoogleLoginLoading ? (
          <CircularProgress size="1.2rem" />
        ) : (
          <img src={Icon} width={24} height={24} />
        )
      }
    >
      {isGoogleLoginLoading ? "Loading..." : "Continue with Google"}
    </Button>
  );
};

export default GoogleSignInButton;
