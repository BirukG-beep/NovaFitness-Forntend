"use client";

import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import ResetPasswordModal from "./ResetPasswordModal";
import { useTheme } from "@/context/ThemeContext";

const UsersList = () => {
  const { users } = useUsers();
  const [selectedPhone, setSelectedPhone] = useState(null);
  const { theme } = useTheme();

  /* ================= AVATAR COLORS ================= */

  const avatarColorsLight = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-yellow-500",
    "bg-pink-500",
  ];

  const avatarColorsDark = [
    "bg-red-600",
    "bg-green-600",
    "bg-blue-600",
    "bg-purple-600",
    "bg-yellow-600",
    "bg-pink-600",
  ];

  const getAvatarColor = (letter) => {
    if (!letter) return "bg-gray-500 text-white";

    const index = letter.toLowerCase().charCodeAt(0) % 6;

    const color =
      theme === "dark"
        ? avatarColorsDark[index]
        : avatarColorsLight[index];

    return `${color} text-white`;
  };

  /* ================= RENDER ================= */

  return (
    <div
      className={`p-6 w-[80vw] mx-auto shadow-lg transition-all duration-300
        ${
          theme === "dark"
            ? "bg-slate-800 text-gray-200"
            : "bg-white text-gray-700"
        }
      `}
    >
      {/* Header */}
      <h2 className="text-3xl font-bold mb-8 text-center">
        Users Management
      </h2>

      {/* Users List */}
      <div className="space-y-4 flex flex-wrap gap-10">
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => setSelectedPhone(user.phone)}
            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer
              transition-all duration-200 hover:scale-[1.02]
              ${
                theme === "dark"
                  ? "bg-slate-700 hover:bg-slate-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }
            `}
          >
            {/* Avatar */}
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full
                text-xl font-bold shadow-md
                ${getAvatarColor(user.firstName?.[0])}
              `}
            >
              {user.firstName?.[0]?.toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <span className="font-semibold text-lg">
                {user.firstName} {user.lastName}
              </span>
              <span
                className={`text-sm ${
                  theme === "dark"
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                {user.phone}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Reset Modal */}
      {selectedPhone && (
        <ResetPasswordModal
          phone={selectedPhone}
          onClose={() => setSelectedPhone(null)}
        />
      )}
    </div>
  );
};

export default UsersList;