import { TextField } from "@mui/material";
import PasswordInput from "../../../components/PasswordInput/PasswordInput";
import useAuth from "../../../hooks/useAuth";
import useFormState from "../../../hooks/useFormState";
import { skipValidation } from "../../../utils/validations";
import AuthLayout from "../AuthLayout/AuthLayout";
import AuthLayoutItem from "../AuthLayout/AuthLayoutItem";

const Login = () => {
  const { login, isLoading } = useAuth();

  const { handleSubmit, registerInput, isFormValid } = useFormState({
    fields: {
      username: { value: "", vaidator: () => skipValidation() },
      password: { value: "", vaidator: () => skipValidation() },
    },
    onError: () => {},
    onSubmit: (values) => {
      login({
        userName: values.username.value,
        passWord: values.password.value,
      });
    },
  });

  return (
    <AuthLayout
      disableSubmit={!isFormValid || isLoading}
      onSubmit={handleSubmit}
      showNewToFlickPick
      submitButtonText={{
        loading: "Checking Credentials...",
        normal: "Sign In",
      }}
      subtitle={"Let's enter your details to login"}
    >
      <AuthLayoutItem>
        <TextField
          variant="outlined"
          {...registerInput({ key: "username", type: "text", label: "Email" })}
        />
      </AuthLayoutItem>
      <AuthLayoutItem>
        <PasswordInput
          {...registerInput({ key: "password", type: "password" })}
        />
      </AuthLayoutItem>
    </AuthLayout>
  );
};

export default Login;
