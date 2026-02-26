// context/ThemeContext.jsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [font, setFont] = useState("inter");

  // Define fonts outside of any function to ensure it's always available
  const fonts = {
    inter: "Inter, system-ui, sans-serif",
    roboto: "Roboto, system-ui, sans-serif",
    poppins: "Poppins, system-ui, sans-serif",
    opensans: "'Open Sans', system-ui, sans-serif",
    montserrat: "Montserrat, system-ui, sans-serif",
    system: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  };

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedTheme = localStorage.getItem("theme");
    const savedFont = localStorage.getItem("font");
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
    
    if (savedFont) {
      setFont(savedFont);
      document.documentElement.style.fontFamily = fonts[savedFont];
    }
  }, []); // Empty dependency array - run once on mount

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const changeFont = (newFont) => {
    setFont(newFont);
    localStorage.setItem("font", newFont);
    document.documentElement.style.fontFamily = fonts[newFont];
  };

  // Make sure we're providing all values
  const value = {
    theme,
    font,
    toggleTheme,
    changeFont,
    fonts // Make sure fonts is included in the context value
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};