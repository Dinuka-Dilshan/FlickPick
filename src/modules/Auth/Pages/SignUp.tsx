import { TextField } from "@mui/material";
import PasswordInput from "../../../components/PasswordInput/PasswordInput";
import useAuth from "../../../hooks/useAuth";
import useFormState from "../../../hooks/useFormState";
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from "../../../utils/validations";
import AuthLayout from "../AuthLayout/AuthLayout";
import AuthLayoutItem from "../AuthLayout/AuthLayoutItem";

const SignUp = () => {
  const { signUp } = useAuth();
  const { registerInput, handleSubmit, isFormValid } = useFormState({
    fields: {
      name: { value: "", vaidator: (name) => validateName(name) },
      password: {
        value: "",
        vaidator: (password) => validatePassword(password),
      },
      confirmPassword: {
        value: "",
        vaidator: (confirmPassword, state) =>
          validateConfirmPassword(state?.password?.value, confirmPassword),
      },
      email: { value: "", vaidator: (email) => validateEmail(email) },
    },
    onSubmit: (values) => {
      signUp({
        email: values.email.value,
        fullname: values.name.value,
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
      showGoogleSignIn
    >
      <AuthLayoutItem>
        <TextField {...registerInput({ key: "name", type: "text" })} />
      </AuthLayoutItem>

      <AuthLayoutItem>
        <TextField {...registerInput({ key: "email", type: "email" })} />
      </AuthLayoutItem>
      <AuthLayoutItem>
        <PasswordInput
          {...registerInput({ key: "password", type: "password" })}
        />
      </AuthLayoutItem>
      <AuthLayoutItem>
        <PasswordInput
          {...registerInput({ key: "confirmPassword", type: "password" })}
        />
      </AuthLayoutItem>
    </AuthLayout>
  );
};

export default SignUp;
