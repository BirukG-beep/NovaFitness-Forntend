import {useTheme} from "@/context/ThemeContext"
const Month = ({ name, status }) => {
  const statusColor = status === "✔" ? "bg-green-500" : "bg-slate-500";
  const {theme} = useTheme();

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${theme === "dark"?"bg-slate-900 border-slate-500":"bg-white border-slate-800"}  border-1  rounded-xl shadow hover:shadow-lg transition`}>
      <span className={`${theme === "dark" ? "text-gray-400" :"text-slate-900"} font-semibold`}>{name}</span>
      <span className={`mt-2 w-6 h-6 flex items-center justify-center text-white rounded-full ${statusColor}`}>
        {status}
      </span>
    </div>
  );
};

export default Month;
