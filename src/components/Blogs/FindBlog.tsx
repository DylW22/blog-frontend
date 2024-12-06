import React, { useState, useEffect } from "react";
import { useBlogs } from "../../context/BlogsContext";
const FindBlog = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const { updateQuery } = useBlogs(); //searchBlogs causes re-render
  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchQuery(input);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedQuery !== searchQuery) {
        setDebouncedQuery(searchQuery);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchQuery, debouncedQuery]);

  useEffect(() => {
    updateQuery(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="bg-gray-300 w-full h-[60px] hover:bg-gray-500  rounded-md shadow-md border-2 border-gray-500"
        onClick={toggleIsOpen}
      >
        Find blogs
      </button>
      {isOpen && (
        <input
          className="px-2 py-2 my-2 w-[calc(100%-0px)] rounded-md"
          type="text"
          placeholder="Search.."
          onChange={handleChange}
          value={searchQuery}
        />
      )}
    </div>
  );
};

export default FindBlog;
