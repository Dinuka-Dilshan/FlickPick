import { TextField } from "@mui/material";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import AuthLayoutItem from "../components/AuthLayout/AuthLayoutItem";
import { useAuth } from "../hooks/useAuth";
import useFormState from "../hooks/useFormState";
import { skipValidation } from "../utils/validations";
import PasswordInput from "../components/PasswordInput/PasswordInput";

const Login = () => {
  const { login } = useAuth();

  const { handleSubmit, registerInput, isFormValid } = useFormState({
    fields: {
      username: { value: "", vaidator: () => skipValidation() },
      password: { value: "", vaidator: () => skipValidation() },
    },
    onError: () => {},
    onSubmit: (values) => {
      login({
        username: values.username.value,
        password: values.password.value,
      });
    },
  });

  return (
    <AuthLayout
      disableSubmit={!isFormValid}
      onSubmit={handleSubmit}
      showNewToFlickPick
      submitButtonText={{
        loading: "Checking Credentials...",
        normal: "Sign In",
      }}
      subtitle={"Let's enter your details to login"}
    >
      <AuthLayoutItem>
        <TextField {...registerInput("username", "text")} />
      </AuthLayoutItem>
      <AuthLayoutItem>
        <PasswordInput {...registerInput("password", "password")} />
      </AuthLayoutItem>
    </AuthLayout>
  );
};

export default Login;
