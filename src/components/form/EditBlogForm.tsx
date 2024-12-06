import React, { FormEvent, useEffect, useRef, useState } from "react";

import { BlogInterface } from "../../types";

interface EditBlogFormProps {
  blog: BlogInterface;
  loading: boolean;
  onSave: (updatedBlog: BlogInterface) => void;
  onCancel: () => void;
}

const EditBlogForm: React.FC<EditBlogFormProps> = ({
  blog,
  loading,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const formRef = useRef<HTMLDivElement | null>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ ...blog, title, content });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white rounded-lg p-6 shadow-lg w-[800px] relative"
        ref={formRef}
      >
        <form onSubmit={handleSubmit} className="text-center">
          {" "}
          <p className="text-xl my-2">
            Currently editing blog #:{" "}
            <span className="font-bold underline">{blog.id}</span>
          </p>
          <button
            onClick={onCancel}
            className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          >
            ✖
          </button>
          <div className="flex flex-col w-full">
            <label className="px-2 text-start text-lg font-bold underline">
              Title
            </label>
            <input
              className="border border-gray-300 rounded-md w-full p-2 mb-4 text-2xl"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="px-2 text-start text-lg font-bold underline">
              Content
            </label>
            <textarea
              className="border border-gray-300 rounded-md w-full min-h-[300px] p-2 mb-4 text-2xl"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center my-2 gap-3 w-full">
            <button
              disabled={loading}
              type="submit"
              className={`${
                loading ? "bg-gray-200" : "bg-blue-500 hover:bg-blue-600"
              } min-w-[100px] text-white py-2 px-4 rounded-md`}
            >
              Save
            </button>
            <button
              type="button"
              className={`bg-blue-500 hover:bg-blue-600 min-w-[100px] text-white py-2 px-4 rounded-md`}
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogForm;
