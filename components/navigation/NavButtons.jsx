import Link from "next/link";
import { FaBars, FaPlus } from "react-icons/fa6";

const btnStyles = `hover:text-red-600 text-white transition-colors duration-300 focus`;

function NavButtons({ onToggleNav}) {
  return (
    <div className="flex items-center justify-end gap-7">
     
      <Link href="/" className={btnStyles}>
      </Link>
      <button className={btnStyles}>
      </button>
      <div className="focus hidden rounded-sm border-2 border-solid border-gray-350 p-1.5 lg:block">
        <Link
          href="/login"
          className="mr-2 flex items-center justify-between gap-2 text-sm font-bold uppercase text-white outline-none"
        >
          <FaPlus className="h-8 w-8 rounded-sm bg-red p-2 text-white transition-transform duration-1000 hover:rotate-[360deg]" />
          Join class now
        </Link>
      </div>
       <button className={`md:hidden ${btnStyles}`} onClick={onToggleNav}>
        <FaBars className="h-6 w-6" />
      </button>
    </div>
  );
}

export default NavButtons;
