"use client";

import { useEffect, useState, useMemo } from "react";
import Month from "./Month";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { todayCalculator } from "@/services/appServices/todayCalculator";
import { getLastYear } from "@/services/getLastYear";
import { getMonthString } from "@/utils/getMonthString";
import { payment, allpayment } from "@/services/payment";
import { dueDateCalculator } from "@/services/appServices/dueDateCalculator";
import { useTheme } from "@/context/ThemeContext";
const Calendar = ({ year }) => {
  const user = useSelector((state) => state.user);
const {theme} = useTheme();
  const [paymentsMap, setPaymentsMap] = useState({});
  const [months, setMonths] = useState([]);
  const [yearfinal, setYear] = useState(year);
  const [yearLast, setYearLast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ============================
  // FETCH DATA
  // ============================
  useEffect(() => {
    if (!yearfinal || !user?.userId) return;

    const fetchPayments = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1️⃣ Get all payments for year
        const paymentsRes = await allpayment(yearfinal);
        const payments = paymentsRes?.payments || [];

        const paymentMap = {};
        payments.forEach((p) => {
          paymentMap[p._id] = p;
        });

        setPaymentsMap(paymentMap);

        // 2️⃣ Get user yearly payment status
        const result = await payment(user.userId);

        const matchedYear = result.find(
          (res) => Number(res.year) === Number(yearfinal)
        );

        if (matchedYear) {
          setMonths(matchedYear.months || []);
        } else {
          setMonths([]);
        }

        // 3️⃣ Get last registered year
        const lastYear = await getLastYear(user.userId);
        setYearLast(lastYear);

      } catch (err) {
        console.error("Error fetching payments:", err);
        setError("Failed to fetch payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [yearfinal, user?.userId]);

  // ============================
  // DATE CALCULATIONS
  // ============================

  const today = new Date();
  const [todayYear, todayMonth, todayDay] = todayCalculator(today);

  const date = new Date(user?.createdAt || Date.now());
  const [yearReg, monthReg, dayReg] = todayCalculator(date);

  // ============================
  // OVERDUE CALCULATION
  // ============================

  const userPayment = paymentsMap[user?.userId];

  const firstDashIndex =
    userPayment?.months?.findIndex((m) => m.status === "-") ?? -1;

  const overdue = useMemo(() => {
    if (
      firstDashIndex === -1 ||
      !yearLast
    )
      return "No overdue";

    return dueDateCalculator(
      todayDay,
      todayMonth,
      firstDashIndex + 1,
      yearLast,
      yearfinal,
      dayReg
    );
  }, [
    firstDashIndex,
    todayDay,
    todayMonth,
    yearLast,
    yearfinal,
    dayReg,
  ]);

  // ============================
  // UI
  // ============================

  return (
    <div className={`w-full scrollbar-hidden max-w-4xl mx-auto pb-24 md:pb-6 p-6 ${theme === "dark" ? "bg-slate-950" : "bg-white"} rounded-2xl shadow-lg overflow-y-auto h-screen`}>

      {/* Header */}
      <div className="flex justify-center items-center mb-8">
        <button
          className="rounded-full bg-gray-500 p-3 text-white mr-6 hover:bg-gray-600 transition"
          onClick={() => setYear((prev) => prev - 1)}
        >
          <FaArrowLeft />
        </button>

        <h2 className="text-2xl font-bold text-gray-800">
          {yearfinal}
        </h2>

        <button
          className="rounded-full bg-gray-500 p-3 text-white ml-6 hover:bg-gray-600 transition"
          onClick={() => setYear((prev) => prev + 1)}
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Loading / Error */}
      {loading && (
        <p className="text-center text-gray-500 mb-4">
          Loading payments...
        </p>
      )}

      {error && (
        <p className="text-center text-red-600 mb-4">
          {error}
        </p>
      )}

      {/* Overdue */}
      <p className="text-center text-red-600 font-semibold mb-4">
        {overdue}
      </p>

      {/* Dates Section */}
      <div className="flex flex-col md:flex-row md:gap-16 justify-center items-center md:items-start mt-6">

        {/* Ethiopian Calendar */}
        <div className={`${theme === "dark" ?  "bg-slate-900" : "bg-white"} shadow-md rounded-2xl p-6 w-64 mb-10 text-center`}>
          <h2 className="text-lg font-semibold mb-4 text-slate-600">
            Ethiopian Calendar
          </h2>

          <div className="space-y-2">
            <div className="text-slate-600 text-base font-medium">
              {todayDay} / {todayMonth} / {todayYear}
            </div>

            <div className="text-slate-600 text-base font-medium">
              {todayDay} / {getMonthString(todayMonth)} / {todayYear}
            </div>
          </div>
        </div>

        {/* Registered Date */}
        <div className={`${theme === "dark" ? "bg-slate-900" :"bg-white"} shadow-md rounded-2xl p-6 w-64 text-center`}>
          <h2 className="text-lg font-semibold mb-4 text-slate-600">
            Registered Date
          </h2>

          <div className="space-y-2">
            <div className="text-slate-600 text-base font-medium">
              {dayReg} / {monthReg} / {yearReg}
            </div>

            <div className="text-slate-600 text-base font-medium">
              {dayReg} / {getMonthString(monthReg)} / {yearReg}
            </div>
          </div>
        </div>
      </div>

      {/* Months Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10">
        {months.map((month, index) => (
          <Month
            key={index}
            name={month.month}
            status={month.status}
            className="transition-transform hover:scale-105"
          />
        ))}
      </div>

    </div>
  );
};

export default Calendar;