"use client";
import { useState } from "react";
import { useResetPassword } from "@/hooks/useResetPassword";
import { useTheme } from "@/context/ThemeContext";

const ResetPasswordModal = ({ phone, onClose }) => {
  const [password, setPassword] = useState("");
  const { handleReset, loading } = useResetPassword();
  const { theme } = useTheme();

  const submitHandler = async (e) => {
    e.preventDefault();
   const res = await handleReset(phone, password);
   console.log(res)
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-lg z-50">
      <form
        onSubmit={submitHandler}
        className={`w-[350px] p-6 rounded-xl shadow-lg ${
          theme === "dark" ? "bg-slate-800 text-white" : "bg-white text-gray-700"
        }`}
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        <input
          type="text"
          value={phone}
          disabled
          className={`w-full p-2 mb-3 rounded border ${
            theme === "dark"
              ? "bg-slate-700 border-slate-600"
              : "bg-gray-100"
          }`}
        />

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={`w-full p-2 mb-4 rounded border ${
            theme === "dark"
              ? "bg-slate-700 border-slate-600"
              : "bg-gray-100"
          }`}
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-red-500 hover:text-red-700"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordModal;