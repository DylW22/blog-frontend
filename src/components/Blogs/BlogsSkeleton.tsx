import React from "react";

interface BlogsSkeletonProps {
  limit: number;
  loading: boolean;
}

const BlogsSkeleton: React.FC<BlogsSkeletonProps> = ({ limit, loading }) => {
  return (
    <div className="flex flex-col gap-5 mt-20">
      {Array.from({ length: limit }).map((_, index) => (
        <div
          key={index}
          className={`bg-gray-300 h-[400px] rounded-md ${
            loading ? "animate-pulse" : "invisible" //set to invisible or hidden
          }`}
        >
          <div className="bg-gray-400 w-full h-[70px] flex justify-between px-10 py-5 rounded-t-md">
            {" "}
            <h1 className="text-xl w-[100px] bg-gray-300 rounded-md">
              <strong>&nbsp;</strong>
            </h1>
            <p className="text-gray-300">id: #&nbsp;</p>
          </div>
          <div className="px-10 py-5 mx-10 my-5 flex justify-between bg-gray-200 rounded-md h-1/2" />
        </div>
      ))}
    </div>
  );
};
export default BlogsSkeleton;
