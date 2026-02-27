"use client";
import React, { useState, useEffect, useMemo } from "react";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { paymentAll } from "@/services/adminCheck";
import { toEthiopian } from "ethiopian-date";
import { getMonthString } from "@/utils/getMonthString";
import { allpayment } from "@/services/payment";
import { DeleteUser } from "@/services/delete";
import { dueDateCalculator } from "@/services/appServices/dueDateCalculator";
import { getLastYear } from "../services/getLastYear";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { useTheme } from "@/context/ThemeContext";

const MonthlyStatusTable = ({
  ethDay,
  ethMonth,
  ethYear,
  searchTerm,
  selectedUser,
  filter,
}) => {
  const [users, setUsers] = useState([]);
  const [paymentsMap, setPaymentsMap] = useState({});
  const [toast, setToast] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [personid , setPersonId] = useState("")
   const { theme } = useTheme();
  

  const router = useRouter();

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersRes = await paymentAll();
        setUsers(usersRes || []);
      } catch (error) {
        console.log("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /* ================= FETCH PAYMENTS ================= */
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const paymentsRes = await allpayment(ethYear);
        const payments = paymentsRes?.payments || [];

        const paymentMap = {};
        payments.forEach((payment) => {
          paymentMap[payment._id] = payment;
        });

        setPaymentsMap(paymentMap);
      } catch (error) {
        console.log("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (ethYear) {
      fetchPayments();
    }
  }, [ethYear]);

  /* ================= MERGE USERS + PAYMENTS (FIXED) ================= */
  const mergedUsers = useMemo(() => {
    const newToast = {};

    const result = users.map((user) => {
      const date = new Date(user.createdAt);
      const [, , day] = toEthiopian(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      );

      const userPayment = paymentsMap[user._id];

      let description = 0;

      if (userPayment) {
        const firstDashIndex = userPayment.months.findIndex(
          (m) => m.status === "-"
        );
  const lastyear = getLastYear(user.userId)
        if (firstDashIndex !== -1) {
          description = dueDateCalculator(
            ethDay,
            ethMonth,
            firstDashIndex + 1,
            lastyear,
            ethYear,
            day
          );
        }
      }

      newToast[user._id] = description;

      return {
        ...user,
        overdueCount: userPayment
          ? userPayment.months.filter((m) => m.status === "-").length
          : 0,
        months: userPayment
          ? userPayment.months.reduce((acc, m) => {
              acc[m.month] = m.status;
              return acc;
            }, {})
          : {},
      };
    });

    setToast(newToast);
    return result;
  }, [users, paymentsMap, ethDay, ethMonth, ethYear]);

  /* ================= FILTER LOGIC ================= */

  const filteredUsers = mergedUsers
    .filter((user) => {
      if (selectedUser) {
        return user._id === selectedUser._id;
      }

      if (searchTerm) {
        const fullName =
          `${user.firstName} ${user.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      }

      return true;
    })
    .filter((user) => {
      if (filter === 0) return true;

      const overdueDays = toast[user._id] || 0;

      if (filter === 10) return overdueDays >= 1;

      if (filter === 20 ) return overdueDays  >= 11;

      return overdueDays >= filter && overdueDays < filter + 30;
    });

  /* ================= UPDATE STATUS ================= */

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

      if (!res.ok) return;

      setPaymentsMap((prev) => ({
        ...prev,
        [userId]: {
          ...prev[userId],
          months: prev[userId].months.map((m) =>
            m.month === month ? { ...m, status: newStatus } : m
          ),
        },
      }));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  /* ================= DELETE USER ================= */

  const handleDelete = async () => {
    try {
     setLoading(true);
      await DeleteUser(personid);
    
      setUsers((prev) => prev.filter((u) => u._id !== personid));
     
    } catch (error) {
      console.log("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI HELPERS ================= */

  const months = [
    "Meskerem","Tikimt","Hidar","Tahsas","Tir","Yekatit",
    "Megabit","Miazia","Ginbot","Sene","Hamle","Nehase",
  ];

  const getRowStyle = (personId) => {
    const isSelected = selectedRow === personId;
    const isLight = theme === "light";

    if (isSelected && isLight) return "bg-gray-100";
    if (isSelected && !isLight) return "bg-gray-900";
    if (!isSelected && isLight) return "hover:bg-gray-100";
    return "hover:bg-gray-800";
  };

  /* ================= RENDER ================= */


 const  handleDeleteMaker = () =>{
    handleDelete(personid);

  }
  return (
    <div
      className={`${theme === "dark" ? "bg-slate-800" : ""} p-6 overflow-x-auto w-[80vw] hide-scrollbar`}
    >
      <h2
        className={`${
          theme === "dark" ? "text-white" : "text-slate-700"
        } text-2xl font-bold mb-6 text-center`}
      >
        Monthly Status Table
      </h2>

      <div
        className={`text-center mb-6 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Current Ethiopian Date: {ethYear}/{ethMonth}/{ethDay} (
        {ethDay} / {getMonthString(ethMonth)} / {ethYear})
      </div>

      {loading && (
        <div className="text-center py-4 text-blue-500">Loading...</div>
      )}

      <table
        className={`min-w-full border text-center ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        <thead className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
          <tr>
            <th className="px-4 py-2">Name</th>
            {months.map((month) => (
              <th key={month} className="px-3 py-2">
                {month}
              </th>
            ))}
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((person) => (
            <tr
              key={person._id}
              onMouseEnter={() => setHoveredUser(person._id)}
              onMouseLeave={() => setHoveredUser(null)}
              onClick={() => setSelectedRow(person._id)}
              className={`transition cursor-pointer ${getRowStyle(
                person._id
              )}`}
            >
              <td className="px-4 py-2 font-semibold text-start relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/adminDetail/${person._id}`);
                  }}
                  className="hover:underline"
                >
                  {person.firstName} {person.lastName}
                </button>

                {hoveredUser === person._id && (
                  <div className="absolute left-0 top-full mt-2 bg-red-600 text-white text-xs z-20 p-2 rounded shadow-lg whitespace-nowrap">
                    {toast[person._id] || 0} days overdue
                  </div>
                )}
              </td>

              {months.map((monthName) => (
                <td key={monthName} className="border px-3 py-2">
                  <div className="flex items-center gap-1 justify-center">
                    {person.months?.[monthName] || "-"}
                    {person.months?.[monthName] !== "X" && (
                      <select
                        className="text-xs border rounded px-2 py-1"
                        value={person.months?.[monthName] || "-"}
                        onChange={(e) =>
                          changeStatus(
                            person._id,
                            monthName,
                            e.target.value
                          )
                        }
                      >
                        <option>-</option>
                        <option>✔</option>
                        <option>✖</option>
                      </select>
                    )}
                  </div>
                </td>
              ))}

              <td className="px-4 py-2">
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true)
                    setPersonId(person._id);
                  }}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && <ConfirmDeleteModal setIsModalOpen={setIsModalOpen}  handleDelete={handleDelete}/>}
    </div>
  );
};

export default MonthlyStatusTable;