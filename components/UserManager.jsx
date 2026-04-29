"use client";

import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { toEthiopian } from "ethiopian-date";

export default function UserManager() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [users, setUsers] = useState([]);
  const [garbage, setGarbage] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchGarbage = async () => {
      try {
        const response = await fetch("https://novabackend-kyw2.onrender.com/api/auth/garbage");

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching garbage:", errorData);
          return;
        }

        const data = await response.json();

        console.log("Garbage users:", data);

        setUsers(data.users || []);
        setGarbage(data.garbage || []);
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };

    fetchGarbage();
  }, []);

 const deleteUser = async () => {
  try {
    const response = await fetch(
      `https://novabackend-kyw2.onrender.com/api/auth/garbage/${userToDelete}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error("Delete error:", err);
      return;
    }

    // remove from UI after success
    setUsers(users.filter((u) => u.id !== userToDelete));

    setUserToDelete(null);
  } catch (error) {
    console.error("Delete failed:", error);
  }
};

  // Convert Gregorian → Ethiopian
  const convertDate = (date) => {
    const d = new Date(date);

    const [year, month, day] = toEthiopian(
      d.getFullYear(),
      d.getMonth() + 1,
      d.getDate()
    );

    return `${day}/${month}/${year}`;
  };

  // Find last payment month
  const getLastPayment = (userId) => {
   

    garbage.map((g) => console.log(g.id, g.data)) // Debug: log garbage data
    const record = garbage.find((g) => g.data.user_id === userId);

    console.log("Finding last payment for user ID:", userId) // Debug: log user ID
    console.log("record")
   console.log(record)
    if (!record || !record.data || record.data.length === 0) {
      return "-";
    }

   const lastMonth = [...record.data.months]
  .reverse()
  .find((m) => m.status === "✔");

const result = lastMonth
  ? lastMonth.month +`         `+ record.data.eth_year
  : null;
    // Sort by highest Ethiopian year
    // const sortedYears = [...record.data].sort(
    //   (a, b) => Number(b.year) - Number(a.year)
    // );

    // for (const yearData of sortedYears) {
    //   const paidMonths = yearData.months.filter((m) => m.status === "✔");

    //   if (paidMonths.length > 0) {
    //     const lastMonth = paidMonths[paidMonths.length - 1];
    //     return `${lastMonth.month} ${yearData.year}`;
    //   }
    // }

    return result;
  };

  return (
    <div
      className={`p-8 w-full min-h-screen ${
        isDark ? "bg-slate-800 text-white" : "bg-white text-gray-700"
      }`}
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Gym Members</h1>

      <div className="overflow-x-auto">
        <table
          className={`min-w-full border text-center ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <thead className={`${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
            <tr>
              <th className="px-4 py-3">First Name</th>
              <th className="px-4 py-3">Last Name</th>
              <th className="px-4 py-3">Registered</th>
              <th className="px-4 py-3">Last Payment</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={`transition ${
                  isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              >
                <td className="px-4 py-3">{user.first_name}</td>

                <td className="px-4 py-3">{user.last_name}</td>

                <td className="px-4 py-3">{convertDate(user.created_at)}</td>

                <td className="px-4 py-3">{getLastPayment(user.id)}</td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => setUserToDelete(user.id)}
                    className="text-red-600 hover:text-red-800 text-lg"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}

      {userToDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div
            className={`p-6 rounded-xl shadow-xl w-[350px] ${
              isDark ? "bg-slate-900" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              Confirm Delete
            </h2>

            <p className="text-center mb-6">
              Are you sure you want to delete this user?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setUserToDelete(null)}
                className="px-4 py-2 rounded bg-gray-400 text-white"
              >
                Cancel
              </button>

              <button
                onClick={deleteUser}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}