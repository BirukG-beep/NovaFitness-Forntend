"use client";

import React, { useState, useEffect } from "react";
import { FaCheck, FaRegSquare, FaSquare, FaUserPlus } from "react-icons/fa";
import { toEthiopian } from "ethiopian-date";
import { useTheme } from "@/context/ThemeContext";
import { paymentAll } from "@/services/adminCheck"; // adjust import as needed
import { getMonthString } from "@/utils/getMonthString";

// Simple inline toast component (can be replaced with a library)
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
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

const UserRegistration = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // State
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  const [register , setRegister] = useState(false)

  // Today's Ethiopian date
  const today = new Date();
  const [ethYear, ethMonth, ethDay] = toEthiopian(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Reuse paymentAll or replace with a dedicated user service
        const data = await paymentAll();
        setUsers(data || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        showToast("Error loading users", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Toast helper
  const showToast = (message, type = "success") => {
    setToast({ message, type, visible: true });
  };

  const hideToast = () => {
    setToast({ ...toast, visible: false });
  };

  // Selection handlers
  const toggleSelectAll = () => {
    if (selectedUserIds.length === users.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(users.map((u) => u.id));
    }
  };

  const toggleSelectUser = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Registration handlers
  const handleRegisterSingle = (user) => {
    console.log("CLICKED"); // 🔥 must print
    // Simulate API call – replace with actual service
    // await registerUser(user._id);
    showToast(`${user.first_name} ${user.last_name} registered`, "success");
  };

  const handleRegisterMultiple = async () => {
     console.log("CLICKED"); // 🔥 must print
    setRegister(true)
    if (selectedUserIds.length === 0) {
      showToast("No users selected", "error");
      return;
    }
    // Simulate batch registration
    const names = users
      .filter((u) => selectedUserIds.includes(u.id))
      .map((u) => `${u.first_name} ${u.last_name}`)
      .join(", ");

      const usertosend = users.filter((u) =>
        selectedUserIds.includes(u.id)
            );

       console.log(usertosend)
    showToast(`Registered: ${names}`, "success");
const result = await fetch("https://novabackend-kyw2.onrender.com/api/auth/registerAll", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(usertosend),
});

console.log(result)
    // Optionally clear selection after registration
    // setSelectedUserIds([]);
      if(result){
    setRegister(false)
  }
  };

  useEffect(() => {
  if (register) {
    document.body.style.overflow = "hidden"; // prevent scroll
  } else {
    document.body.style.overflow = "auto";
  }
}, [register]);


  // Styling
  const containerClass = isDark
    ? "bg-slate-800 text-white min-h-screen w-[80%] p-6"
    : "bg-white text-gray-700 min-h-screen w-[80%] p-6";

  const tableClass = `min-w-full border text-center ${
    isDark ? "text-gray-300 border-gray-700" : "text-gray-600 border-gray-200"
  }`;

  const theadClass = isDark ? "bg-gray-700" : "bg-gray-100";

  const rowHoverClass = isDark ? "hover:bg-gray-800" : "hover:bg-gray-50";

  const buttonBaseClass = `px-4 py-2 rounded-lg flex items-center gap-2 transition ${
    isDark
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : "bg-blue-500 hover:bg-blue-600 text-white"
  }`;

  return (
    <div className={containerClass}>
      {toast.visible && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* Header with date */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">User Registration</h1>
        <div className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Today (Ethiopian): {ethDay} {getMonthString(ethMonth)} {ethYear}
        </div>
      </div>

      {/* Action bar */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={toggleSelectAll}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isDark
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          {selectedUserIds.length === users.length && users.length > 0 ? (
            <FaSquare />
          ) : (
            <FaRegSquare />
          )}
          <span>Select All</span>
        </button>

        <button
          onClick={handleRegisterMultiple}
          disabled={selectedUserIds.length === 0}
          className={`${buttonBaseClass} ${
            selectedUserIds.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaUserPlus />
          Register Selected ({selectedUserIds.length})
        </button>
      </div>

      {/* User table */}
      {loading ? (
        <div className="text-center py-10 text-blue-500">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No users found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className={tableClass}>
            <thead className={theadClass}>
              <tr>
                <th className="px-4 py-3 w-10">Select</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className={`border-t ${rowHoverClass} transition`}
                >
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleSelectUser(user.id)}
                      className="text-xl"
                    >
                      {selectedUserIds.includes(user.id) ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaRegSquare />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="px-4 py-3">{user.email || "—"}</td>
                  <td className="px-4 py-3">{user.phone || "—"}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleRegisterSingle(user)}
                      className={`px-3 py-1 rounded text-sm ${
                        isDark
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white`}
                    >
                      Register
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {register && <div className="bg-slate-800/70 overflow-hidden h-screen  flex justify-center items-center absolute inset-0 backdrop-blur-2xl">
      <div className=" p-20 h-fit w-fit flex gap-3">
<div className="border-[10px] animate-spin border-dashed border-[#ccc] w-10 h-10 rounded-full"></div>
       <p className="w-fit h-10  flex items-center justify-center text-[#ccc]">
  we are registering users
</p>
        </div>
        </div>}
    </div>
  );
};

export default UserRegistration;