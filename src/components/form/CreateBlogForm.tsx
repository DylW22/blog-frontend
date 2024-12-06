import React, { useEffect, useRef, useState } from "react";
import { contentIsValid, titleIsValid } from "../../utils/inputValidation";
import { User } from "../../types";
import useRequest2 from "../../hooks/useRequest2";

interface CreateBlogFormProps {
  onClose: () => void;
  user: User | null;
}

const CreateBlogForm: React.FC<CreateBlogFormProps> = ({ onClose, user }) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const formRef = useRef<HTMLDivElement | null>(null);

  const { testCreateBlog } = useRequest2();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleCreateBlogSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!titleIsValid(title)) return;
    if (!contentIsValid(content)) return;
    const data = { title, content };
    try {
      setIsProcessing(true);
      if (!user) {
        throw new Error("Unauthorized user.");
      }
      const newPost = await testCreateBlog(user, data);
      //use newPost
      console.log("newPost: ", newPost);
      setTitle("");
      setContent("");
    } catch (error) {
      throw new Error(`An error occurred when creating the post: ${error}`);
    } finally {
      setIsProcessing(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white rounded-lg p-6 shadow-lg w-[800px] relative"
        ref={formRef}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
        >
          ✖
        </button>
        <h2 className="text-lg font-semibold mb-4">Create Blog</h2>
        <form
          className="text-center"
          method="post"
          onSubmit={handleCreateBlogSubmit}
        >
          <input
            type="text"
            placeholder="Title"
            className="border border-gray-300 rounded-md w-full p-2 mb-4 text-2xl"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            className="border border-gray-300 rounded-md w-full p-2 mb-4 min-h-[300px] text-2xl"
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            disabled={isProcessing}
            className={`${
              isProcessing ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 px-4 rounded-md`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogForm;
