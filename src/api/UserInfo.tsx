import React from "react";
import { useAuth } from "../context/AuthContext";
const UserInfo: React.FC = () => {
  const { testHandleLogout, user } = useAuth();
  const logout = async () => {
    //handleLogout();
    if (user) {
      testHandleLogout(user);
    } else {
      throw new Error("User is not logged.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className="text-white font-bold">You are logged in.</div>
      <button
        onClick={logout}
        className="bg-gray-300 my-1 w-full h-[60px] hover:bg-gray-500 text-center rounded-md shadow-md border-2 border-gray-500"
      >
        Logout
      </button>
    </div>
  );
};

export default UserInfo;
