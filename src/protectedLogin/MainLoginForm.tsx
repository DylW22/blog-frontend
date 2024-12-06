import React from "react";
import { protectedLoginFormProps } from "../types";
import FormError from "../components/form/FormError";

export const MainLoginForm: React.FC<protectedLoginFormProps> = ({
  formData,
  formErrors,
  handleFormData,
  handleSubmit,
  isProcessing,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Security login
      </h2>
      <div className="">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your name
        </label>
        <input
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2`}
          type="text"
          name="name"
          placeholder="Please enter your name."
          value={formData.name}
          onChange={(e) => handleFormData("name", e.target.value)}
        />
        <div className="h-6">
          {formErrors?.username && <FormError message={formErrors.username} />}
        </div>
      </div>

      <div className="">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2`}
          type="text"
          name="username"
          placeholder="Enter the username provided."
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
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2`}
          type="password"
          name="password"
          placeholder="Enter the password given to you."
          value={formData.password}
          onChange={(e) => handleFormData("password", e.target.value)}
        />
        {formErrors.credentials && <FormError message="Hello" />}
        <div className="h-6">
          {formErrors?.password && <FormError message={formErrors.password} />}
        </div>
      </div>
      <button
        type="submit"
        disabled={isProcessing}
        className={`w-full mt-5 ${
          isProcessing ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
        } text-white py-2 rounded-lg font-semibold text-lg transition`}
      >
        Submit
      </button>
    </form>
  );
};
