"use client";

import { useParams, useRouter } from "next/navigation";
import { fetchPersonById } from "@/services/fetchPersonById";
import { useEffect, useState, useMemo } from "react";
import { FaUniversity, FaUser, FaCreditCard, FaArrowLeft } from "react-icons/fa";
import { toEthiopian } from "ethiopian-date";
import DateFilter from "@/components/DateFilter";
import DueBadge from "@/components/DueBadge";
import {useTheme} from "@/context/ThemeContext";
import { getUser } from "@/services/getUser";



const ImageGalleryPage = () => {
  const {theme} = useTheme();
  const { id } = useParams();
  const router = useRouter();

  const [image , setImage] = useState("")
  const [user, setUser] = useState(null);
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

    useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser(id);
      console.log(data)
      setUser(data.user);
    };

    fetchUser();
  }, []);

 const convertToEthiopia = (dateString) => {
  const [month, day, year] = dateString.split("/").map(Number);

  const [ethYear, ethMonth, ethDay] = toEthiopian(year, month, day);

  return `${ethDay}/${ethMonth}/${ethYear}`;
};

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
<div className="flex justify-center mb-6">
  {user ? (
    <div
      className={`px-6 py-4 rounded-2xl shadow-lg text-center transition-all
      ${theme === "dark"
        ? "bg-slate-900 text-white border border-slate-700"
        : "bg-white text-gray-800 border border-gray-200"
      }`}
    >
      <p className="text-lg font-semibold">
        {user.firstName} {user.lastName}
      </p>
      <p className="text-sm text-gray-400 mt-1">
        {convertToEthiopia("2/27/2026")}
      </p>
    </div>
  ) : (
    <p className="text-gray-500 animate-pulse text-center">
      Loading...
    </p>
  )}
</div>
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
                onClick={()=>setImage(item.imageUrl)}
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
     {image && (
  <div className="relative mx-auto max-w-lg rounded-lg overflow-hidden shadow-lg border border-gray-200">
    <img
      src={image}
      alt="Preview"
      className="w-full h-auto object-cover"
    />
    <button
      onClick={() => setImage("")}
      className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-black bg-opacity-60 hover:bg-opacity-80 text-white text-2xl rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
      aria-label="Remove image"
    >
      ×
    </button>
  </div>
)}
    </div>
  );
};

export default ImageGalleryPage;