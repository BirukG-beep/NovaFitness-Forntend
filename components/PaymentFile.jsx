"use client";

import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

export default function PaymentFile() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [banks, setBanks] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [image ,setImage]= useState("")

  // 🔹 Fetch banks from backend
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await fetch("https://novabackend-kyw2.onrender.com/api/file");
        const result = await res.json();
        setBanks(result.data || []); // backend returns { data: [...] }
      } catch (err) {
        console.error("Failed to fetch banks:", err);
      }
    };

    fetchBanks();
  }, []);

  // 🔹 Delete bank from backend
  const handleDelete = async () => {
    try {
      await fetch("https://novabackend-kyw2.onrender.com/api/file", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: deleteId }),
      });

      // remove from state after deletion
      setBanks(banks.filter((b) => b._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error("Failed to delete bank:", err);
    }
  };

  return (
    <div
      className={`p-8 min-h-screen w-[80%] ${
        isDark ? "bg-slate-800 text-white" : "bg-white text-gray-700"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-10">
        Bank Accounts
      </h1>

      {/* Bank Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banks.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No bank accounts found.
          </p>
        ) : (
          banks.map((bank) => (
            <div
              key={bank._id}
              className={`rounded-xl shadow-lg p-6 transition ${
                isDark
                  ? "bg-slate-900 border border-slate-700"
                  : "bg-white border"
              }`}
            >
              {/* Logo */}
              <div className="flex justify-center mb-4">
                <img
                  src={bank.imageUrl || "/placeholder.png"}
                  alt={bank.bankName || "Bank"}
                  className="h-16 object-contain"
                  onClick={()=>setImage(bank.imageUrl)}
                />
              </div>

              {/* Info */}
              <div className="space-y-2 text-center">
                <h2 className="text-lg font-bold">{bank.bankName}</h2>

                <p className="text-sm">
                  <span className="font-semibold">Account Name:</span>{" "}
                  {bank.to}
                </p>

                <p className="text-sm">
                  <span className="font-semibold">Account Number:</span>{" "}
                  {bank.accountNumber}
                </p>

                <p className="text-sm text-gray-400">
                  Year: {Date(bank.createdAt) || "N/A"}
                </p>
              </div>

              {/* Delete Button */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setDeleteId(bank._id)}
                  className="text-red-600 hover:text-red-800 text-lg flex items-center gap-2"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div
            className={`p-6 rounded-xl shadow-xl w-[350px] ${
              isDark ? "bg-slate-900 text-white" : "bg-white text-gray-700"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              Delete Bank Account
            </h2>

            <p className="text-center mb-6">
              Are you sure you want to delete this account?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {image &&<div className="fixed inset-0 bg-slate-900/60 backdrop-blur-2xl flex flex-col justify-center items-center z-50">
  {/* Close Button */}
  <button
    onClick={() => setImage("")}
    className="text-white text-4xl mb-4"
  >
    &times;
  </button>

  {/* Image */}
  <img
    src={image}
    alt="Preview"
    className="max-w-[90%] max-h-[80%] object-contain rounded-xl shadow-2xl"
  />
</div>}
    </div>
  );
}