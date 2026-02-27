import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import NavLinks from "./NavLinks";
import CloseButton from "./CloseButton";
import NavButtom from "./NavButtons";

function MobileNav({ isNavOpen, onToggleNav }) {
  return (
    <div className="grid">
      <div
        className={`fixed inset-0 z-50 flex h-screen w-full justify-center bg-white transition-all duration-300 md:hidden ${
          isNavOpen ? "translate-x-[0%]" : "translate-x-[-100%]"
        }`}
      >
        <NavLinks
          onToggleNav={onToggleNav}
          styles="flex 3xl:hidden gap-6 font-semibold text-lg text-gray-600 flex-col justify-center items-center"
        />

        {/* Added the Join Class Link */}
       

        <CloseButton onClick={onToggleNav} />
  <div className="absolute bottom-0 left-0 w-full flex justify-center items-center p-4">
  <Link
    href="/login"
    className="text-sm font-bold uppercase text-gray-600 outline-none"
  >
    Login
  </Link>
</div>
      </div>
      
    </div>
  );
}

export default MobileNav;