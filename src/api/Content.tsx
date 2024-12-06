import React, { useCallback, useRef, useState } from "react";
import BlogList from "../components/Blogs/BlogList";
import EditBlogForm from "../components/form/EditBlogForm";
import { useAuth } from "../context/AuthContext";
import { useBlogs } from "../context/BlogsContext";

import BlogsSkeleton from "../components/Blogs/BlogsSkeleton";
import { BlogInterface } from "../types";
import useRequest2 from "../hooks/useRequest2";
export const Content = () => {
  const [editBlog, setEditBlog] = useState<BlogInterface | null>(null);
  const { user } = useAuth();

  const { testUpdateBlog, testDeleteBlog, loading } = useRequest2();

  const { blogs, blogsLoading, query } = useBlogs();

  const abortControllerRef = useRef<AbortController | null>(null);

  const onCancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort("Request cancelled by user.");
      //abortControllerRef.current.abort();
    }
    setEditBlog(null);
  }, [setEditBlog, abortControllerRef]);

  const handleEdit = useCallback(
    (blog: BlogInterface) => setEditBlog(blog),
    [setEditBlog]
  );

  const onSave = async (updatedBlog: BlogInterface) => {
    const { id, title, content } = updatedBlog;
    const data = { title, content };
    if (!user) {
      throw new Error("User must be authenticated.");
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    try {
      const newPost = await testUpdateBlog(
        user,
        id,
        data,
        abortController.signal
      );
      if (abortController.signal.aborted) {
        //const { reason } = abortController.signal;
        //console.log("Aborted: ", reason);
        return;
      }
      console.log(`newPost: `, newPost);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        console.log("Fetch request was cancelled.");
      } else {
        console.error("Failed to save the blog:", error);
      }
    } finally {
      setEditBlog(null);
      abortControllerRef.current = null;
    }
  };
  const handleDelete = async (id: string) => {
    if (!user) {
      throw new Error("User must be authenticated.");
    }
    try {
      await testDeleteBlog(user, id);
    } catch (error) {
      console.error("An error occurred when deleting the post: ", error);
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full overflow-hidden px-[10vw] mt-5">
      {blogsLoading && <BlogsSkeleton limit={5} loading={true} />}

      {filteredBlogs.length > 0 ? (
        <>
          <div className="flex relative w-full">
            <BlogList
              blogs={filteredBlogs}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            {editBlog && (
              <EditBlogForm
                blog={editBlog}
                onSave={onSave}
                onCancel={onCancel}
                loading={loading}
              />
            )}
          </div>
        </>
      ) : (
        !blogsLoading && (
          <div className="flex-1">There are no blogs to show.</div>
        )
      )}
    </div>
  );
};
