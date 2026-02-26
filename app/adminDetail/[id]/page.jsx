"use client";

import { useParams, useRouter } from "next/navigation";
import { fetchPersonById } from "@/services/fetchPersonById";
import { useEffect, useState, useMemo } from "react";
import { FaUniversity, FaUser, FaCreditCard, FaArrowLeft } from "react-icons/fa";
import { toEthiopian } from "ethiopian-date";
import DateFilter from "@/components/DateFilter";
import DueBadge from "@/components/DueBadge";
import {useTheme} from "@/context/ThemeContext"

const ImageGalleryPage = () => {
  const {theme} = useTheme();
  const { id } = useParams();
  const router = useRouter();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    year: "",
    month: "",
    day: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchPersonById(id);

        // ✅ Sort latest first
        const sorted = [...res].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // ✅ Convert to Ethiopian date
        const final = sorted.map((element) => {
          const date = new Date(element.createdAt);

          const ethDate = toEthiopian(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
          );

          return {
            ...element,
            ethiopianDate: ethDate.join("-"),
            year: ethDate[0],
            month: ethDate[1],
            day: ethDate[2],
          };
        });

        setData(final);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getData();
    }
  }, [id]);

  // ✅ Filter Logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return (
        (filters.year ? item.year == filters.year : true) &&
        (filters.month ? item.month == filters.month : true) &&
        (filters.day ? item.day == filters.day : true)
      );
    });
  }, [data, filters]);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-800 text-white" : " bg-white text-gray-700"} p-8 `}>

      {/* Back Button */}
      <button
        onClick={() => router.push("/admin")}
        className={`flex items-center gap-2 mb-6 px-4 py-2 ${theme === "dark" ? "bg-slate-900/50 text-white" :" bg-white text-slate-900"} shadow rounded-lg hover:bg-gray-600 transition`}
      >
        <FaArrowLeft />
        Back to Admin
      </button>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-8">
        Bank Accounts
      </h1>
      <div> 
      <p className="text-center mb-10">Filter user Transaction by Ethiopian Date</p>
      {/* Filter */}
      <DateFilter filters={filters} setFilters={setFilters} />
     </div>
      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-500 animate-pulse">
          Loading...
        </div>
      )}

      {/* Empty */}
      {!loading && filteredData.length === 0 && (
        <div className="text-center text-gray-500">
          No bank accounts found.
        </div>
      )}

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {filteredData.map((item) => (
          <div
            key={item._id}
            className={`${theme === "dark" ? "bg-slate-990/50 backdrop-blur-2xl" :"bg-white"}bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden max-w-sm mx-auto cursor-pointer`}
          >
            {/* Image */}
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <img
                src={item.imageUrl}
                alt="Bank"
                className="h-full w-full object-contain p-4"
              />
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaUniversity />
                  <span className="font-semibold">
                    {item.bankName}
                  </span>
                </div>

                <DueBadge createdAt={item.createdAt} />
              </div>

              <div className="flex items-center gap-2">
                <FaUser />
                <span>To: {item.to}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaCreditCard />
                <span>{item.accountNumber}</span>
              </div>

              <div className="text-sm text-gray-500">
                Ethiopian Date: {item.ethiopianDate}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGalleryPage;