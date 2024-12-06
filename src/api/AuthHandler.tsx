import React from "react";
import { Link } from "react-router";
const AuthHandler: React.FC = () => {
  return (
    <div className="flex my-2 justify-between items-center gap-3">
      <Link
        to="/login"
        className="bg-blue-300 flex-1 px-5 py-2 text-center text-white font-bold hover:bg-blue-500"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="bg-blue-300 flex-1 px-5 py-2 text-center text-white font-bold hover:bg-blue-500"
      >
        Register
      </Link>
    </div>
  );
};

export default AuthHandler;
