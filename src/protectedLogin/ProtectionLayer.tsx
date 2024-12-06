import React, { useState } from "react";
import { MainLoginForm } from "./MainLoginForm";

import { protectionLoginFormData, protectionLoginFormErrors } from "../types";
import { mainLoginDataValid } from "../utils/mainLoginValidation";
import { baseURL } from "../utils/config";

interface ProtectionLayerInterface {
  children: React.ReactNode;
}

const initialLoginFormdata = {
  username: "",
  password: "",
  name: "",
};

const initialLoginFormErrors = {
  username: "",
  password: "",
  credentials: "",
  name: "",
};

export const ProtectionLayer: React.FC<ProtectionLayerInterface> = ({
  children,
}) => {
  const [formData, setFormData] =
    useState<protectionLoginFormData>(initialLoginFormdata);
  const [formErrors, setFormErrors] = useState<protectionLoginFormErrors>(
    initialLoginFormErrors
  );
  const [isAuth, setIsAuth] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFormData = (
    key: keyof protectionLoginFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const apiLogin = async (
    formData: protectionLoginFormData
  ): Promise<string> => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetch(`${baseURL}/api-login`, {
        headers,
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Login failed. Invalid credentials.");
      }
      const message = await response.json();
      const { token } = message;
      return token;
    } catch (error) {
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = "Unknown error";
      }
      throw new Error(`${message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    const errors = mainLoginDataValid(formData);
    if (Object.values(errors).some((error) => error)) {
      setFormErrors(errors);
      return;
    }
    try {
      const token = await apiLogin(formData);
      if (!token) {
        setFormErrors((prev) => ({
          ...prev,
          credentials: "Login failed. Check your credentials.",
        }));
        return;
      }
      setIsAuth(true);
      alert("Logged into API successfully.");
      setFormErrors(initialLoginFormErrors);
    } catch (error) {
      setFormErrors((prev) => ({
        ...prev,
        credentials: `${error}`,
      }));
      alert("Invalid credentials");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuth)
    return (
      <div className="flex items-center justify-center h-screen">
        <MainLoginForm
          handleFormData={handleFormData}
          formData={formData}
          formErrors={formErrors}
          handleSubmit={handleSubmit}
          isProcessing={isProcessing}
        />
      </div>
    );

  return <div>{children}</div>;
};
