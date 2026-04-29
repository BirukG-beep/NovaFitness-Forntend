"use client";

import React, { useState } from "react";
import { FaServer, FaLock, FaEnvelope, FaTimes } from "react-icons/fa";
import { toEthiopian } from "ethiopian-date";
import { getMonthString } from "@/utils/getMonthString";
import { useTheme } from "@/context/ThemeContext";

// Simple toast component (can be replaced with a library)
const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity`}
    >
      {message}
    </div>
  );
};

export default function ServerPaymentPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  // Ethiopian date
  const today = new Date();
  const [ethYear, ethMonth, ethDay] = toEthiopian(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  const showToast = (message, type = "success") => {
    setToast({ message, type, visible: true });
  };

  const hideToast = () => {
    setToast({ ...toast, visible: false });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("Please fill in all fields", "error");
      return;
    }

    // Simulate login success
    showToast("Login successful", "success");
    setShowLogin(false);
  };

  // Theme‑aware classes
  const pageClass = isDark
    ? "min-h-screen bg-slate-800 text-white"
    : "min-h-screen bg-gray-100 text-gray-700";

  const cardClass = isDark
    ? "max-w-3xl bg-slate-900 shadow-xl rounded-2xl p-8 text-center border border-slate-700"
    : "max-w-3xl bg-white shadow-xl rounded-2xl p-8 text-center";

  const popupClass = isDark
    ? "bg-slate-800 rounded-2xl shadow-2xl w-[400px] p-8 border border-slate-700"
    : "bg-white rounded-2xl shadow-2xl w-[400px] p-8";

  const inputClass = `w-full outline-none bg-transparent ${
    isDark ? "text-white placeholder-gray-500" : "text-gray-900 placeholder-gray-400"
  }`;

  const inputContainerClass = `flex items-center border rounded-lg px-3 py-2 ${
    isDark ? "border-slate-600" : "border-gray-300"
  }`;

  const labelClass = isDark ? "text-gray-300" : "text-gray-600";

  return (
    <div className={`relative ${pageClass} w-[80%] flex items-center justify-center p-6`}>
      {toast.visible && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* Ethiopian Date Display */}
      <div className="absolute top-4 right-[50%] text-sm">
        <span className={isDark ? "text-gray-400" : "text-gray-500"}>
          Today (Ethiopian): {ethDay} {getMonthString(ethMonth)} {ethYear}
        </span>
      </div>

      {/* Main Content Card */}
      <div className={cardClass}>
        <FaServer className={`text-5xl mx-auto mb-4 ${isDark ? "text-blue-400" : "text-blue-600"}`} />

        <h1 className="text-3xl font-bold mb-3">Server Payment</h1>

        <p className="text-2xl font-semibold text-green-600 mb-4">6000 ETB (Birr)</p>

        <p className={`leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
       This payment covers server hosting for one year and system maintenance for up to five years. Maintenance includes updates, monitoring, and technical support to ensure the system runs smoothly. Hosting must be renewed annually, and by paying 6000 ETB (Birr) the server hosting will be extended for another year, allowing the application to remain online and accessible.
        </p>
      </div>

      {/* Login Popup */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/40 z-50">
          <div className={popupClass}>
            {/* Close button */}
          

            <h2 className={`text-2xl font-bold text-center mb-6 ${isDark ? "text-white" : "text-gray-800"}`}>
              Login Required
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className={inputContainerClass}>
                <FaEnvelope className={isDark ? "text-gray-400 mr-2" : "text-gray-500 mr-2"} />
                <input
                  type="email"
                  placeholder="Email"
                  className={inputClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={inputContainerClass}>
                <FaLock className={isDark ? "text-gray-400 mr-2" : "text-gray-500 mr-2"} />
                <input
                  type="password"
                  placeholder="Password"
                  className={inputClass}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}