
import {  FaUniversity, FaUser, FaCreditCard, FaArrowLeft } from "react-icons/fa";
import { toEthiopian } from "ethiopian-date";
import DateFilter from "@/components/DateFilter"; // assuming you have this
export const IndDetail = ({ setSelectedPersonId , isDark , selectedUserData , detailFilters , setDetailFilters , filteredTransactions , setPreviewImage , previewImage , detailLoading  }) => {
   
    const convertGregToEth = (dateStr) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  const [ey, em, ed] = toEthiopian(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );

  return `${ed}/${em}/${ey}`;
};

  return (
         <div className={`min-h-screen ${isDark ? "bg-slate-800 text-white" : "bg-white text-gray-700"} p-6 md:p-8 w-screen`}>
              <button
                onClick={() => setSelectedPersonId(null)}
                className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg shadow transition
                  ${isDark ? "bg-slate-700 hover:bg-slate-600" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                <FaArrowLeft />
                Back to List
              </button>
      
              <div className="flex justify-center mb-8">
                <div
                  className={`px-8 py-5 rounded-2xl shadow-lg text-center
                    ${isDark ? "bg-slate-900 border border-slate-700" : "bg-white border border-gray-200"}`}
                >
                  <p className="text-xl font-bold">
                    {selectedUserData.first_name} {selectedUserData.last_name}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                   
                    {convertGregToEth(selectedUserData.register_date)}
                       {/* ← replace with real current date if needed */}
                  </p>
                  <p className="text-sm mt-1">{selectedUserData.phone || "—"}</p>
                </div>
              </div>
      
              <h1 className="text-3xl font-bold text-center mb-6">Bank Accounts / Transactions</h1>
      
              <div className="text-center mb-8">
                <p className="mb-4">Filter by Ethiopian Date</p>
                <DateFilter filters={detailFilters} setFilters={setDetailFilters} />
              </div>
      
              {detailLoading && <div className="text-center py-10">Loading detail...</div>}
      
              {!detailLoading && filteredTransactions.length === 0 && (
                <div className="text-center text-gray-500 py-10">
                  No transactions found.
                </div>
              )}
      
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredTransactions.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden
                      ${isDark ? "bg-slate-900/60 backdrop-blur-sm" : "bg-white"}`}
                  >
                    <div className="h-48 bg-gray-800/30 flex items-center justify-center">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.bank_name}
                          className="h-full w-full object-contain p-4 cursor-pointer"
                          onClick={() => setPreviewImage(item.image_url)}
                        />
                      ) : (
                        <div className="text-gray-500">No image</div>
                      )}
                    </div>
      
                    <div className="p-5 space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <FaUniversity />
                          <span className="font-semibold">{item.bank_name}</span>
                        </div>
                        <DueBadge createdAt={item.created_at} />
                      </div>
      
                      <div className="flex items-center gap-2">
                        <FaUser />
                        <span>To: {item.to || "—"}</span>
                      </div>
      
                      <div className="flex items-center gap-2">
                        <FaCreditCard />
                        <span>{item.account_number || "—"}</span>
                      </div>
      
                      <div className="text-sm text-gray-400">
                        {item.ethiopianDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
      
              {previewImage && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                  <div className="relative max-w-4xl w-full">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="max-h-[90vh] w-full object-contain rounded"
                    />
                    <button
                      onClick={() => setPreviewImage("")}
                      className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white text-3xl w-12 h-12 rounded-full flex items-center justify-center transition"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
  );
}
