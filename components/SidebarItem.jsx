import {  FaCheck , FaMoneyBillWave } from "react-icons/fa6";
import {useTheme} from "@/context/ThemeContext"
import { FaCog } from "react-icons/fa";
const SidebarItem = ({ label, onClick }) => {
    const { theme } = useTheme();
  const renderIcon = () => {
    if (label === "Setting") return <FaCog size={25} />;
    if (label === "Status") return <FaCheck size={25} />;
    if (label === "Payment") return <FaMoneyBillWave  size={25}/>;
    return null;
  };

  return (
    <div
      onClick={onClick}
      className={`mb-3.75 ${theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-slate-900"}  cursor-pointer p-2.5  rounded-full md:rounded-md   flex items-center justify-center gap-2 `}
    >
      {renderIcon()}
      <strong className="hidden md:flex">{label}</strong>
    </div>
  );
};

export default SidebarItem;
