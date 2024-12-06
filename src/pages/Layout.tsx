import React from "react";
import { Sidebar } from "../api/Sidebar";
import { Outlet } from "react-router";
import Header from "../api/Header";
const Layout: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="mb-10">
        <Header />
      </div>
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
