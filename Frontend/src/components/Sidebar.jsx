import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose, IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { sidebarItems } from "../fakedata/sidebarItem";
import { adminItem } from "../fakedata/adminItem";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/authSlice";

const Sidebar = () => {
  const { role } = useSelector((state) => state.auth);
  const [sidebarToggler, setSidebarToggler] = useState(false);
  const dispatch = useDispatch();

  const handleSidebar = () => {
    setSidebarToggler(!sidebarToggler);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
  };

  return (
    <>
      <div
        id="sidebar"
        className={`sidebar relative bg-[#070F2B] h-full transition-all duration-300 ${
          sidebarToggler ? "w-[100px]" : "w-[300px]"
        }`}
      >
        {/* Logo and hamburger menu  */}
        <div
          className={`flex py-8 items-center ${
            sidebarToggler ? "justify-center" : "justify-between px-8"
          }`}
        >
          <div className="flex gap-2">
            {!sidebarToggler && (
              <div className="flex gap-2">
                <img
                  src="/src/assets/hipaaslogo.svg"
                  alt="hipaasLogo"
                  className="sidebarItem"
                />
                <h2 className="sidebarItem text-[#9290C3] text-2xl font-medium">
                  HiPaaS
                </h2>
              </div>
            )}
          </div>

          {sidebarToggler ? (
            <button onClick={handleSidebar}>
              <GiHamburgerMenu className="text-[#9290C3] text-2xl" />
            </button>
          ) : (
            <button onClick={handleSidebar}>
              <IoClose className="text-[#9290C3] text-3xl" />
            </button>
          )}
        </div>

        {/* Sidebar menu  items */}
        <div className="w-full px-8">
          <div className="border-t border-[#9290C3] border-b py-8 text-[#9290C3] flex flex-col gap-6">
            {role === "admin"
              ? adminItem.map((item, id) => (
                  <div key={id}>
                    <Link
                      to={item.path}
                      className={`flex gap-2 text-xl items-center ${
                        sidebarToggler ? "justify-center" : ""
                      }`}
                    >
                      <div>
                        {React.createElement(item.icon, {
                          className: "text-2xl",
                        })}
                      </div>
                      {!sidebarToggler && (
                        <div className="sidebarItem font-medium">
                          {item.title}
                        </div>
                      )}
                    </Link>
                  </div>
                ))
              : sidebarItems.map((item, id) => (
                  <div key={id}>
                    <Link
                      to={item.path}
                      className={`flex gap-2 text-xl items-center ${
                        sidebarToggler ? "justify-center" : ""
                      }`}
                    >
                      <div>
                        {React.createElement(item.icon, {
                          className: "text-2xl",
                        })}
                      </div>
                      {!sidebarToggler && (
                        <div className="sidebarItem font-medium">
                          {item.title}
                        </div>
                      )}
                    </Link>
                  </div>
                ))}
          </div>
        </div>

        {/* Logout btn  */}
        <div className="absolute bottom-8 w-full flex justify-center text-[#9290C3]">
          <button onClick={handleLogout} className="flex items-center gap-2">
            <BiLogOut className="text-xl" />
            {!sidebarToggler && <span className="text-[#9290C3] ">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
