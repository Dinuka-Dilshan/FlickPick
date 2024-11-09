import {
  Button,
  CircularProgress,
  Grid2,
  Grid2Props,
  LinearProgress,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Logo from "../components/AppBar/Logo";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../hooks/useAuth";

const Wrapper = styled(Grid2)({
  width: "100vw",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#F2F2F2",
});

const Item = ({ children, ...rest }: PropsWithChildren<Grid2Props>) => {
  return (
    <Grid2 size={{ xs: 12 }} {...rest}>
      {children}
    </Grid2>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    login({ username: email, password });
  };

  const handleSignUp = () => navigate(ROUTES.SIGNUP);

  if (user) {
    return <Navigate to={ROUTES.DEFAULT} />;
  }

  return (
    <Wrapper container>
      <Grid2 size={{ xs: 11, md: 4, lg: 3 }}>
        <Grid2
          sx={{ p: "1.5rem", bgcolor: "#fff", borderRadius: "8px" }}
          container
          spacing={1}
        >
          {isLoading && (
            <Item>
              <LinearProgress />
            </Item>
          )}
          <Item>
            <Logo textAlign="center" />
          </Item>
          <Item mb="1rem">
            <Typography
              variant="subtitle2"
              textAlign="center"
              fontWeight="bold"
            >
              Let's enter your details to login
            </Typography>
          </Item>
          <Item>
            <TextField
              fullWidth
              size="small"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Item>
          <Item>
            <TextField
              fullWidth
              size="small"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Item>
          <Item mt="1.25rem">
            <Button
              disabled={isLoading || email.length < 3 || password.length < 9}
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              startIcon={isLoading ? <CircularProgress size="1.2rem" /> : null}
            >
              {isLoading ? "Checking Credentials..." : "Sign In"}
            </Button>
          </Item>
          <Item display="flex" justifyContent="center" alignItems="center">
            <Button
              onClick={handleSignUp}
              color="inherit"
              sx={{ textTransform: "none" }}
              size="small"
            >
              New to FlickPick? Sign up now.
            </Button>
          </Item>
        </Grid2>
      </Grid2>
    </Wrapper>
  );
};

export default Login;
