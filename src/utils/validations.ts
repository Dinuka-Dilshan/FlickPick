export const validateEmail = (email: string) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return { isValid, error: isValid ? null : "Email is Invalid" };
};

export const validatePassword = (password: string) => {
  const passwordPolicy = {
    minLength: 8,
    requireDigits: true,
    requireLowercase: true,
    requireSymbols: true,
    requireUppercase: true,
  };

  if (password.length < passwordPolicy.minLength) {
    return {
      isValid: false,
      error: `Password must be at least ${passwordPolicy.minLength} characters long.`,
    };
  }

  if (passwordPolicy.requireDigits && !/[0-9]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one digit.",
    };
  }

  if (passwordPolicy.requireLowercase && !/[a-z]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one lowercase letter.",
    };
  }

  if (
    passwordPolicy.requireSymbols &&
    !/[!@#$%^&*(),.?":{}|<>]/.test(password)
  ) {
    return {
      isValid: false,
      error: "Password must contain at least one symbol.",
    };
  }

  if (passwordPolicy.requireUppercase && !/[A-Z]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one uppercase letter.",
    };
  }

  return { isValid: true, error: "" };
};

export const validateName = (name: string) => {
  const isValid = name.length > 2;
  return { isValid, error: isValid ? null : "Name is Invalid" };
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  const isValid = password === confirmPassword;
  return { isValid, error: isValid ? null : "Passwords should be matched" };
};

export const validateBirthday = (birthday: string) => {
  const isValid = !!birthday;
  return { isValid, error: isValid ? null : "Birthday is Invalid" };
};
export const validateGender = (gender: string) => {
  const isValid = gender === "Male" || gender === "Female";
  return { isValid, error: isValid ? null : "Gender is Invalid" };
};
