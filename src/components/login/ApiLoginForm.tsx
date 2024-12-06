import React from "react";
import { ApiLoginFormData, LoginFormErrors } from "../../types";
import FormError from "../form/FormError";
import { Link } from "react-router";
interface ApiLoginFormProps {
  formData: ApiLoginFormData;
  formErrors: LoginFormErrors;
  loading: boolean;
  handleFormData: (key: keyof ApiLoginFormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const ApiLoginForm: React.FC<ApiLoginFormProps> = ({
  formData,
  formErrors,
  loading,
  handleFormData,
  handleSubmit,
}) => {
  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg"
    >
      {" "}
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Login
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
          placeholder="Enter your username."
          value={formData.username}
          onChange={(e) => handleFormData("username", e.target.value)}
        />
        <div className="h-6">
          {formErrors?.username && <FormError message={formErrors.username} />}
        </div>
      </div>
      <div className="">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            formErrors.username
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
          type="password"
          name="password"
          placeholder="Enter your password."
          value={formData.password}
          onChange={(e) => handleFormData("password", e.target.value)}
        />
        <div className="h-6">
          {formErrors?.password && <FormError message={formErrors.password} />}
        </div>
      </div>
      <button
        disabled={loading}
        type="submit"
        className={`w-full mt-5 ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } = text-white py-2 rounded-lg font-semibold text-lg transition`}
      >
        Submit
      </button>
      <div>
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-blue-700 underline">
          Register here
        </Link>
      </div>
    </form>
  );
};
