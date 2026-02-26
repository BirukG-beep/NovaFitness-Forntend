"use client";
import { useTheme } from "@/context/ThemeContext";

const DateFilter = ({ filters, setFilters }) => {
  const {theme} = useTheme();
  return (
    <div className={`flex gap-4 justify-center ${theme === "dark" ? "bg-slate-900/90 " :"bg-gray-200"} p-2 rounded-md flex-wrap mb-8`}>

      <input
        type="number"
        placeholder="Year"
        value={filters.year}
        onChange={(e) =>
          setFilters({ ...filters, year: e.target.value })
        }
        className="border rounded-lg px-4 py-2 w-28"
      />

      <input
        type="number"
        placeholder="Month"
        value={filters.month}
        onChange={(e) =>
          setFilters({ ...filters, month: e.target.value })
        }
        className="border rounded-lg px-4 py-2 w-28"
      />

      <input
        type="number"
        placeholder="Day"
        value={filters.day}
        onChange={(e) =>
          setFilters({ ...filters, day: e.target.value })
        }
        className="border rounded-lg px-4 py-2 w-28"
      />

      <button
        onClick={() => setFilters({ year: "", month: "", day: "" })}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Clear
      </button>
    </div>
  );
};

export default DateFilter;