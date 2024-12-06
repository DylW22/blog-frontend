import React, { useState } from "react";
import { ApiLoginForm } from "../components/login/ApiLoginForm";

interface LoginFormData {
  username: string;
  password: string;
}

const initialLoginFormdata = {
  username: "",
  password: "",
};

const initialLoginFormErrors = {
  username: "",
  password: "",
  credentials: "",
};

import { useAuth } from "../context/AuthContext";
import { LoginFormErrors } from "../types";
import { loginDataValid } from "../utils/loginValidation";
const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>(initialLoginFormdata);
  const [formErrors, setFormErrors] = useState<LoginFormErrors>(
    initialLoginFormErrors
  );
  const { testHandleLogin, authError, loading } = useAuth();

  const login = async (loginData: LoginFormData) => {
    const { username, password } = loginData;
    try {
      testHandleLogin(username, password);
    } catch (error) {
      console.error("Login error:", error); // Log the error or handle it as needed
      throw new Error(
        `Error logging in: ${error instanceof Error ? error.message : error}`
      );
    }
  };

  const handleFormData = (key: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = loginDataValid(formData);
    if (Object.values(errors).some((error) => error)) {
      setFormErrors(errors);
      return;
    }
    //console.log("Form submitted with data: ", formData);

    try {
      await login(formData);
      setFormErrors(errors);
    } catch (error) {
      throw new Error(`An error occurred while logging in: ${error}`);
    }
  };

  return (
    <div className="flex w-full justify-center items-center h-screen bg-gray-200">
      <ApiLoginForm
        formData={formData}
        formErrors={formErrors}
        handleFormData={handleFormData}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      {authError && <div>{JSON.stringify(authError)}</div>}
    </div>
  );
};

export default LoginPage;
