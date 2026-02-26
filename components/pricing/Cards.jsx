import TertiaryButton from "../buttons/TertiaryButton";
import { FaBriefcase, FaMoneyBillWave } from 'react-icons/fa';
const imgStyles = `grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0`;

const headingStyles = `[clip-path:polygon(0_20%,_100%_0%,_100%_100%,_0%_100%)]
group-hover:[clip-path:polygon(0_0,_100%_20%,_100%_100%,_0%_100%)]
 absolute bottom-[-1px] right-1/2 w-3/4 translate-x-1/2 bg-white py-5 text-lg font-bold text-red-600 transition-all duration-500 group-hover:bg-red-600 group-hover:text-white`;

function Cards() {
  return (
    <div className="relative z-10 grid gap-8 md:grid-cols-2 md:grid-cols-3">
      {/* 01 */}
      <div className="flex flex-col shadow-2xl">
        <div className="group relative overflow-hidden ">
          <img src="/images/pricing/img1.webp" alt="" className={imgStyles} />
          <h4 className={headingStyles}>1 MONTH</h4>
        </div>
        <div className="relative z-[1]  space-y-8 bg-white py-10">
          <h5 className="text-2xl text-gray-800">
           <span className="text-6xl font-bold text-gray-700">2,500</span> ETB
          </h5>
          <ul className="space-y-3 font-medium text-gray-800">
            <li>No Discount</li>
          </ul>
          <hr className="w-[80%] h-1 mx-auto bg-gray-700"></hr>
          <div className="
      inline-flex items-center gap-3 
      px-5 py-3 rounded-full 
      bg-gradient-to-r from-gray-800 to-gray-900 
      text-white font-medium text-lg 
      shadow-lg shadow-black/30 
      border border-gray-700/50 
      hover:scale-105 hover:shadow-xl 
      transition-all duration-300 cursor-pointer
    ">
      {/* Job icon */}
      <FaBriefcase className="text-2xl text-blue-400" />

      <span className="flex items-center gap-2">
        <span className="text-gray-300">if</span>
        <span className="font-bold">Loker</span>
      </span>

      {/* Salary icon + amount */}
      <div className="flex items-center gap-2 bg-green-600/30 px-4 py-1.5 rounded-full border border-green-500/40">
        <FaMoneyBillWave className="text-2xl text-green-400" />
        <span className="font-bold text-green-300">300 ETB</span>
      </div>
    </div>
          <TertiaryButton>Purchase now</TertiaryButton>
        </div>
      </div>

      {/* 02 */}
      <div className="flex flex-col shadow-2xl">
        <div className="group relative overflow-hidden">
          <img src="/images/pricing/img2.webp" alt="" className={imgStyles} />
          <h4 className={headingStyles}>3 MONTHS</h4>
        </div>
        <div className="relative z-[1] space-y-8 bg-white py-10">
          <h5 className="text-2xl text-gray-800">
             <span className="text-6xl font-bold text-gray-600">6,500</span> ETB
          </h5>
          <ul className="space-y-3 font-medium text-gray-800">
            <li>13% Discount</li>
          </ul>
            <hr className="w-[80%] h-1 mx-auto bg-gray-700"></hr>
          <div className="
      inline-flex items-center gap-3 
      px-5 py-3 rounded-full 
      bg-gradient-to-r from-gray-800 to-gray-900 
      text-white font-medium text-lg 
      shadow-lg shadow-black/30 
      border border-gray-700/50 
      hover:scale-105 hover:shadow-xl 
      transition-all duration-300 cursor-pointer
    ">
      {/* Job icon */}
      <FaBriefcase className="text-2xl text-blue-400" />

      <span className="flex items-center gap-2">
        <span className="text-gray-300">if</span>
        <span className="font-bold">Loker</span>
      </span>

      {/* Salary icon + amount */}
      <div className="flex items-center gap-2 bg-green-600/30 px-4 py-1.5 rounded-full border border-green-500/40">
        <FaMoneyBillWave className="text-2xl text-green-400" />
        <span className="font-bold text-green-300">300 ETB</span>
      </div>
    </div>
          <TertiaryButton>Purchase now</TertiaryButton>
        </div>
      </div>

      {/* 03 */}
      <div className="flex flex-col shadow-2xl xl:col-span-2 xl:w-1/2 xl:justify-self-center 2xl:col-span-1 2xl:w-auto">
        <div className="group relative overflow-hidden">
          <img src="/images/pricing/img3.webp" alt="" className={imgStyles} />
          <h4 className={headingStyles}>6 MONTHS</h4>
        </div>
        <div className="relative z-[1] space-y-8 bg-white py-10">
          <h5 className="text-2xl text-gray-800">
             <span className="text-6xl font-bold text-gray-600">11,000</span> ETB
          </h5>
          <ul className="space-y-3 font-medium text-gray-800">
            <li>25% Discount</li>
          </ul>
            <hr className="w-[80%] h-1 mx-auto bg-gray-700"></hr>
          <div className="
      inline-flex items-center gap-3 
      px-5 py-3 rounded-full 
      bg-gradient-to-r from-gray-800 to-gray-900 
      text-white font-medium text-lg 
      shadow-lg shadow-black/30 
      border border-gray-700/50 
      hover:scale-105 hover:shadow-xl 
      transition-all duration-300 cursor-pointer
    ">
      {/* Job icon */}
      <FaBriefcase className="text-2xl text-blue-400" />

      <span className="flex items-center gap-2">
        <span className="text-gray-300">if</span>
        <span className="font-bold">Loker</span>
      </span>

      {/* Salary icon + amount */}
      <div className="flex items-center gap-2 bg-green-600/30 px-4 py-1.5 rounded-full border border-green-500/40">
        <FaMoneyBillWave className="text-2xl text-green-400" />
        <span className="font-bold text-green-300">300 ETB</span>
      </div>
    </div>
          <TertiaryButton>Purchase now</TertiaryButton>
        </div>
      </div>
           {/* 04 */}
      <div className="flex flex-col shadow-2xl xl:col-span-2 xl:w-1/2 xl:justify-self-center 2xl:col-span-1 2xl:w-auto">
        <div className="group relative overflow-hidden">
          <img src="/images/pricing/img3.webp" alt="" className={imgStyles} />
          <h4 className={headingStyles}>1 YEAR</h4>
        </div>
        <div className="relative z-[1] space-y-8 bg-white py-10">
          <h5 className="text-2xl text-gray-800">
             <span className="text-6xl font-bold text-gray-600">20,000</span> ETB
          </h5>
          <ul className="space-y-3 font-medium text-gray-800">
            <li>35% Discount</li>
          </ul>
            <hr className="w-[80%] h-1 mx-auto bg-gray-700"></hr>
          <div className="
      inline-flex items-center gap-3 
      px-5 py-3 rounded-full 
      bg-gradient-to-r from-gray-800 to-gray-900 
      text-white font-medium text-lg 
      shadow-lg shadow-black/30 
      border border-gray-700/50 
      hover:scale-105 hover:shadow-xl 
      transition-all duration-300 cursor-pointer
    ">
      {/* Job icon */}
      <FaBriefcase className="text-2xl text-blue-400" />

      <span className="flex items-center gap-2">
        <span className="text-gray-300">if</span>
        <span className="font-bold">Loker</span>
      </span>

      {/* Salary icon + amount */}
      <div className="flex items-center gap-2 bg-green-600/30 px-4 py-1.5 rounded-full border border-green-500/40">
        <FaMoneyBillWave className="text-2xl text-green-400" />
        <span className="font-bold text-green-300">300 ETB</span>
      </div>
    </div>
          <TertiaryButton>Purchase now</TertiaryButton>
        </div>
      </div>
           {/* 05 */}
            <div className="flex flex-col shadow-2xl xl:col-span-2 xl:w-1/2 xl:justify-self-center 2xl:col-span-1 2xl:w-auto">
        <div className="group relative overflow-hidden">
          <img src="/images/pricing/img3.webp" alt="" className={imgStyles} />
          <h4 className={headingStyles}>FOR FAMILY</h4>
        </div>
        <div className="relative z-[1] space-y-8 bg-white py-10">
          <h5 className="text-2xl text-gray-800">
             <span className="text-6xl font-bold text-gray-600">2,300</span> ETB
          </h5>
          <ul className="space-y-3 font-medium text-gray-800">
            <li>8% Discount</li>
          </ul>
            <hr className="w-[80%] h-1 mx-auto bg-gray-700"></hr>
          <div className="
      inline-flex items-center gap-3 
      px-5 py-3 rounded-full 
      bg-gradient-to-r from-gray-800 to-gray-900 
      text-white font-medium text-lg 
      shadow-lg shadow-black/30 
      border border-gray-700/50 
      hover:scale-105 hover:shadow-xl 
      transition-all duration-300 cursor-pointer
    ">
      {/* Job icon */}
      <FaBriefcase className="text-2xl text-blue-400" />

      <span className="flex items-center gap-2">
        <span className="text-gray-300">if</span>
        <span className="font-bold">Loker</span>
      </span>

      {/* Salary icon + amount */}
      <div className="flex items-center gap-2 bg-green-600/30 px-4 py-1.5 rounded-full border border-green-500/40">
        <FaMoneyBillWave className="text-2xl text-green-400" />
        <span className="font-bold text-green-300">300 ETB</span>
      </div>
    </div>
          <TertiaryButton>Purchase now</TertiaryButton>
        </div>
      </div>
       <div className="flex flex-col shadow-2xl xl:col-span-2 xl:w-1/2 xl:justify-self-center 2xl:col-span-1 2xl:w-auto">
        <div className="group relative overflow-hidden">
          <img src="/images/pricing/img3.webp" alt="" className={imgStyles} />
          <h4 className={headingStyles}>FOR GROUP</h4>
        </div>
        <div className="relative z-[1] space-y-8 bg-white py-10">
          <h5 className="text-2xl text-gray-800">
             <span className="text-6xl font-bold text-gray-600">2,300</span> ETB
          </h5>
          <ul className="space-y-3 font-medium text-gray-800">
            <li>8% Discount</li>
          </ul>
            <hr className="w-[80%] h-1 mx-auto bg-gray-700"></hr>
          <div className="
      inline-flex items-center gap-3 
      px-5 py-3 rounded-full 
      bg-gradient-to-r from-gray-800 to-gray-900 
      text-white font-medium text-lg 
      shadow-lg shadow-black/30 
      border border-gray-700/50 
      hover:scale-105 hover:shadow-xl 
      transition-all duration-300 cursor-pointer
    ">
      {/* Job icon */}
      <FaBriefcase className="text-2xl text-blue-400" />

      <span className="flex items-center gap-2">
        <span className="text-gray-300">if</span>
        <span className="font-bold">Loker</span>
      </span>

      {/* Salary icon + amount */}
      <div className="flex items-center gap-2 bg-green-600/30 px-4 py-1.5 rounded-full border border-green-500/40">
        <FaMoneyBillWave className="text-2xl text-green-400" />
        <span className="font-bold text-green-300">300 ETB</span>
      </div>
    </div>
          <TertiaryButton>Purchase now</TertiaryButton>
        </div>
      </div>
    </div>
  );
}

export default Cards;
