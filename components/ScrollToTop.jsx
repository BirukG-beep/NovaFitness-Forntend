"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation"; // Use this instead of useLocation

const ScrollToTop = () => {
  const pathname = usePathname(); // Gets the current pathname

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;