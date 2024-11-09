import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid2,
  Grid2Props,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { PropsWithChildren } from "react";
import Logo from "../components/AppBar/Logo";
import { useAuth } from "../hooks/useAuth";
import useFormState from "../hooks/useFormState";
import {
  validateBirthday,
  validateConfirmPassword,
  validateEmail,
  validateGender,
  validateName,
  validatePassword,
} from "../utils/validations";

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
  const { isLoading, signUp } = useAuth();
  const { registerInput, handleSubmit, isFormValid } = useFormState({
    fields: {
      name: { value: "", vaidator: (name) => validateName(name) },
      password: {
        value: "",
        vaidator: (password) => validatePassword(password),
      },
      birthday: {
        value: "",
        vaidator: (birthday) => validateBirthday(birthday),
      },
      gender: { value: "", vaidator: (gender) => validateGender(gender) },
      confirmPassword: {
        value: "",
        vaidator: (confirmPassword, state) =>
          validateConfirmPassword(
            state?.password?.value || "",
            confirmPassword
          ),
      },
      email: { value: "", vaidator: (email) => validateEmail(email) },
    },
    onSubmit: (values) => {
      console.log();
    },
    onError: (values) => {
      console.log(values);
    },
  });

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
              <FormControl
                size="small"
                fullWidth
                error={registerInput("gender").error}
              >
                <InputLabel id="select-label">Gender</InputLabel>
                <Select
                  id="select-label"
                  {...registerInput("gender", "", ["helperText"])}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
                {registerInput("gender").error && (
                  <FormHelperText>
                    {registerInput("gender").helperText}
                  </FormHelperText>
                )}
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
                disabled={!isFormValid}
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                startIcon={
                  isLoading ? <CircularProgress size="1.2rem" /> : null
                }
              >
                {isLoading ? "Creating Profile..." : " Sign Up"}
              </Button>
            </Item>
          </Grid2>
        </form>
      </Grid2>
    </Wrapper>
  );
};

export default SignUp;
