import React, { useState } from "react";

import DisplayBlogs from "./DisplayBlogs";
import { BlogInterface } from "../../types";
import BlogsSkeleton from "./BlogsSkeleton";
import Pagination from "./Pagination";

interface BlogListInterface {
  blogs: BlogInterface[];
  onEdit: (blog: BlogInterface) => void;
  onDelete: (id: string) => void;
}

const BlogList: React.FC<BlogListInterface> = ({ blogs, onEdit, onDelete }) => {
  const [page, setPage] = useState(0);

  const maxPages = Math.ceil(blogs.length / 5) - 1;

  const nextPage = () => setPage((page) => Math.min(maxPages, page + 1));

  const prevPage = () => setPage((page) => Math.max(0, page - 1));

  const blogsToDisplay = blogs.slice(page * 5, page * 5 + 5);

  const hasNextPage = page < maxPages;
  const hasPrevPage = page > 0;

  return (
    <div className="w-full flex flex-col mt-5 mb-5">
      <Pagination
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
      {blogs.length > 0 ? (
        <div className="flex flex-col">
          <DisplayBlogs
            blogs={blogsToDisplay}
            onDelete={onDelete}
            onEdit={onEdit}
          />
          {blogsToDisplay.length < 5 && (
            <BlogsSkeleton limit={5 - blogsToDisplay.length} loading={false} />
          )}
        </div>
      ) : (
        <div>Skeleton</div>
      )}
    </div>
  );
};

export default BlogList;
