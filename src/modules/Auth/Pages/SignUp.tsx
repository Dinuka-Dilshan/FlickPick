import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PasswordInput from "../../../components/PasswordInput/PasswordInput";
import useAuth from "../../../hooks/useAuth";
import useFormState from "../../../hooks/useFormState";
import {
  validateBirthday,
  validateConfirmPassword,
  validateEmail,
  validateGender,
  validateName,
  validatePassword,
} from "../../../utils/validations";
import AuthLayout from "../AuthLayout/AuthLayout";
import AuthLayoutItem from "../AuthLayout/AuthLayoutItem";

const SignUp = () => {
  const { signUp } = useAuth();
  const { registerInput, handleSubmit, isFormValid, fields } = useFormState({
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
          validateConfirmPassword(state?.password?.value, confirmPassword),
      },
      email: { value: "", vaidator: (email) => validateEmail(email) },
    },
    onSubmit: (values) => {
      signUp({
        birthdate: values.birthday.value,
        email: values.email.value,
        fullname: values.name.value,
        gender: values.gender.value,
        password: values.password.value,
      });
    },
    onError: (values) => {
      console.log(values);
    },
  });

  return (
    <AuthLayout
      disableSubmit={!isFormValid}
      onSubmit={handleSubmit}
      submitButtonText={{ loading: "Creating Profile...", normal: "Sign Up" }}
      subtitle=" Let's enter your details to create an account"
    >
      <AuthLayoutItem>
        <TextField {...registerInput("name", "text")} />
      </AuthLayoutItem>
      <AuthLayoutItem>
        <TextField
          {...registerInput("birthday", "date")}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </AuthLayoutItem>
      <AuthLayoutItem>
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
      </AuthLayoutItem>
      <AuthLayoutItem>
        <TextField {...registerInput("email", "email")} />
      </AuthLayoutItem>
      <AuthLayoutItem>
        <PasswordInput {...registerInput("password", "password")} />
      </AuthLayoutItem>
      <AuthLayoutItem>
        <PasswordInput {...registerInput("confirmPassword", "password")} />
      </AuthLayoutItem>
    </AuthLayout>
  );
};

export default SignUp;
