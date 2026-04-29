"use client";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Sidebar from "@/components/Sidebar";
import Calendar from "@/components/Calendar";
import Payment from "@/components/Payment";
import SettingsPage from "@/components/SettingsPage";

const User = () => {
  // state to track which sidebar item is active
  const [activeItem, setActiveItem] = useState("Status");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="app-container" style={{ display: "flex" }}>
      {/* pass setter to Sidebar */}
      <Sidebar setActiveItem={setActiveItem} />

      {/* Body */}
      <div 
        className={`scrollbar-hidden body-content transition-colors duration-300 ${
          isDark ? 'bg-slate-950' : 'bg-white'
        }`} 
        style={{ flex: 1 }}
      >
        {activeItem === "Status" && <Calendar year={2018} />}
        
        {activeItem === "Payment" && (
          <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
            <Payment />
          </div>
        )}

        {activeItem === "Setting" && <SettingsPage />}
      </div>
    </div>
  );
};

export default User;