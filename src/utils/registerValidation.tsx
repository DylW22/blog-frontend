import { ApiRegisterFormData, RegisterFormErrors } from "../types";

const passwordsDoMatch = (password1: string, password2: string) => {
  return password1 === password2;
};

const isValidUsername = ({
  username,
}: Pick<ApiRegisterFormData, "username">) => {
  if (!username) return false;
  if (username.length < 3) return false;
  if (username.length > 12) return false;

  return true;
};

const isValidEmail = ({ email }: Pick<ApiRegisterFormData, "email">) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    return false;
  }

  return true;
};

const registrationDataValid = ({
  username,
  email,
  password,
  confirmPassword,
}: ApiRegisterFormData) => {
  const errors: RegisterFormErrors = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  if (!isValidUsername({ username })) {
    //throw new Error("Username is invalid.");
    errors.username = "Username is invalid.";
  }
  if (!isValidEmail({ email })) {
    errors.email = "Email address is invalid.";
    //throw new Error("Email address is invalid.");
  }
  if (password.length < 5) {
    errors.password = "Password is not strong enough.";
  }

  if (!passwordsDoMatch(password, confirmPassword)) {
    errors.confirmPassword = "Passwords do not match.";
    //throw new Error("Passwords do not match.");
  }

  return errors;
};

export { passwordsDoMatch, registrationDataValid };
