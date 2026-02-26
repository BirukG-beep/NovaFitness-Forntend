import Link from "next/link";

function Logo({ size = "w-12", type = "white" }) {
  return (
    <Link href="/" className="focus flex text-red-500 uppercase font-bold font-serif  items-center gap-5">
      <img
        src={`${type === "black" ? "/images/logo/logo.png" : "/images/logo/logo.png"}`}
        alt="Corefit logo"
        className={`h-auto ${size} rounded-full`}
      />
      Nova Fitness Center
    </Link>
  );
}

export default Logo;
