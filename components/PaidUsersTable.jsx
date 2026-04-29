"use client";
import React from "react";
import { useSelector } from "react-redux";
import { toEthiopian } from "ethiopian-date";
import { useTheme } from "@/context/ThemeContext";

const PaidUsersTable = () => {
  const { theme } = useTheme();

  // Get users with no overdue
  const paidUsers = useSelector((state) => state.payment.paidUsers);

  console.log(paidUsers)

  // Format registered date to Ethiopian calendar
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const [year, month, day] = toEthiopian(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    return `${year}/${month}/${day}`;
  };

  return (
    <div
      className={`p-6 overflow-x-auto w-[80vw] ${
        theme === "dark" ? "bg-slate-800 text-gray-300" : "text-gray-600"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Paid Members</h2>

      <table className="min-w-full border text-center">
        <thead className={theme === "dark" ? "bg-gray-700" : "bg-gray-100"}>
          <tr>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Registered Date</th>
          </tr>
        </thead>

        <tbody>
          {paidUsers.length === 0 && (
            <tr>
              <td colSpan="4" className="py-6 text-center">
                No paid users
              </td>
            </tr>
          )}

          {paidUsers.map((user) => (
            <tr
              key={user._id}
              className={
                theme === "dark"
                  ? "hover:bg-gray-800 transition"
                  : "hover:bg-gray-100 transition"
              }
            >
              <td className="px-4 py-2">{user.first_name}</td>
              <td className="px-4 py-2">{user.last_name}</td>
              <td className="px-4 py-2">{user.phone}</td>
              <td className="px-4 py-2">{formatDate(user.register_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaidUsersTable;