import { useAuth } from "../context/AuthContext";
import React, { useState } from "react";
import { Link } from "react-router";

import FindBlog from "../components/Blogs/FindBlog";
import UserInfo from "./UserInfo";

import CreateBlogForm from "../components/form/CreateBlogForm";

export const Sidebar: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [openCreateBlogForm, setOpenCreateBlogForm] = useState<boolean>(false);

  const handleCreate = () => {
    setOpenCreateBlogForm(true);
  };

  const closeCreateBlogModal = () => {
    setOpenCreateBlogForm(false);
  };

  return (
    <div
      className="w-[200px] h-[500px] bg-gradient-to-b from-gray-400 via-gray-200 to-gray-100
  fixed top-[80px] left-[-180px] hover:left-0 transition-all duration-300 z-50 rounded-r-lg p-2 shadow-xl border-2 border-gray-700"
    >
      <nav className="w-full">
        {isAuthenticated ? (
          <UserInfo />
        ) : (
          <>
            <div className="bg-gray-300 my-1 w-full h-[60px] hover:bg-gray-500 text-center rounded-md shadow-md border-2 border-gray-500">
              <Link
                to="/login"
                className="h-full flex justify-center items-center"
              >
                Login
              </Link>
            </div>
            <div className="bg-gray-300 my-1 w-full h-[60px] hover:bg-gray-500 text-center rounded-md shadow-md border-2 border-gray-500">
              <Link
                to="/register"
                className="h-full flex justify-center items-center"
              >
                Register
              </Link>
            </div>
          </>
        )}
        <FindBlog />
        <div
          className={`my-1 w-full h-[60px] text-center rounded-md shadow-md border-2 border-gray-500 ${
            isAuthenticated
              ? "bg-gray-300 hover:bg-gray-500"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isAuthenticated ? (
            <button
              className="h-full w-full flex justify-center items-center"
              onClick={handleCreate}
            >
              Create blog
            </button>
          ) : (
            <span className="h-full flex items-center justify-center">
              Create blog
            </span>
          )}
        </div>
      </nav>
      {openCreateBlogForm && (
        <CreateBlogForm onClose={closeCreateBlogModal} user={user} />
      )}
    </div>
  );
};
