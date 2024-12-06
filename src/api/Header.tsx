import React from "react";
import HomeButton from "./HomeButton";

const Header: React.FC = () => {
  return (
    <div className="fixed w-full z-50 bg-gradient-to-b from-gray-200 to-gray-100 flex justify-between p-2 h-[70px] border-b-2 border-white">
      <div className="flex justify-center items-center bg-red-300 w-[100px]">
        Logo
      </div>
      <div className="w-[100px]">
        <HomeButton />
      </div>
    </div>
  );
};

export default Header;
