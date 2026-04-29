import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

function PrimaryButton({ to = "/", borderColor = "gray", children }) {
  return (
    <Link
      href={to}
      className={` max-w-48 text-gray-500 focus relative inline-flex justify-center items-center gap-1.5 bg-gray-50 px-8 py-4 mx-auto text-sm font-bold uppercase before:absolute before:left-3 before:top-[-12px] before:z-[-1] before:h-full before:w-full before:border before:border-solid before:transition-all before:duration-500 hover:before:translate-x-[-12px] hover:before:translate-y-[12px] ${
        borderColor === "white"
          ? "before:border-gray-100/50"
          : "before:border-gray-400/50"
      }`}
    >
      {children}
      <FaArrowRight className="h-auto w-3.5 text-blue-400" />
    </Link>
  );
}

export default PrimaryButton;
