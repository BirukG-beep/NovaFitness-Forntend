"use client";
import { FiBell } from "react-icons/fi";
import { FiDatabase , FiUser  } from "react-icons/fi";
import { FaUserTie, FaExclamationCircle ,FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import {useState} from "react"
import { FaUserPlus  } from "react-icons/fa";

const Sidebar = ({setAdmintable}) => { 
  const [visibleuser ,setVisible] = useState(false);
  const [garbege , setGarbege] = useState(false);
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
        
       <div>
  <div   className={`flex items-center relative gap-4 p-3 justify-center md:justify-start hover:bg-gray-800 rounded-t-lg ${!visibleuser ? "rounded-lg " :"bg-gray-800"} cursor-pointer transition`}>
    <FiUser size={20} strokeWidth={1} className="text-[#eee] text-center"/>
    <span className="text-lg hidden md:flex text-center">User</span>
    <FaChevronDown
      size={12}
      strokeWidth={1}
      className="text-[#eee] text-center absolute right-7"
      onClick={(e) => { e.stopPropagation(); setVisible(prev => !prev); }}
    />
     </div>
    {visibleuser && 
 <ul className="bg-gray-800 rounded-b-lg shadow-lg overflow-hidden z-50">
  <li className="flex items-center gap-3 px-6 py-2 text-md hover:bg-gray-700 cursor-pointer text-gray-300 transition-colors duration-200" onClick={() => setAdmintable("PaidUsersTable")}>
    <FaUserTie size={16} />
    Trainer
  </li>

  <li className="flex items-center gap-3 px-6 py-2 text-md hover:bg-gray-700 cursor-pointer text-gray-300 transition-colors duration-200" onClick={() => setAdmintable("overDueUsersTable")}> 
    <FaExclamationCircle size={16}  />
    Overdue Trainer
  </li>
</ul>
    }
 
</div>
<div>
<div className={`flex items-center relative gap-4 p-3 justify-center md:justify-start hover:bg-gray-800 rounded-t-lg ${!garbege ? "rounded-lg " :"bg-gray-800"} cursor-pointer transition`}>
          <svg fill="#ffffff" height="20px" width="20px"   viewBox="0 0 512 512" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M223.206,274.513c-11.45,0-20.767,9.316-20.767,20.767v144.834c0,11.45,9.316,20.767,20.767,20.767 s20.767-9.316,20.767-20.767V295.28C243.973,283.829,234.656,274.513,223.206,274.513z M227.998,440.113 c0,2.642-2.15,4.792-4.792,4.792s-4.792-2.15-4.792-4.792V295.28c0-2.642,2.15-4.792,4.792-4.792s4.792,2.15,4.792,4.792V440.113z "></path> </g> </g> <g> <g> <path d="M329.052,274.829c-11.159-1.968-22.096,5.699-24.06,16.841l-25.559,144.834c-1.99,11.277,5.564,22.07,16.841,24.059 c1.196,0.211,2.415,0.318,3.624,0.318c10.086,0,18.681-7.216,20.435-17.16l25.559-144.834 C347.882,287.613,340.327,276.82,329.052,274.829z M330.16,296.114l-25.559,144.834c-0.454,2.574-2.939,4.345-5.552,3.887 c-2.603-0.461-4.346-2.951-3.887-5.554l25.559-144.834c0.454-2.569,2.978-4.342,5.551-3.886h0.001 C328.876,291.02,330.619,293.511,330.16,296.114z"></path> </g> </g> <g> <g> <path d="M166.98,436.504l-25.559-144.834c-1.965-11.138-12.903-18.816-24.059-16.841c-11.277,1.99-18.832,12.783-16.841,24.059 l25.559,144.834c1.754,9.943,10.349,17.16,20.435,17.16c1.21,0,2.429-0.108,3.624-0.318 C161.415,458.573,168.97,447.781,166.98,436.504z M147.361,444.831c-2.606,0.462-5.098-1.313-5.552-3.886L116.25,296.111 c-0.459-2.602,1.284-5.092,3.888-5.552c2.573-0.456,5.098,1.318,5.551,3.886l25.559,144.834 C151.707,441.881,149.964,444.372,147.361,444.831z"></path> </g> </g> <g> <g> <path d="M481.017,143.931c-4.281-10.389-12.351-18.489-22.724-22.807l-94.872-39.502l10.029-24.087 c1.674-4.02-0.292-8.773-4.303-10.444l-78.651-32.747c-4.019-1.675-8.774,0.293-10.444,4.304l-10.029,24.087L175.15,3.232 c-21.413-8.916-46.088,1.251-55.004,22.664l-6.549,15.73c-1.695,4.072,0.231,8.747,4.303,10.444l247.074,102.873 c4.294,1.789,9.311-0.578,10.696-5.003c1.216-3.885-0.803-8.181-4.556-9.744l-239.7-99.803l3.479-8.357 c5.529-13.281,20.834-19.59,34.116-14.057l283.145,117.891c13.116,5.461,19.532,20.968,14.058,34.116l-3.479,8.357l-57.548-23.961 c-4.072-1.697-8.748,0.231-10.444,4.303c-1.695,4.072,0.231,8.747,4.303,10.444l64.921,27.031 c4.02,1.675,8.774-0.294,10.444-4.303l6.549-15.73C485.277,165.754,485.299,154.319,481.017,143.931z M348.672,75.482 l-63.904-26.607l6.959-16.714l63.904,26.608L348.672,75.482z"></path> </g> </g> <g> <g> <path d="M410.638,189.319H239.713V112.11c0-4.411-3.576-7.987-7.987-7.987h-76.677c-4.411,0-7.987,3.576-7.987,7.987 c0,4.411,3.576,7.987,7.987,7.987h46.329l-54.848,33.753l-54.848-33.753h20.77c4.411,0,7.987-3.576,7.987-7.987 c0-4.411-3.576-7.987-7.987-7.987H61.333c-4.411,0-7.987,3.576-7.987,7.987v77.209H35.774c-4.411,0-7.987,3.576-7.987,7.987 v34.078c0,4.411,3.576,7.987,7.987,7.987h15.953l31.546,189.277c0.651,3.906,4.035,6.675,7.869,6.675 c0.436,0,0.879-0.036,1.323-0.11c4.351-0.725,7.291-4.84,6.565-9.192L67.922,239.372H378.49l-42.776,256.654H110.698 l-5.987-35.924c-0.725-4.351-4.847-7.292-9.192-6.565c-4.351,0.725-7.291,4.84-6.565,9.192l7.1,42.598 c0.642,3.852,3.973,6.674,7.879,6.674h238.55c3.905,0,7.236-2.822,7.879-6.674l44.326-265.954h15.953 c4.411,0,7.987-3.576,7.987-7.987v-34.078C418.625,192.895,415.049,189.319,410.638,189.319z M69.32,125.092l73.023,44.938 c1.283,0.79,2.735,1.185,4.186,1.185c1.452,0,2.903-0.395,4.186-1.185l73.023-44.938v64.226H69.32V125.092z M402.651,223.397 H43.761v-18.104h358.889V223.397z"></path> </g> </g> </g></svg>
          <span className="text-lg hidden md:flex text-center">Garbege </span>
            <FaChevronDown
      size={12}
      strokeWidth={1}
      className="text-[#eee] text-center absolute right-7"
      onClick={(e) => { e.stopPropagation(); setGarbege(prev => !prev); }}
    />
        </div>
         {garbege && 
 <ul className="bg-gray-800 rounded-b-lg shadow-lg overflow-hidden z-50">
  <li className="flex items-center gap-3 px-6 py-2 text-md hover:bg-gray-700 cursor-pointer text-gray-300 transition-colors duration-200" onClick={() => setAdmintable("UserManager")}>
    <FaUserTie size={16} />
     User
  </li>

  <li className="flex items-center gap-3 px-6 py-2 text-md hover:bg-gray-700 cursor-pointer text-gray-300 transition-colors duration-200" onClick={() => setAdmintable("payementFile")}>
    <FaExclamationCircle size={16} />
     Payment File
  </li>

</ul>
    }
      </div>
           <div className="flex items-center gap-4 p-3 justify-center md:justify-start hover:bg-gray-800 rounded-lg cursor-pointer transition" onClick={()=>setAdmintable("registeration")}>
<svg fill="#fff" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" stroke="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M406.393,131.594c4.58,0,8.294-3.713,8.294-8.294V34.834C414.687,15.627,399.06,0,379.853,0H43.68 C24.473,0,8.847,15.627,8.847,34.834v442.333C8.847,496.373,24.473,512,43.68,512h336.173c19.207,0,34.834-15.627,34.834-34.834 v-88.468c0-4.581-3.713-8.294-8.294-8.294c-4.58,0-8.294,3.713-8.294,8.294v88.468c0,10.061-8.185,18.246-18.246,18.246H43.68 c-10.061,0-18.246-8.185-18.246-18.246V34.834c0-10.061,8.185-18.246,18.246-18.246h336.173c10.061,0,18.246,8.185,18.246,18.246 V123.3C398.099,127.881,401.813,131.594,406.393,131.594z"></path> </g> </g> <g> <g> <path d="M229.46,35.387h-35.387c-4.58,0-8.294,3.713-8.294,8.294c0,4.58,3.713,8.294,8.294,8.294h35.387 c4.58,0,8.294-3.713,8.294-8.294C237.754,39.1,234.04,35.387,229.46,35.387z"></path> </g> </g> <g> <g> <path d="M158.687,35.431c-4.58,0-8.294,3.758-8.294,8.338c0,4.58,3.713,8.294,8.294,8.294c4.58,0,8.294-3.713,8.294-8.294V43.68 C166.981,39.1,163.267,35.431,158.687,35.431z"></path> </g> </g> <g> <g> <path d="M229.46,460.026h-35.387c-4.58,0-8.294,3.713-8.294,8.294c0,4.58,3.713,8.294,8.294,8.294h35.387 c4.58,0,8.294-3.713,8.294-8.294C237.754,463.739,234.04,460.026,229.46,460.026z"></path> </g> </g> <g> <g> <path d="M371.002,131.594c4.58,0,8.294-3.713,8.294-8.294V79.066c0-4.58-3.713-8.294-8.294-8.294H52.523 c-4.58,0-8.294,3.713-8.294,8.294v353.866c0,4.58,3.713,8.294,8.294,8.294h318.479c4.58,0,8.294-3.713,8.294-8.294V388.7 c0-4.58-3.713-8.294-8.294-8.294c-4.58,0-8.294,3.713-8.294,8.294v35.938H60.816V87.36h301.892V123.3 C362.708,127.881,366.422,131.594,371.002,131.594z"></path> </g> </g> <g> <g> <path d="M273.693,362.713H202.92c-4.58,0-8.294,3.713-8.294,8.294s3.713,8.294,8.294,8.294h70.773c4.58,0,8.294-3.713,8.294-8.294 S278.274,362.713,273.693,362.713z"></path> </g> </g> <g> <g> <path d="M167.533,362.713H149.84c-4.58,0-8.294,3.713-8.294,8.294s3.713,8.294,8.294,8.294h17.693c4.58,0,8.294-3.713,8.294-8.294 S172.114,362.713,167.533,362.713z"></path> </g> </g> <g> <g> <path d="M211.767,141.546c-24.085,0-43.68,19.595-43.68,43.68c0,24.085,19.595,43.68,43.68,43.68s43.68-19.595,43.68-43.68 C255.447,161.142,235.852,141.546,211.767,141.546z M211.767,212.32c-14.939,0-27.093-12.154-27.093-27.093 c0-14.939,12.154-27.093,27.093-27.093s27.093,12.154,27.093,27.093C238.86,200.165,226.705,212.32,211.767,212.32z"></path> </g> </g> <g> <g> <path d="M397.546,150.393c-58.232,0-105.607,47.375-105.607,105.607c0,30.554,12.938,58.982,35.739,79.066 c-11.441,18.732-23.858,29.525-23.985,29.633c-2.733,2.334-3.651,6.163-2.276,9.483c1.292,3.116,4.328,5.119,7.659,5.119 c0.218,0,0.438-0.009,0.658-0.025c1.365-0.108,32.508-2.768,60.135-21.346c9.004,2.442,18.295,3.678,27.677,3.678 c58.232,0,105.607-47.375,105.607-105.607C503.153,197.768,455.778,150.393,397.546,150.393z M397.546,345.019 c-9.084,0-18.064-1.373-26.689-4.081c-2.51-0.787-5.247-0.337-7.374,1.214c-10.211,7.453-21.42,12.265-31.044,15.345 c4.305-5.678,8.903-12.505,13.214-20.384c1.962-3.586,1.018-8.067-2.223-10.557c-22.182-17.041-34.903-42.758-34.903-70.556 c0-49.086,39.934-89.019,89.019-89.019c49.086,0,89.019,39.934,89.019,89.019S446.632,345.019,397.546,345.019z"></path> </g> </g> <g> <g> <path d="M440.943,212.604c-4.907-4.91-11.432-7.613-18.375-7.613c-6.941,0-13.468,2.704-18.376,7.611 c-8.08,8.079-9.695,20.193-4.888,29.911l-45.156,45.156c-3.239,3.239-3.239,8.491,0,11.728c1.619,1.619,3.742,2.43,5.864,2.43 c2.122,0,4.245-0.809,5.864-2.43l6.646-6.646l6.647,6.646c1.619,1.62,3.742,2.43,5.864,2.43c2.122,0,4.245-0.809,5.864-2.43 c3.239-3.239,3.239-8.491,0-11.728l-6.647-6.646l26.78-26.78c3.625,1.793,7.576,2.711,11.535,2.711 c6.655,0,13.31-2.533,18.376-7.599c4.908-4.908,7.611-11.434,7.611-18.376C448.554,224.038,445.85,217.512,440.943,212.604z M429.215,237.624c-3.665,3.665-9.628,3.664-13.293,0c-3.665-3.665-3.665-9.628,0-13.293c1.775-1.775,4.136-2.754,6.647-2.754 c2.511,0,4.871,0.978,6.646,2.754c1.775,1.775,2.754,4.135,2.754,6.646S430.99,235.85,429.215,237.624z"></path> </g> </g> <g> <g> <path d="M255.239,245.15c-6.99-5.518-17.344-4.427-23.569,2.483c-5.184,5.753-12.254,8.921-19.904,8.921 s-14.72-3.168-19.904-8.921c-6.226-6.909-16.58-8-23.569-2.483c-16.999,13.415-26.748,33.492-26.748,55.084v26.54 c0,4.58,3.713,8.294,8.294,8.294h123.853c4.58,0,8.294-3.713,8.294-8.294v-26.54C281.987,278.642,272.238,258.564,255.239,245.15z M265.4,318.479H158.134v-18.246c0-16.482,7.449-31.814,20.39-42.048c0.119-0.021,0.593,0.082,1.016,0.552 c8.25,9.153,19.996,14.403,32.226,14.403c12.231,0,23.977-5.25,32.226-14.403c0.424-0.47,0.9-0.571,0.962-0.573l0.009,0.007 c12.987,10.249,20.436,25.58,20.436,42.063V318.479z"></path> </g> </g> </g></svg>
          <span className="text-lg hidden md:flex text-center">Registeration</span>
        </div>
           <div className="flex items-center gap-4 p-3 justify-center md:justify-start hover:bg-gray-800 rounded-lg cursor-pointer transition" onClick={()=>setAdmintable("server")}>
<svg fill="#fff"  height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve" stroke="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="servers_1_" d="M23,31.36H9c-0.199,0-0.36-0.161-0.36-0.36v-3.64H1c-0.199,0-0.36-0.161-0.36-0.36V5 c0-0.199,0.161-0.36,0.36-0.36h7.64V1c0-0.199,0.161-0.36,0.36-0.36h14c0.199,0,0.36,0.161,0.36,0.36v3.64H31 c0.199,0,0.36,0.161,0.36,0.36v22c0,0.199-0.161,0.36-0.36,0.36h-7.64V31C23.36,31.199,23.199,31.36,23,31.36z M9.36,30.64h13.28 V1.36H9.36V30.64z M23.36,26.64h7.279V5.36H23.36v2.28H27v0.72h-3.64v2.28H27v0.72h-3.64v2.28H27v0.72h-3.64V26.64z M1.36,26.64 h7.28V14.36H5v-0.72h3.64v-2.28H5v-0.72h3.64V8.36H5V7.64h3.64V5.36H1.36V26.64z M20,10.36h-8V9.64h8V10.36z M20,7.36h-8V6.64h8 V7.36z M20,4.36h-8V3.64h8V4.36z"></path>

  </g></svg>
          <span className="text-lg hidden md:flex text-center">Server</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;