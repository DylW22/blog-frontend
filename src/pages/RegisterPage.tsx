import React, { useState } from "react";
import { ApiRegisterFormData, RegisterFormErrors } from "../types";
import { ApiRegisterForm } from "../components/register/ApiRegisterForm";
import { registrationDataValid } from "../utils/registerValidation";

const initialFormData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const [data, setData] = useState<ApiRegisterFormData>(initialFormData);
  const [formErrors, setFormErrors] =
    useState<RegisterFormErrors>(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = registrationDataValid(data);
    if (Object.values(errors).some((error) => error)) {
      setFormErrors(errors);
      return;
    }
    //if (!registrationDataValid) return;
    //console.log("Will submit with data: ", data);
    setData(initialFormData);
    setFormErrors(initialFormData);
  };

  const handleFormData = (key: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-200">
      <ApiRegisterForm
        formErrors={formErrors}
        formData={data}
        handleSubmit={handleSubmit}
        handleFormData={handleFormData}
      />
    </div>
  );
};

export default RegisterPage;
