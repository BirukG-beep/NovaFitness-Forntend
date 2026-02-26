"use client";

import { useState, useEffect } from "react";
import AdminTable from "@/components/AdminTable";
import SideBarAdmin from "@/components/SideBarAdmin";
import Notification from "@/components/Notification";
import { FaCog } from "react-icons/fa";
import Settings from "@/components/Settings";
import { toEthiopian } from "ethiopian-date";

const Admin = () => {
  const [admintable, setAdmintable] = useState(true);
  const [list, setList] = useState(false);
  const [feature, setFeature] = useState("theme");

  // 🔥 FIXED → filter must be number
  const [filter, setFilter] = useState(0);

  const [data, setData] = useState([]);
  const [auto, autoReg] = useState(true);
  const [input, setInput] = useState("");

  // 🔥 SEARCH STATE
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const todayEth = new Date();
  const [ethYearInitial, ethMonth, ethDay] = toEthiopian(
    todayEth.getFullYear(),
    todayEth.getMonth() + 1,
    todayEth.getDate()
  );

  const [date, setDate] = useState({
    ethYear: ethYearInitial,
    ethMonth,
    ethDay,
  });

  const handleYearChange = (newYear) => {
    const parsedYear = parseInt(newYear);
    if (!isNaN(parsedYear)) {
      setDate((prev) => ({ ...prev, ethYear: parsedYear }));
    }
  };

  return (
    <div className="bg-gray-50 relative min-h-screen flex">
      <SideBarAdmin setAdmintable={setAdmintable} />

      {admintable ? (
        <AdminTable
          ethYear={date.ethYear}
          ethMonth={date.ethMonth}
          ethDay={date.ethDay}
          searchTerm={searchTerm}
          selectedUser={selectedUser}
          filter={filter}
        />
      ) : (
        <Notification data={data} />
      )}

      <FaCog
        size={30}
        className="text-gray-400 cursor-pointer absolute top-4 right-4"
        onClick={() => setList(!list)}
      />

      {list && (
        <Settings
          autoReg={autoReg}
          auto={auto}
          feature={feature}
          setFeature={setFeature}
          filter={filter}
          setFilter={setFilter}
          input={input}
          setInput={setInput}
          ethYear={date.ethYear}
          onYearChange={handleYearChange}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSelectedUser={setSelectedUser}
        />
      )}
    </div>
  );
};

export default Admin;