import React from "react";
import { useAuth } from "../../context/AuthContext";
import { BlogRenderProps } from "../../types";

export const Blog = React.memo<BlogRenderProps>(
  ({ blog, onEdit, onDelete, index, isInitialRender }) => {
    const { title, content, id } = blog;
    const { isAuthenticated } = useAuth();

    const classes =
      index % 2 === 0
        ? `bg-gray-100 ${isInitialRender ? "animate-slide-in-right" : ""} `
        : `bg-gray-300 ${isInitialRender ? "animate-slide-in-left" : ""} `;

    return (
      <div
        className={`${classes} h-[400px] rounded-md shadow-xl border-2 border-gray-700`}
      >
        <div
          className={`${
            index % 2 === 0 ? "bg-gray-700" : "bg-gray-500"
          }  w-full flex justify-between px-10 py-5 rounded-t-md items-center`}
        >
          <h1 className="underline text-md text-white md:text-xl mr-5 w-[200px]">
            <strong>{title}</strong>
          </h1>
          <div className="flex justify-center items-center gap-3 md:gap-10 relative">
            <button
              disabled={!isAuthenticated}
              className={`${
                isAuthenticated
                  ? "bg-blue-300 hover:bg-blue-100"
                  : "bg-gray-300 cursor-not-allowed"
              } p-2 rounded-md w-[60px] md:w-[80px] peer`}
              onClick={() => onEdit(blog)}
            >
              Edit
            </button>{" "}
            <button
              disabled={!isAuthenticated}
              className={`${
                isAuthenticated
                  ? "bg-blue-300 hover:bg-blue-100"
                  : "bg-gray-300 cursor-not-allowed"
              } p-2 rounded-md w-[60px] md:w-[80px] peer`}
              onClick={() => onDelete(blog.id)}
            >
              Delete
            </button>{" "}
            {!isAuthenticated && (
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden peer-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
                You need to be logged in to edit & delete.
              </div>
            )}
            <p className="text-gray-300">id: #{id}</p>
          </div>
        </div>

        <div className="px-10 py-5 ml-2 flex justify-between text-gray-700">
          <div>{content}</div>
        </div>
      </div>
    );
  }
);
//Blog.displayName = "Blog";
