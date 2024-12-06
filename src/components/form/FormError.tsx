import React from "react";
import { FormErrorProps } from "../../types";

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  return <p className="text-sm text-red-500">{message}</p>;
};

export default FormError;
