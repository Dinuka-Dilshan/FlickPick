import {
  Button,
  CircularProgress,
  FormControl,
  Grid2,
  Grid2Props,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { Navigate } from "react-router-dom";
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

const SignUp = () => {
  const { login, user, isLoading } = useAuth();

  const [inputs, setInputs] = useState({
    name: "",
    password: "",
    birthday: "",
    gender: "",
    confirmPassword: "",
    email: "",
  });

  const handleSubmit = () => {
    login({ username: inputs.email, password: inputs.password });
  };

  const registerInput = (
    key: keyof typeof inputs,
    type?: TextFieldProps["type"]
  ) => ({
    name: key,
    fullWidth: true,
    onChange: (
      e:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent
    ) => setInputs((inputs) => ({ ...inputs, [key]: e.target.value })),
    label: key,
    value: inputs[key],
    size: "small" as TextFieldProps["size"],
    type,
  });

  if (user) {
    return <Navigate to={ROUTES.DEFAULT} />;
  }

  return (
    <Wrapper container>
      <Grid2 size={{ xs: 11, md: 4, lg: 3 }}>
        <form>
          <Grid2
            sx={{ p: "1.5rem", bgcolor: "#fff", borderRadius: "8px" }}
            container
            spacing={1.25}
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
                Let's enter your details to create an account
              </Typography>
            </Item>
            <Item>
              <TextField {...registerInput("name", "text")} />
            </Item>
            <Item>
              <TextField
                {...registerInput("birthday", "date")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Item>
            <Item>
              <FormControl size="small" fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select {...registerInput("gender")}>
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </FormControl>
            </Item>
            <Item>
              <TextField {...registerInput("email", "email")} />
            </Item>
            <Item>
              <TextField {...registerInput("password", "password")} />
            </Item>
            <Item>
              <TextField {...registerInput("confirmPassword", "password")} />
            </Item>
            <Item mt="1.25rem">
              <Button
                disabled={
                  isLoading ||
                  inputs.email.length < 3 ||
                  inputs.password.length < 9
                }
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                startIcon={
                  isLoading ? <CircularProgress size="1.2rem" /> : null
                }
              >
                {isLoading ? "Checking Credentials..." : "Sign In"}
              </Button>
            </Item>
          </Grid2>
        </form>
      </Grid2>
    </Wrapper>
  );
};

export default SignUp;
