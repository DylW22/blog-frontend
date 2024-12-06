import React from "react";
import { ApiRegisterFormData, RegisterFormErrors } from "../../types";
import FormError from "../form/FormError";
import { Link } from "react-router";

interface ApiRegisterFormProps {
  formData: ApiRegisterFormData;
  formErrors: RegisterFormErrors;
  handleFormData: (key: keyof ApiRegisterFormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const ApiRegisterForm: React.FC<ApiRegisterFormProps> = ({
  formData,
  formErrors,
  handleFormData,
  handleSubmit,
}) => {
  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Register
      </h2>

      <div className="">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            formErrors.username
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={(e) => handleFormData("username", e.target.value)}
        />
        <div className="h-6">
          {formErrors.username && <FormError message={formErrors.username} />}
        </div>
      </div>

      <div className="">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            formErrors.email
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
          type="text"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => handleFormData("email", e.target.value)}
        />
        <div className="h-6">
          {formErrors.email && <FormError message={formErrors.email} />}
        </div>
      </div>
      <div className="">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            formErrors.password
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => handleFormData("password", e.target.value)}
        />
        <div className="h-6">
          {formErrors.password && <FormError message={formErrors.password} />}
        </div>
      </div>

      <div className="">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            formErrors.confirmPassword
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
          type="password"
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={(e) => handleFormData("confirmPassword", e.target.value)}
        />
        <div className="h-6">
          {formErrors.confirmPassword && (
            <FormError message={formErrors.confirmPassword} />
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-5 bg-blue-500 text-white py-2 rounded-lg font-semibold text-lg hover:bg-blue-600 transition"
      >
        Submit
      </button>
      <div>
        Already have an account?{" "}
        <Link to="/login" className="text-blue-700 underline">
          Login here
        </Link>
      </div>
    </form>
  );
};
