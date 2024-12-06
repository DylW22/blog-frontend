import { protectionLoginFormData, protectionLoginFormErrors } from "../types";

// const passwordsDoMatch = (password1: string, password2: string) => {
//   return password1 === password2;
// };

const isValidUsername = ({
  username,
}: Pick<protectionLoginFormData, "username">) => {
  if (!username) return false;
  if (username.length < 3) return false;
  if (username.length > 12) return false;

  return true;
};

/*const isValidEmail = ({ email }: Pick<ApiRegisterFormData, "email">) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    return false;
  }

  return true;
};*/

const mainLoginDataValid = ({
  username,
  password,
}: protectionLoginFormData) => {
  const errors: protectionLoginFormErrors = {
    username: "",
    password: "",
    credentials: "",
    name: "",
  };
  if (!isValidUsername({ username })) {
    errors.username = "Username is incorrect. Please contact the owner.";
  }

  if (password.length < 5) {
    errors.password = "Password is incorrect. Please contact the owner";
  }

  return errors;
};

export { mainLoginDataValid };
