import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import NavLinks from "./NavLinks";
import CloseButton from "./CloseButton";
import NavButtom from "./NavButtons";

function MobileNav({ isNavOpen, onToggleNav }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen w-full flex-col bg-white transition-all duration-300 md:hidden ${
        isNavOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Close button at the top right */}
      <div className="absolute right-4 top-4">
        <CloseButton onClick={onToggleNav} />
      </div>

      {/* Scrollable content area */}
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-8">
        {/* NavLinks centered vertically in the available space */}
        <div className="flex flex-1 items-center justify-center">
          <NavLinks
            onToggleNav={onToggleNav}
            styles="flex flex-col gap-6 text-lg font-semibold text-gray-600"
          />
        </div>

        {/* Login link at the bottom */}
        <div className="mt-auto flex justify-center pb-4">
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