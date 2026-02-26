import React from "react";
import { useTheme } from "@/context/ThemeContext";
const ThankYou = ({ setThanks }) => {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center ${theme === "dark" ? "bg-slate-950" :"bg-gray-100"} px-4`}>
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-md w-full">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Thank You!
        </h2>

        <p className="text-gray-600 mb-6">
          Your payment has been successfully submitted.
          We will verify and activate your membership soon.
        </p>

        {/* Button */}
        <button
        onClick={() => setThanks(false)}
          className="bg-blue-600 bg-red text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
