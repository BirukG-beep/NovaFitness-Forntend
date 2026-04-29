"use client";
import React, { useState, useEffect, useMemo } from "react";
import { FaTrash } from "react-icons/fa";
import { paymentAll } from "@/services/adminCheck";
import { allpayment } from "@/services/payment";
import { dueDateCalculator } from "@/services/appServices/dueDateCalculator";
import { getLastYear } from "@/services/getLastYear"; // assuming path is correct
import { getUser } from "@/services/getUser";
import { toEthiopian } from "ethiopian-date";
import { Table } from "./Table";
import { useTheme } from "@/context/ThemeContext";
import { useDispatch } from "react-redux";
import { setUsersByOverdue } from "@/redux/paymentSlice";
import {fetchPersonById} from  "@/services/fetchPersonById"
import DueBadge from "@/components/DueBadge";     // assuming you have this
import { IndDetail } from "@/components/IndDetail";           // assuming you have this

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


  // ── Render ──────────────────────────────────────────────────────
  const isDark = theme === "dark";

  if (selectedPersonId && selectedUserData) {
    // ── DETAIL VIEW ───────────────────────────────────────────────
    return (
     <IndDetail setSelectedPersonId  = {setSelectedPersonId} isDark = {isDark}  selectedUserData = {selectedUserData} detailFilters = {detailFilters} setDetailFilters = {setDetailFilters} filteredTransactions = {filteredTransactions} setPreviewImage = {setPreviewImage} previewImage={previewImage} detailLoading ={detailLoading }/>
    );
  }

  // ── TABLE VIEW ──────────────────────────────────────────────────
  return (
    <Table 
    
      isDark ={isDark} 
      ethYear ={ethYear} 
      ethDay ={ethDay} 
      ethMonth ={ethMonth} 
      loading ={loading} 
      months ={months} 
      filteredUsers ={filteredUsers} 
      setHoveredUser ={setHoveredUser} 
      setSelectedRow ={setSelectedRow} 
      setSelectedPersonId ={setSelectedPersonId}
      hoveredUser={hoveredUser}
      selectedRow={selectedRow}
      toast={toast}
      setPaymentsMap={setPaymentsMap}
      setLoading={setLoading}
      setUsers={setUsers}
      selectedPersonId={selectedPersonId}
    />
  );
};

export default MonthlyStatusWithDetail;