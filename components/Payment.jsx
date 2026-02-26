import React, { useState } from "react";
import ThankYou from "./Thankyou";
import { useSelector } from "react-redux";
import {useTheme} from "@/context/ThemeContext";

const Payment = () => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [thanks, setThanks] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [image , setImage] = useState(null);
  const {theme} = useTheme();
  const userId = user.userId;

   const banks = [
    {
      name: "Awash Bank",
      src: "/awashbank.png",
      accountName: "CoreFit Gym",
      accountNumber: "1000123456789",
    },
    {
      name: "CBE",
      src: "/cbe.png",
      accountName: "CoreFit Gym",
      accountNumber: "2000987654321",
    },
    {
      name: "Oromia Bank",
      src: "/oromia.png",
      accountName: "CoreFit Gym",
      accountNumber: "3000111122223",
    },
    {
      name: "Telebirr",
      src: "/telebirr.png",
      accountName: "CoreFit Gym",
      accountNumber: "0912345678",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !selectedBank) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("bankName", selectedBank.name);
      formData.append("to", selectedBank.accountName);
      formData.append("accountNumber", selectedBank.accountNumber);
      formData.append("image", file);
      formData.append("userId", userId);
      const res = await fetch("https://novabackend-kyw2.onrender.com/api/banks", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setThanks(true);
        setSelectedBank(null);
        setFile(null);
      } else {
        alert("Failed to submit payment: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 pb-20 md:pb-0 ">
      <h2 className="text-2xl font-bold mb-8 text-gray-700">Select Payment Method</h2>

      {/* Bank Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {banks.map((bank, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedBank(bank)
              setImage(bank.src)}}
            className={`${theme === "dark" ? "bg-slate-900 border-slate-500" : "bg-white border-slate-200"} border-2  shadow-lg rounded-xl p-6 w-44 h-36 flex flex-col items-center justify-center cursor-pointer hover:scale-105 hover:shadow-2xl transition duration-300`}
          >
             <img
              src={bank.src}
              alt={bank.name}
              className="max-h-20 object-contain"
            />
            <p className="text-gray-700 font-semibold">{bank.name}</p>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedBank && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[400px] max-w-[90vw] relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedBank(null)}
              className="absolute top-3 right-4 text-gray-800 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <img src={image} alt="Payment Screenshot" className="w-full h-40 object-contain mb-4" />

            {/* Bank Info */}
            <div className="mb-4">
              <p className="font-semibold text-gray-700">To:</p>
              <p className="text-gray-700">{selectedBank.accountName}</p>
            </div>

            <div className="mb-6">
              <p className="font-semibold text-gray-700">Account Number:</p>
              <p className="text-gray-700">{selectedBank.accountNumber}</p>
            </div>

            {/* Upload Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="file"
                required
                onChange={(e) => setFile(e.target.files[0])}
                className="border p-2 rounded-lg text-gray-700"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Payment"}
              </button>
            </form>
          </div>
        </div>
      )}

      {thanks && <ThankYou setThanks={setThanks} />}
    </div>
  );
};

export default Payment;