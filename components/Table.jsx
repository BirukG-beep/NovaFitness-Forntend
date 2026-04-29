import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { getMonthString } from "@/utils/getMonthString";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { DeleteUser } from "@/services/delete";
export const Table = ({  theme, isDark , ethYear , ethDay , ethMonth  , loading , months , filteredUsers , setHoveredUser , setSelectedRow , setSelectedPersonId , hoveredUser ,selectedRow , toast , setPaymentsMap , setLoading , setUsers , selectedPersonId }) => {
    
    //=============state of the table component================
      const [personToDelete, setPersonToDelete] = useState("");
      const [isModalOpen, setIsModalOpen]   = useState(false);

    //=============functions of the table component================
      const getRowStyle = (id) => {
    const isSelected = selectedRow === id;
    if (isSelected && theme === "light") return "bg-gray-100";
    if (isSelected && theme === "dark") return "bg-gray-900";
    if (theme === "light") return "hover:bg-gray-100";
    return "hover:bg-gray-800";
  };

   const changeStatus = async (userId, month, newStatus) => {
    try {
      const res = await fetch(
        "https://novabackend-kyw2.onrender.com/api/payment/updatePaymentStatus",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, month, status: newStatus }),
        }
      );
      if (!res.ok) throw new Error("Update failed");
      setPaymentsMap((prev) => ({
        ...prev,
        [userId]: {
          ...prev[userId],
          months: prev[userId].months.map((m) =>
            m.month === month ? { ...m, status: newStatus } : m
          ),
        },
      }));
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  const handleDelete = async () => {
    if (!personToDelete) return;
    setLoading(true);
    try {
      await DeleteUser(personToDelete);
      setUsers((prev) => prev.filter((u) => u.id !== personToDelete));
      if (selectedPersonId === personToDelete) {
        setSelectedPersonId(null); // close detail if deleted
      }
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      setPersonToDelete("");
    }
  };


  // ── STATE & HOOKS ───────────────────────────────────────────────
  // (none for now)
    return ( <div className={`${isDark ? "bg-slate-800" : ""} p-6 overflow-x-auto w-full hide-scrollbar`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${isDark ? "text-white" : "text-slate-700"}`}>
        Monthly Status Table
      </h2>

      <div className={`text-center mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
        Current Ethiopian Date: {ethYear}/{ethMonth}/{ethDay} (
        {ethDay} / {getMonthString(ethMonth)} / {ethYear})
      </div>

      {loading && <div className="text-center py-6 text-blue-500">Loading...</div>}

      <table className={`min-w-full border text-center ${isDark ? "text-gray-300" : "text-gray-600"}`}>
        <thead className={`${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
          <tr>
            <th className="px-4 py-3">Name</th>
            {months.map((m) => (
              <th key={m} className="px-3 py-3">
                {m}
              </th>
            ))}
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers
            .slice()
            .sort((a, b) =>
              `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
            )
            .map((person) => (
            <tr
  key={person.id}
  onMouseEnter={() => setHoveredUser(person.id)}
  onMouseLeave={() => setHoveredUser(null)}
 
  className={`transition cursor-pointer ${getRowStyle(person.id)}`}
>
  <td className="px-4 py-3 font-semibold text-left relative"
   onClick={() => {
    setSelectedRow(person.id);
    setSelectedPersonId(person.id);
  }}>
    <span className="hover:underline">
      {person.first_name} {person.last_name}
    </span>

                  {hoveredUser === person.id && (
                    <div
                      className={`absolute left-0 top-full mt-2 z-20 px-3 py-1.5 rounded shadow-lg text-xs whitespace-nowrap
                        ${toast[person.id] > 0 ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}
                    >
                      {toast[person.id] || 0} days overdue
                    </div>
                  )}
                </td>

                {months.map((monthName) => (
                  <td key={monthName} className="border px-3 py-3">
                    <div className="flex items-center gap-2 justify-center">
                      <span>{person.months?.[monthName] || "-"}</span>

                      {person.months?.[monthName] !== "X" && (
                        <select
                          className="text-xs border rounded px-2 py-1 bg-transparent"
                          value={person.months?.[monthName] || "-"}
                          onChange={(e) => changeStatus(person.id, monthName, e.target.value)}
                        >
                          <option>-</option>
                          <option>✔</option>
                          <option>✖</option>
                        </select>
                      )}
                    </div>
                  </td>
                ))}

                <td className="px-4 py-3">
                  <button
                    className="text-red-600 hover:text-red-800 text-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPersonToDelete(person.id);
                      setIsModalOpen(true);
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {isModalOpen && (
        <ConfirmDeleteModal
          setIsModalOpen={setIsModalOpen}
          handleDelete={handleDelete}
        />
      )}
    </div>
    
  );
}