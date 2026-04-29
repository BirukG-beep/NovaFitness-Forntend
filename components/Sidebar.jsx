import React from "react";
import SidebarItem from "./SidebarItem";

import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@/context/ThemeContext"

const Sidebar = ({ setActiveItem }) => {
  const {theme} = useTheme();
  const items = [
    { label: "Status", value: "Active" },
    { label: "Payment", value: "$100" },
    {label:"Setting" , value:"yes"}
  ];

  const user = useSelector((state) => state.user);
  console.log("users" , user)
 

  return (
    <div className={`fixed md:sticky bottom-5 md:top-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-0  w-12/13 md:w-[20vw] mx-auto h-fit md:h-screen  ${theme === "dark" ? "bg-slate-950/50 md:bg-slate-900" : "bg-[#ddd]/50 md:bg-slate-700"}  backdrop-blur-md     border-1 md:border-none  md:border-r-1  border-slate-700 rounded-4xl md:rounded-none px-3 md:p-6 flex md:flex-col items-center shadow-lg`} >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-white hidden md:flex items-center justify-center text-2xl font-bold text-gray-800 shadow-md md:mb-4">
      {user?.firstName?.[0]?.toUpperCase() ?? ""}
      </div>

      {/* Name */}
      <p className={`${theme === "dark" ? "text-gray-700 " :"text-slate-950"}font-semibold hidden md:flex text-center mb-6`}>{user.firstName} {user.lastName}</p>

      {/* Sidebar Items */}
      <div className="w-full flex md:flex-col items-center justify-center md:gap-4 mt-4 gap-15">
        {items.map((item, index) => (
          <SidebarItem
            key={index}
            label={item.label}
            value={item.value}
            onClick={() => setActiveItem(item.label)}
            className="cursor-pointer hover:bg-gray-300 rounded-full md:rounded-lg px-4 py-2 transition-colors flex justify-between items-center"
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
