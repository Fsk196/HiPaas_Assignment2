import React, { useEffect, useState } from "react";
import { getTitle } from "../fakedata/sidebarItem";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");

  const location = useLocation();
  console.log(location.pathname);
  
  
  useEffect(() => {
    const newTitle = getTitle(location);
    setTitle(newTitle);
    console.log(newTitle);
    
  }, [location]);
  return (
    <>
      <div className="w-full h-[70px] bg-white rounded-md drop-shadow-md">
        <div className="w-full h-[70px] px-8 flex justify-between items-center">
          <h2 className="text-[#535C91] text-2xl font-medium">{title}</h2>
          <h2 className="text-[32px] font-medium">{user.companyname}</h2>

          <div className="flex items-center gap-1">
            <img src="/src/assets/user.png" alt="user" />
            <div className="">
              <h2 className="text-[14px] text-black font-medium">
                {user.name}
              </h2>
              <p className="text-[14px] text-black font-medium">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
