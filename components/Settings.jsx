import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import TimeLine from "./TimeLine";
import ThemeToggle from "./ThemeToggle"

const Settings = ({
  setTheme,
  theme,
  autoReg,
  auto,
  feature,
  setFeature,
  filter,
  setFilter,
  input,
  setInput,
  ethYear,
  onYearChange,
  searchTerm,
  setSearchTerm,
  users = [],
  setSelectedUser,
}) => {
  const [debouncedValue, setDebouncedValue] = useState("");

  // ✅ Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onYearChange(input);
    }
  };

  const filteredUsers =
    debouncedValue.length > 0
      ? users.filter((u) =>
          `${u.firstName} ${u.lastName}`
            .toLowerCase()
            .includes(debouncedValue.toLowerCase())
        )
      : [];

  return (
    <div className="absolute top-14 right-4 z-50">
      <ul className="bg-slate-900 text-white rounded-md p-5 flex flex-col gap-3 min-w-[250px]">

        {/* 🔎 SEARCH */}
        <li>
          <input
            type="text"
            placeholder="Search user..."
            value={searchTerm}
            onChange={(e) => {
              setSelectedUser(null);
              setSearchTerm(e.target.value);
            }}
            className="w-full p-2 rounded text-gray-400 outline-none border-1 border-gray-400 "
          />

          {filteredUsers.length > 0 && (
            <div className="bg-white text-black mt-2 rounded shadow-md max-h-40 overflow-auto">
              {filteredUsers.map((u) => (
                <div
                  key={u._id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setSelectedUser(u);
                    setSearchTerm("");
                  }}
                >
                  {u.firstName} {u.lastName}
                </div>
              ))}
            </div>
          )}
        </li>

        <p className="text-gray-400 text-sm mt-2">Settings</p>

        {/* 🎨 THEME */}
        <li
          className="bg-slate-700 rounded-sm p-2 cursor-pointer"
          onClick={() => setFeature("theme")}
        >
          Theme
        </li>

        {feature === "theme" && (
        <ThemeToggle />
        )}

        {/* 📅 YEAR */}
        <li
          className="bg-slate-700 rounded-sm p-2 cursor-pointer"
          onClick={() => setFeature("year")}
        >
          Year
        </li>

        {feature === "year" && (
          <input
            type="text"
            placeholder={ethYear}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
           className="w-full p-2 rounded text-gray-400 outline-none border-1 border-gray-400 "
          />
        )}

        {/* 📊 FILTER */}
        <li
          className="bg-slate-700 rounded-sm p-2 cursor-pointer"
          onClick={() => setFeature("filter")}
        >
          Overdue Filter
        </li>

        {feature === "filter" && (
          <TimeLine
            options={[
              { label: "0M", value: 0 },
              { label: "1M", value: 10 },
              { label: "2M", value: 20},
              { label: "3M", value: 30},
            ]}
            value={filter}
            onChange={setFilter}
          />
        )}

        {/* 🤖 AUTO REGISTRATION */}
        <li
          className="bg-slate-700 rounded-sm p-2 cursor-pointer"
          onClick={() => setFeature("autoRegistration")}
        >
          Auto Registration
        </li>

        {
                feature === "autoRegistration" && <div className="text-sm grid justify-center text-gray-400">
                    <div className="flex rounded-xl  w-fit bg-gray-500 p-1" onClick={()=>{autoReg(!auto)}}>
                       <div  className={`${auto ? 'bg-gray-700' : ""} w-4 h-4  rounded-full`} onClick={()=>autoReg(true)}></div> <div className={`${ !auto?"bg-gray-400":"" } w-4 h-4  rounded-full`} onClick={()=>autoReg(false)}></div>
                    </div>
                    <div>
                     {auto ? <p className="text-center">ON</p> : <p className="text-center"> OFF </p>}
                    </div>
                </div>
            }
      </ul>
    </div>
  );
};

export default Settings;