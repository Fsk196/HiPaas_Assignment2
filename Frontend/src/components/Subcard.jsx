import React from "react";
import { GiNotebook } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Subcard = ({ title, icon, children, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      navigate(onClick);
    }
  };

  return (
    <>
      <div className="w-full h-[150px] bg-white rounded-lg px-3 py-2 drop-shadow-lg hover:scale-105 hover:transition-all duration-300">
        <div className="flex justify-between">
          <div className="flex gap-1 items-center font-medium">
            {React.createElement(icon, { className: "text-2xl text-[#9290C3]" })}
            {/* {title} */}
          </div>
          <button
            onClick={handleClick}
            className="bg-transparent border border-[#E9E9E9] text-black hover:text-white hover:bg-violet-500 px-3 py-1 rounded-lg"
          >
            See All
          </button>
        </div>

        <div className="border-t my-1 py-2 w-full h-[80%] border-[#E9E9E9] flex flex-col justify-center gap-2">
          <h2 className="text-lg font-medium ">{title}</h2>
          <div className="text-xl font-semibold text-violet-500">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Subcard;
