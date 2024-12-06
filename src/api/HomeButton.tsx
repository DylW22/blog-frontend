import React from "react";
import { Link } from "react-router";

const HomeButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Link
      to="/"
      className="bg-gray-300 border-4 border-white hover:bg-gray-500 h-100 h-full rounded-md px-3 md:px-5 lg:px-10 flex justify-center items-center"
      onClick={scrollToTop}
    >
      Home
    </Link>
  );
};

export default HomeButton;

/*
    <Link
      to="/"
      className="bg-gray-300 border-4 border-white hover:bg-gray-500 h-[50px] fixed right-0 mt-5 mx-5 rounded-md px-3 md:px-5 lg:px-10 flex justify-center items-center"
      onClick={scrollToTop}
    >
      Home
    </Link>
*/
