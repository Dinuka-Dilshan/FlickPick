import { TextField } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PasswordInput from "../../../components/PasswordInput/PasswordInput";
import useAuth from "../../../hooks/useAuth";
import useFormState from "../../../hooks/useFormState";
import { skipValidation } from "../../../utils/validations";
import AuthLayout from "../AuthLayout/AuthLayout";
import AuthLayoutItem from "../AuthLayout/AuthLayoutItem";

const Login = () => {
  const { login, isLoading } = useAuth();
  const [params] = useSearchParams();

  const googleAuthCode = params.get("code");

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
        googleAuthCode: "",
      });
    },
  });

  useEffect(() => {
    if (isLoading) return;

    if (googleAuthCode) {
      login({ googleAuthCode, passWord: "", userName: "" });
    }
  }, [googleAuthCode, isLoading, login]);

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
      showGoogleSignIn
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
