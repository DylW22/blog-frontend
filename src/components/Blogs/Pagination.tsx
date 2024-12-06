import React from "react";

interface PaginationProps {
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: () => void;
  nextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  hasPrevPage,
  hasNextPage,
  prevPage,
  nextPage,
}) => {
  return (
    <div className="my-2">
      <button
        className={`mx-5 ${
          hasPrevPage
            ? "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            : "bg-gray-300 cursor-not-allowed"
        }  px-5 py-2 rounded-md text-white font-bold`}
        onClick={prevPage}
        disabled={!hasPrevPage}
      >
        Prev
      </button>
      <button
        className={`mx-5 ${
          hasNextPage
            ? "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            : "bg-gray-300 cursor-not-allowed"
        } px-5 py-2 rounded-md text-white font-bold`}
        onClick={nextPage}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
