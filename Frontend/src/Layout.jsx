import React from "react";
import { MainContent, Sidebar } from "./components";

const Layout = () => {
  return (
    <div className="w-full h-screen bg-[#E1E1E1]">
      <div className="w-full flex flex-row h-full">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
};

export default Layout;
