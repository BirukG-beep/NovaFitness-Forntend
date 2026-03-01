"use client";
import { FiBell } from "react-icons/fi";
import { FiDatabase } from "react-icons/fi";
import { useSelector } from "react-redux";
const Sidebar = ({setAdmintable}) => {
    const user = useSelector((state)=>state.user)
    console.log(user)
  return (
    <div className="h-screen sticky top-0  w-[20vw] bg-slate-900 text-white flex flex-col p-2 md:p-6">
        <div className="h-10 w-10 rounded-full mx-auto bg-gray-700 flex items-center justify-center text-lg font-bold mb-4">
       {user?.firstName?.[0]?.toUpperCase() ?? ""}
        </div>
      {/* Logo / Title */}
      <h1 className="text-sm font-bold text-center text-slate-400">{user.firstName} {user.lastName}</h1>

      {/* Menu Items */}
      <div className="flex flex-col gap-2 mt-6">

        {/* Supporter */}
        <div className="flex items-center justify-center md:justify-start gap-4 p-3 hover:bg-gray-800 rounded-lg cursor-pointer transition" onClick={()=>setAdmintable("Trainer")}>
          <img src='/images/featured-class/cycling-white.png' className="w-5"  alt="webp"  />
          <span className="text-lg hidden md:flex">Trainer</span>
        </div>

        {/* Notification */}
        <div className="flex items-center gap-4 p-3 justify-center md:justify-start hover:bg-gray-800 rounded-lg cursor-pointer transition" onClick={()=>setAdmintable("Notification")}>
          <FiBell size={20} strokeWidth={1} className="text-[#eee] text-center"/>
          <span className="text-lg hidden md:flex text-center">Notification</span>
        </div>
        <div className="flex items-center gap-4 p-3 justify-center md:justify-start hover:bg-gray-800 rounded-lg cursor-pointer transition" onClick={()=>setAdmintable("Password")}>
          <FiDatabase size={20} strokeWidth={1} className="text-[#eee] text-center"/>
          <span className="text-lg hidden md:flex text-center">ForgetPassword</span>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;