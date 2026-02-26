"use client";
import { useState } from "react";
import ThanksYou from "@/components/toast/Thank-you";
import {useRouter} from "next/navigation"
function ForgetPasswordForm() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [method, setMethod] = useState(""); 
  const [showThanks, setShowThanks] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value.trim();
    setInputValue(value);
    setError("");

    if (/^\d+$/.test(value)) {
      setMethod("phone");
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setMethod("email");
    } else {
      setMethod("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!method) {
      setError("Please enter a valid email address or phone number.");
      return;
    }

    if (method === "email") {
      console.log("Send reset link to email:", inputValue);
      setShowThanks(true);
    } else if (method === "phone") {
      console.log("Send reset code via SMS to:", inputValue);
      setShowThanks(true);
    }

    // setTimeout(() => setShowThanks(false), 3000);
    router.push("/send-code")
    setInputValue("");
    setMethod("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-gray-100">

        {/* Title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Forgot Password
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Enter your email or phone number to reset your password.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Email address or phone number"
              value={inputValue}
              onChange={handleChange}
              className="w-full border border-gray-300 p-4 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            />
          </div>

          {/* Button */}
          {method && (
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl font-semibold tracking-wide hover:bg-gray-800 transition-all duration-300 shadow-md"
            >
              {method === "email" ? "Send Reset Link" : "Send Verification Code"}
            </button>
          )}
        </form>
      </div>

      {showThanks && <ThanksYou />}
    </div>
  );
}

export default ForgetPasswordForm;
