import {
  Button,
  CircularProgress,
  Grid2,
  styled,
  Typography,
} from "@mui/material";
import { PropsWithChildren } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../AppBar/Logo";
import AuthLayoutItem from "./AuthLayoutItem";
import AuthMessages from "./AuthMessages";

const Wrapper = styled(Grid2)({
  width: "100vw",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#F2F2F2",
});

type Props = {
  subtitle: string;
  submitButtonText: { loading: string; normal: string };
  showNewToFlickPick?: boolean;
  onSubmit: () => void;
  disableSubmit: boolean;
} & PropsWithChildren;

const AuthLayout = ({
  subtitle,
  children,
  submitButtonText,
  showNewToFlickPick,
  disableSubmit,
  onSubmit,
}: Props) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  if (user) {
    return <Navigate to={ROUTES.DEFAULT} />;
  }

  const handleSignUp = () => navigate(ROUTES.SIGNUP);

  return (
    <Wrapper container>
      <Grid2 size={{ xs: 11, md: 4, lg: 3 }}>
        <form>
          <Grid2
            sx={{ p: "1.5rem", bgcolor: "#fff", borderRadius: "8px" }}
            container
            spacing={1}
          >
            <AuthLayoutItem>
              <AuthMessages />
            </AuthLayoutItem>
            <AuthLayoutItem>
              <Logo textAlign="center" />
            </AuthLayoutItem>
            <AuthLayoutItem mb="1rem">
              <Typography
                variant="subtitle2"
                textAlign="center"
                fontWeight="bold"
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
              >
                {isLoading ? submitButtonText.loading : submitButtonText.normal}
              </Button>
            </AuthLayoutItem>
            {showNewToFlickPick && (
              <AuthLayoutItem
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  onClick={handleSignUp}
                  color="inherit"
                  sx={{ textTransform: "none" }}
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
