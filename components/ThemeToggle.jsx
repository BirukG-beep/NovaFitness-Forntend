// components/ThemeToggle.jsx
"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center justify-center gap-3">
      <FiSun className={`w-4 h-4 ${!isDark ? 'text-yellow-500' : 'text-gray-400'}`} />
      
      <button
        onClick={toggleTheme}
        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors "
        style={{
          backgroundColor: isDark ? '#3b82f6' : '#e5e7eb'
        }}
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle theme"
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isDark ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      
      <FiMoon className={`w-4 h-4 ${isDark ? 'text-blue-500' : 'text-gray-400'}`} />
    </div>
  );
};

export default ThemeToggle;