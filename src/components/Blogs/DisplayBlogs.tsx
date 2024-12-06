import React, { useEffect, useRef } from "react";
import { Blog } from "./Blog";
import { BlogInterface } from "../../types";

interface DisplayBlogsInterface {
  blogs: BlogInterface[];
  onEdit: (blog: BlogInterface) => void;
  onDelete: (id: string) => void;
}

const DisplayBlogs: React.FC<DisplayBlogsInterface> = ({
  blogs,
  onEdit,
  onDelete,
}) => {
  const initialRender = useRef(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      initialRender.current = false;
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className={`flex flex-col gap-5`}>
      {blogs.map((blog, index) => (
        <Blog
          key={blog.id}
          isInitialRender={initialRender.current}
          blog={blog}
          onEdit={onEdit}
          onDelete={onDelete}
          index={index}
        />
      ))}
    </div>
  );
};

export default React.memo<DisplayBlogsInterface>(DisplayBlogs);
