"use client";
import React, { useState, useEffect, useMemo } from "react";
import { FaTrash, FaUniversity, FaUser, FaCreditCard, FaArrowLeft } from "react-icons/fa";
import { paymentAll } from "@/services/adminCheck";
import { allpayment } from "@/services/payment";
import { DeleteUser } from "@/services/delete";
import { dueDateCalculator } from "@/services/appServices/dueDateCalculator";
import { getLastYear } from "@/services/getLastYear"; // assuming path is correct
import { getUser } from "@/services/getUser";
import { toEthiopian } from "ethiopian-date";
import { getMonthString } from "@/utils/getMonthString";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { useTheme } from "@/context/ThemeContext";
import { useDispatch } from "react-redux";
import { setUsersByOverdue } from "@/redux/paymentSlice";
import {fetchPersonById} from  "@/services/fetchPersonById"
import DateFilter from "@/components/DateFilter"; // assuming you have this
import DueBadge from "@/components/DueBadge";     // assuming you have this
import IndDetail from "@/components/IndDetail";           // assuming you have this

const months = [
  "Meskerem", "Tikimt", "Hidar", "Tahsas", "Tir", "Yekatit",
  "Megabit", "Miazia", "Ginbot", "Sene", "Hamle", "Nehase",
];

const MonthlyStatusWithDetail = ({
  ethDay,
  ethMonth,
  ethYear,
  searchTerm,
  selectedUser,
  filter,
}) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const [users, setUsers]               = useState([]);
  const [paymentsMap, setPaymentsMap]   = useState({});
  const [toast, setToast]               = useState({});
  const [selectedRow, setSelectedRow]   = useState(null);
  const [hoveredUser, setHoveredUser]   = useState(null);
  const [loading, setLoading]           = useState(false);
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [personToDelete, setPersonToDelete] = useState("");
  const [mergedUsers , setMergedUsers] = useState([]);

  // ── Detail view states ───────────────────────────────────────
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);     // basic user info
  const [transactions, setTransactions]         = useState([]);       // bank accounts / payments history
  const [detailLoading, setDetailLoading]       = useState(false);
  const [previewImage, setPreviewImage]         = useState("");
  const [detailFilters, setDetailFilters]       = useState({
    year: "",
    month: "",
    day: "",
  });

  // Fetch all users + payments (table data)
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersRes = await paymentAll();
        setUsers(usersRes || []);
      } catch (err) {
        console.error("Error fetching users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!ethYear) return;

    const fetchPayments = async () => {
      setLoading(true);
      try {
        const res = await allpayment(ethYear);
        const payments = res?.payments || [];
        console.log("these is payments")
        console.log(payments)
        const map = {};
        payments.forEach((p) => (map[p.user_id] = p));
        console.log("these is map")
        console.log(map)
        setPaymentsMap(map);
      } catch (err) {
        console.error("Error fetching payments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [ethYear]);


useEffect(() => {
  const calculateMergedUsers = async () => {
    try {
      const newToast = {};

      const result = await Promise.all(
        users.map(async (user) => {
          const date = new Date(user.register_date);

          console.log("Processing user:", user.id, user);

          console.log(user.first_name, "registered on", date);

          const [, , registrationDay] = toEthiopian(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
          );

          const userPayment =
            paymentsMap[user.id] || paymentsMap[user.userId];



            console.log("Payment data for user:", user.id, userPayment);

          let overdueDays = 0;

          if (userPayment) {
            const firstDashIndex = userPayment.months.findIndex(
              (m) => m.status === "-"
            );
         console.log("we find the index of first dash for user", user.id, "index:", firstDashIndex)
            if (firstDashIndex !== -1) {
              const lastYear = await getLastYear(user.id);

              console.log(lastYear, "last year data for user", user.id)

            
              overdueDays = dueDateCalculator(
                ethDay,
                ethMonth,
                firstDashIndex + 1,
                lastYear|| 0, // fallback if lastYear data is missing
                ethYear,
                registrationDay
              );
            }
          }

          // ✅ keep ID consistent
          newToast[user.id] = overdueDays;

          console.log(`User ${user.id} has ${overdueDays} overdue days`);

          console.log("final return for user")

          console.log(userPayment)

           console.log( {
            ...user,
            overdueCount: userPayment
              ? userPayment.months.filter((m) => m.status === "-").length
              : 0,

            months: userPayment
              ? userPayment.months.reduce((acc, m) => {
                  acc[m.month.charAt(0).toUpperCase() + m.month.slice(1).toLowerCase()] = m.status;
                  return acc;
                }, {})
              : {},
          }
        )
          return {
            ...user,
            overdueCount: userPayment
              ? userPayment.months.filter((m) => m.status === "-").length
              : 0,

            months: userPayment
              ? userPayment.months.reduce((acc, m) => {
                  acc[m.month.charAt(0).toUpperCase() + m.month.slice(1).toLowerCase()] = m.status;
                  return acc;
                }, {})
              : {},
          };
        })
      );

      console.log("these is result")
      console.log(result)

      setToast(newToast);
      setMergedUsers(result);
    } catch (error) {
      console.error("Error calculating merged users:", error);
    }
  };

  console.log("these is users")
  console.log(users)
  if (users.length > 0) {
    calculateMergedUsers();
  }
}, [users, paymentsMap, ethDay, ethMonth, ethYear]);

  // Dispatch overdue users for redux (same as before)
  console.log("these is mergered user")

  console.log(mergedUsers)
  useEffect(() => {
    const usersWithOverdue = mergedUsers.map((u) => ({
      ...u,
      overdueDays: toast[u.id] || 0,
    }));
    dispatch(setUsersByOverdue(usersWithOverdue));
  }, [mergedUsers, toast, dispatch]);

  // Filter users (table)
  const filteredUsers = useMemo(() => {
    let result = mergedUsers;

    if (selectedUser) {
      result = result.filter((u) => u.id === selectedUser.id);
    } else if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((u) =>
        `${u.first_name} ${u.last_name}`.toLowerCase().includes(term)
      );
    }

    if (filter === 0) return result;

    return result.filter((u) => {
      const days = toast[u.id] || 0;
      if (filter === 10) return days >= 1;
      if (filter === 20) return days >= 11;
      return days >= filter && days < filter + 30;
    });
  }, [mergedUsers, searchTerm, selectedUser, filter, toast]);

  useEffect(() => {
  console.log("mergedUsers:", mergedUsers);
  console.log("toast:", toast);
  console.log("filteredUsers:", filteredUsers);
}, [mergedUsers, toast, filteredUsers]);

  // ── Load detail data when user is selected ─────────────────────
  useEffect(() => {
    if (!selectedPersonId) {
      setSelectedUserData(null);
      setTransactions([]);
      return;
    }

    const loadDetail = async () => {
      console.log("Selected person ", selectedUserData)
      setDetailLoading(true);
      try {
        console.log("Loading detail for user ID:", selectedPersonId); 
        // 1. Basic user info
        const userRes = await getUser(selectedPersonId);

        console.log("Fetched user data:", userRes);
        setSelectedUserData(userRes.user || null);

        // 2. Transactions / bank accounts
        // Assuming fetchPersonById returns array of bank/payment records
        const txRes = await fetchPersonById(selectedPersonId); // ← your service
        const sorted = [...(txRes || [])].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        const withEthDate = sorted.map((item) => {
          const d = new Date(item.created_at);
          const [y, m, day] = toEthiopian(d.getFullYear(), d.getMonth() + 1, d.getDate());
          return {
            ...item,
            ethiopianDate: `${day}-${m}-${y}`,
            year: y,
            month: m,
            day,
          };
        });

        setTransactions(withEthDate);
      } catch (err) {
        console.error("Failed to load detail", err);
      } finally {
        setDetailLoading(false);
      }
    };

    loadDetail();
  }, [selectedPersonId]);

  // Filter transactions (detail view)
  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      return (
        (!detailFilters.year || item.year == detailFilters.year) &&
        (!detailFilters.month || item.month == detailFilters.month) &&
        (!detailFilters.day || item.day == detailFilters.day)
      );
    });
  }, [transactions, detailFilters]);

  // ── Handlers ────────────────────────────────────────────────────
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

  const getRowStyle = (id) => {
    const isSelected = selectedRow === id;
    if (isSelected && theme === "light") return "bg-gray-100";
    if (isSelected && theme === "dark") return "bg-gray-900";
    if (theme === "light") return "hover:bg-gray-100";
    return "hover:bg-gray-800";
  };

  const convertGregToEth = (dateStr) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  const [ey, em, ed] = toEthiopian(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );

  return `${ed}/${em}/${ey}`;
};

  // ── Render ──────────────────────────────────────────────────────
  const isDark = theme === "dark";

  if (selectedPersonId && selectedUserData) {
    // ── DETAIL VIEW ───────────────────────────────────────────────
    return (
      <div className={`min-h-screen ${isDark ? "bg-slate-800 text-white" : "bg-white text-gray-700"} p-6 md:p-8 w-screen`}>
        <button
          onClick={() => setSelectedPersonId(null)}
          className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg shadow transition
            ${isDark ? "bg-slate-700 hover:bg-slate-600" : "bg-gray-100 hover:bg-gray-200"}`}
        >
          <FaArrowLeft />
          Back to List
        </button>

        <div className="flex justify-center mb-8">
          <div
            className={`px-8 py-5 rounded-2xl shadow-lg text-center
              ${isDark ? "bg-slate-900 border border-slate-700" : "bg-white border border-gray-200"}`}
          >
            <p className="text-xl font-bold">
              {selectedUserData.first_name} {selectedUserData.last_name}
            </p>
            <p className="text-sm text-gray-400 mt-1">
             
              {convertGregToEth(selectedUserData.register_date)}
                 {/* ← replace with real current date if needed */}
            </p>
            <p className="text-sm mt-1">{selectedUserData.phone || "—"}</p>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-6">Bank Accounts / Transactions</h1>

        <div className="text-center mb-8">
          <p className="mb-4">Filter by Ethiopian Date</p>
          <DateFilter filters={detailFilters} setFilters={setDetailFilters} />
        </div>

        {detailLoading && <div className="text-center py-10">Loading detail...</div>}

        {!detailLoading && filteredTransactions.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No transactions found.
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredTransactions.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden
                ${isDark ? "bg-slate-900/60 backdrop-blur-sm" : "bg-white"}`}
            >
              <div className="h-48 bg-gray-800/30 flex items-center justify-center">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.bank_name}
                    className="h-full w-full object-contain p-4 cursor-pointer"
                    onClick={() => setPreviewImage(item.image_url)}
                  />
                ) : (
                  <div className="text-gray-500">No image</div>
                )}
              </div>

              <div className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FaUniversity />
                    <span className="font-semibold">{item.bank_name}</span>
                  </div>
                  <DueBadge createdAt={item.created_at} />
                </div>

                <div className="flex items-center gap-2">
                  <FaUser />
                  <span>To: {item.to || "—"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaCreditCard />
                  <span>{item.account_number || "—"}</span>
                </div>

                <div className="text-sm text-gray-400">
                  {item.ethiopianDate}
                </div>
              </div>
            </div>
          ))}
        </div>

        {previewImage && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl w-full">
              <img
                src={previewImage}
                alt="Preview"
                className="max-h-[90vh] w-full object-contain rounded"
              />
              <button
                onClick={() => setPreviewImage("")}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white text-3xl w-12 h-12 rounded-full flex items-center justify-center transition"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── TABLE VIEW ──────────────────────────────────────────────────
  return (
    <div className={`${isDark ? "bg-slate-800" : ""} p-6 overflow-x-auto w-full hide-scrollbar`}>
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
    console.log("Row clicked for user:", person.id);
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
};

export default MonthlyStatusWithDetail;