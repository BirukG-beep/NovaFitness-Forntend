"use client";

import React, { useState } from "react";
import { toEthiopian } from "ethiopian-date";
import { getMonthString } from "@/utils/getMonthString";
import ServerPaymentModal from "@/components/ServerPaymentModal";

const PaymentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const today = new Date();
  const [ethYear, ethMonth, ethDay] = toEthiopian(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-800 text-gray-700 dark:text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Server Payment</h1>
        <div className="text-lg">
          Today (Ethiopian): {ethDay} {getMonthString(ethMonth)} {ethYear}
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow"
      >
        Open Payment Modal
      </button>

      <ServerPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (data) => {
          console.log("Payment data:", data);
          // Handle actual payment submission here
        }}
      />
    </div>
  );
};

export default PaymentPage;