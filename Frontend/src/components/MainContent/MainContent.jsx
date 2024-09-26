import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
const MainContent = () => {
  return (
    <>
      <div className="w-full flex p-4 flex-col">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default MainContent;
