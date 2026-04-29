import Link from "next/link";

const linkStyles = "hover:text-blue-300 focus:text-blue-300 focus";
// ring-offset-gray-600

function NavLinks({ onToggleNav, styles }) {
  return (
    <ul className={styles}>
      <li>
        <Link href="/" className={linkStyles} onClick={onToggleNav}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/about" className={linkStyles} onClick={onToggleNav}>
          About
        </Link>
      </li>
      <li>
        <Link href="/contact" className={linkStyles} onClick={onToggleNav}>
          Contact
        </Link>
      </li>
      <li>
        <Link href="/pricing" className={linkStyles} onClick={onToggleNav}>
          Pricing
        </Link>
      </li>
      <li>
        <Link href="/description" className={linkStyles} onClick={onToggleNav}>
          Description
        </Link>
      </li>
    </ul>
  );
}

export default NavLinks;
