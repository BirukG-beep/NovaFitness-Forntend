"use client";


const ConfirmDeleteModal = ({ setIsModalOpen  , handleDelete }) => {


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-950/20 z-50">
      <div
        className={`p-6 rounded-xl shadow-xl w-[350px] bg-slate-800`}
      >
        <h3 className="text-lg font-semibold mb-4 text-center">
          Confirm Delete
        </h3>

        <p className="text-sm text-center mb-6">
          Are you sure you want to delete this user?
        </p>

        <div className="flex justify-between">
          <button
            onClick={
                ()=>{
                setIsModalOpen(false)
                }
            }
            className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500"
          >
            Cancel
          </button>

          <button
            onClick={()=>{
                   handleDelete()
                setIsModalOpen(false)
            }
            }
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;