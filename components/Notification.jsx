"use client";
import React, { useEffect, useState } from "react";
import {useTheme} from "@/context/ThemeContext"
const Notification = () => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  const {theme} = useTheme();
  const [filter, setFilter] = useState("all"); 

  // 🔹 Fetch Banks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://novabackend-kyw2.onrender.com/api/banks");
        const result = await res.json();
        setData(result.banks.reverse()); // only banks array
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchData();
  }, []);

  // 🔹 Toggle Visibility (Frontend Only)
  const toggleVisibility = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, visibility: !item.visibility }
          : item
      )
    );
    handleToggleVisibility(id)
  };

  const filteredData = data.filter((item) => {
  if (filter === "visible") return item.visibility === true;
  if (filter === "hidden") return item.visibility === false;
  return true; // all
});

const handleToggleVisibility = async (id)  =>{
  const result = await fetch(`https://novabackend-kyw2.onrender.com/api/banks/:${id}/visibility`,{
    method:"PATCH"
  })
  console.log(result.json())
}
  return (
    <div className={`p-10 relative rounded-lg w-[80vw] mx-auto ${theme === "dark" ? "bg-slate-800 rounded-none" :"bg-white"}`}>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-600">
        Notifications
      </h1>

      <div className="flex justify-center gap-4 mb-6">
  <button
    onClick={() => setFilter("all")}
    className={`px-4 py-2 rounded ${
      filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
    }`}
  >
    All
  </button>

  <button
    onClick={() => setFilter("visible")}
    className={`px-4 py-2 rounded ${
      filter === "visible" ? "bg-green-600 text-white" : "bg-gray-800"
    }`}
  >
    Visible
  </button>

  <button
    onClick={() => setFilter("hidden")}
    className={`px-4 py-2 rounded ${
      filter === "hidden" ? "bg-red-600 text-white" : "bg-gray-800"
    }`}
  >
    Hidden
  </button>
</div>

      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500">
          No notifications available.
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredData.map((item) => (
            <li
              key={item._id}
              className="p-4 border rounded-xl flex flex-col items-center shadow-md hover:shadow-lg transition"
            >
              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-700">
                {item.to}
              </h2>

              {/* Image */}
              <img
                src={item.imageUrl}
                alt={item.bankName}
                className="mt-3 w-[90%] h-auto m-2 object-contain cursor-pointer"
                onClick={() => setImage(item.imageUrl)}
              />

              {/* Bank Info */}
              <div className="mt-4 text-center space-y-1">
                <p className="text-gray-600 text-sm">
                  Acc: {item.accountNumber}
                </p>

                <p className="text-gray-600 text-sm">
                  BN: {item.bankName}
                </p>
              </div>

              {/* Toggle */}
              <div className="flex items-center gap-3 mt-4">
                <div
                  onClick={() => toggleVisibility(item._id)}
                  className={`cursor-pointer rounded-full h-4 w-4 transition-all duration-300 
                    ${item.visibility ? "bg-green-700" : "bg-gray-300"}`}
                ></div>

                <span className="text-sm text-gray-500">
                  {item.visibility ? "Visible" : "Hidden"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* 🔥 Image Modal */}
      {image && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className=" rounded-2xl  w-[400px] relative shadow-2xl">

            {/* Close Button */}
            <button
              onClick={() => setImage("")}
              className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-10 h-10 flex justify-center items-center text-gray-700 hover:text-red-500 text-4xl"
            >
              &times;
            </button>

            <img
              src={image}
              alt="Preview"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;