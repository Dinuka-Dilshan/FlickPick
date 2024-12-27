import { Button, ButtonProps } from "@mui/material";
import Icon from "../../../Icons/google-icon-logo-svgrepo-com.svg";

const GoogleSignInButton = (props: ButtonProps) => {
  const handleClick = () => {
    const url = `${
      import.meta.env.VITE_COGNITO_DOMAIN
    }/oauth2/authorize?client_id=${
      import.meta.env.VITE_COGNITO_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_AUTH_REDIRECT_URL
    }&identity_provider=Google&response_type=code`;

    window.location.href = url;
  };

  return (
    <Button
      onClick={handleClick}
      {...props}
      sx={{ bgcolor: "#FFF", color: "#131314", textTransform: "none" }}
      fullWidth
      startIcon={<img src={Icon} width={24} height={24} />}
    >
      Continue with Google
    </Button>
  );
};

export default GoogleSignInButton;
