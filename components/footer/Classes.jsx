import Link from "next/link";

const linkStyles = `focus font-medium text-gray-700 transition-all duration-300 hover:ml-2 hover:text-red`;

function Classes() {
  return (
    <div className="space-y-5 2xl:w-48 2xl:justify-self-center">
      <h4 className="relative text-gray-700 pb-2 text-xl font-semibold capitalize before:absolute before:bottom-0 before:h-1 before:w-16 before:bg-red-600">
        Our classes
      </h4>
      <ul className="space-y-5">
        <li>
          <Link href="/" className={linkStyles}></Link>
        </li>
        <li>
          <Link  href="/" className={linkStyles}>Aerobics classes</Link>
        </li>
        <li>
          <Link href="/"  className={linkStyles}>Dance classes</Link>
        </li>
        <li>
          <Link href="/"  className={linkStyles}>Boxing and Crossfit coach</Link>
        </li>
        <li>
          <Link href="/"  className={linkStyles}>nutritionist and girls session</Link>
        </li>
      </ul>
    </div>
  );
}

export default Classes;
