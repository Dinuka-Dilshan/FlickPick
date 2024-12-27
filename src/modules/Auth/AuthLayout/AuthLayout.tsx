import {
  Button,
  CircularProgress,
  Grid2,
  styled,
  Typography,
} from "@mui/material";
import { PropsWithChildren } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

import Logo from "../../../components/AppBar/Logo";
import useAuth from "../../../hooks/useAuth";
import GoogleSignInButton from "../Google/GoogleSignInButton";
import AuthLayoutItem from "./AuthLayoutItem";
import AuthMessages from "./AuthMessages";

const Wrapper = styled(Grid2)({
  width: "100vw",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#1F1F1F",
});

type Props = {
  subtitle: string;
  submitButtonText: { loading: string; normal: string };
  showNewToFlickPick?: boolean;
  onSubmit: () => void;
  disableSubmit: boolean;
  showGoogleSignIn?: boolean;
} & PropsWithChildren;

const AuthLayout = ({
  subtitle,
  children,
  submitButtonText,
  showNewToFlickPick,
  disableSubmit,
  onSubmit,
  showGoogleSignIn,
}: Props) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  if (user) {
    return <Navigate to={location.state?.from || ROUTES.DEFAULT} />;
  }

  const handleSignUp = () => navigate(ROUTES.SIGNUP);

  return (
    <Wrapper container>
      <Grid2 size={{ xs: 11, sm: 6, md: 4, lg: 3 }}>
        <form>
          <Grid2
            sx={{ p: "1.5rem", bgcolor: "#171717", borderRadius: "12px" }}
            container
            spacing={1}
          >
            <AuthLayoutItem>
              <AuthMessages />
            </AuthLayoutItem>
            <AuthLayoutItem>
              <Logo textAlign="center" sx={{ color: "#1F1F1F" }} />
            </AuthLayoutItem>
            <AuthLayoutItem mb="1rem">
              <Typography
                variant="subtitle2"
                textAlign="center"
                fontWeight="bold"
                sx={{ color: "#fff" }}
              >
                {subtitle}
              </Typography>
            </AuthLayoutItem>
            {children}
            <AuthLayoutItem mt="1.25rem">
              <Button
                disabled={disableSubmit}
                onClick={onSubmit}
                fullWidth
                variant="contained"
                startIcon={
                  isLoading ? <CircularProgress size="1.2rem" /> : null
                }
                sx={{
                  background: "linear-gradient(90deg, #9333ea, #f472b6)",
                  ":disabled": {
                    background: "#1F1F1F",
                  },
                }}
              >
                {isLoading ? submitButtonText.loading : submitButtonText.normal}
              </Button>
            </AuthLayoutItem>
            {showGoogleSignIn && (
              <AuthLayoutItem>
                <GoogleSignInButton />
              </AuthLayoutItem>
            )}
            {showNewToFlickPick && (
              <AuthLayoutItem
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  onClick={handleSignUp}
                  color="inherit"
                  sx={{ textTransform: "none", border: "none" }}
                  size="small"
                >
                  New to FlickPick? Sign up now.
                </Button>
              </AuthLayoutItem>
            )}
          </Grid2>
        </form>
      </Grid2>
    </Wrapper>
  );
};

export default AuthLayout;
