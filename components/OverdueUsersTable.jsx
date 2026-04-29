"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toEthiopian } from "ethiopian-date";
import { FaTrash } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { DeleteUser } from "@/services/delete";
import { setOverdueUsers } from "@/redux/paymentSlice";

const OverdueUsersTable = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const overdueUsersRaw = useSelector((state) => state.payment.overdueUsers || []);

  const [sortMode, setSortMode] = useState("overdue");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Sorted list
  const displayedUsers = [...overdueUsersRaw].sort((a, b) => {
    if (sortMode === "alphabet") {
      // Alphabetical (A–Z)
      const nameA = (a.first_name || "") + " " + (a.last_name || "");
      const nameB = (b.first_ame || "") + " " + (b.last_name || "");
      return nameA.localeCompare(nameB);
    }

    // Default: Overdue descending + name as tie-breaker
    const overdueA = a.overdueDays || 0;
    const overdueB = b.overdueDays || 0;
    const diff = overdueB - overdueA;

    if (diff !== 0) return diff;

    const nameA = (a.first_name || "") + " " + (a.last_name || "");
    const nameB = (b.first_name || "") + " " + (b.last_name || "");
    return nameA.localeCompare(nameB);
  });

  const formatDate = (dateString) => {
    if (!dateString) return "—";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "—";

    const [year, month, day] = toEthiopian(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );

    const paddedMonth = month.toString().padStart(2, "0");
    const paddedDay = day.toString().padStart(2, "0");

    return `${year}/${paddedMonth}/${paddedDay}`;
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete || !userToDelete.id) return;

    setDeleting(true);

    try {
      await DeleteUser(userToDelete.id);

      const updated = overdueUsersRaw.filter((u) => u.id !== userToDelete.id);
      dispatch(setOverdueUsers(updated));
    } catch (err) {
      console.error("Delete failed:", err);
      // TODO: show toast / error message to user
    } finally {
      setDeleting(false);
      setIsModalOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <div
      className={`p-6 overflow-x-auto w-[80vw] mx-auto  shadow ${
        theme === "dark"
          ? "bg-slate-800 text-gray-300"
          : "bg-white text-gray-700 border border-gray-200"
      }`}
    >
      {/* Header + Sort Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-center">Overdue Members</h2>

        <div className="flex items-center gap-3">
          <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
            Sort by:
          </span>

          <button
            onClick={() => setSortMode("alphabet")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              sortMode === "alphabet"
                ? "bg-blue-600 text-white shadow-md"
                : theme === "dark"
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Name (A–Z)
          </button>

          <button
            onClick={() => setSortMode("overdue")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              sortMode === "overdue"
                ? "bg-blue-600 text-white shadow-md"
                : theme === "dark"
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Overdue ↓
          </button>
        </div>
      </div>

      <table className="min-w-full border-collapse text-center">
        <thead>
          <tr
            className={
              theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700"
            }
          >
            <th className="px-5 py-3 font-semibold">First Name</th>
            <th className="px-5 py-3 font-semibold">Last Name</th>
            <th className="px-5 py-3 font-semibold">Phone</th>
            <th className="px-5 py-3 font-semibold">Registered (EC)</th>
            <th className="px-5 py-3 font-semibold">Overdue Days</th>
            <th className="px-5 py-3 font-semibold">Action</th>
          </tr>
        </thead>

        <tbody>
          {displayedUsers.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-12 text-center text-gray-500 italic"
              >
                No overdue members found
              </td>
            </tr>
          ) : (
            displayedUsers.map((user) => (
              <tr
                key={user.id}
                className={`border-b last:border-b-0 transition-colors ${
                  theme === "dark"
                    ? "hover:bg-gray-700/70"
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="px-5 py-4">{user.first_name || "—"}</td>
                <td className="px-5 py-4">{user.last_name || "—"}</td>
                <td className="px-5 py-4">{user.phone || "—"}</td>
                <td className="px-5 py-4">{formatDate(user.register_date)}</td>
                <td className="px-5 py-4 font-semibold text-red-600">
                  {(user.overdueDays || 0)} days
                </td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => handleDeleteClick(user)}
                    className="text-red-600 hover:text-red-800 transition-colors p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/30"
                    disabled={deleting}
                    aria-label="Delete member"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {isModalOpen && userToDelete && (
        <ConfirmDeleteModal
          setIsModalOpen={setIsModalOpen}
          handleDelete={confirmDelete}
          isDeleting={deleting}
          message={
            "Are you sure you want to delete member \"" +
            (userToDelete.first_name || "") +
            " " +
            (userToDelete.last_name || "") +
            "\"? This action cannot be undone."
          }
        />
      )}
    </div>
  );
};

export default OverdueUsersTable;