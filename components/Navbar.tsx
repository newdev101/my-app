"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // hamburger & close icons

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/");
    router.refresh();
    setIsOpen(false); // close menu on refresh
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          onClick={handleLogoClick}
          className="text-xl font-bold text-teal-400 cursor-pointer"
        >
          ImgCompressor
        </a>

        {/* Desktop Links */}
        <div className="hidden sm:flex space-x-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:text-teal-300 ${
                pathname === href ? "text-teal-400 font-semibold" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="sm:hidden flex flex-col items-center space-y-2 pb-3 bg-gray-800">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)} // close when link clicked
              className={`block py-2 ${
                pathname === href
                  ? "text-teal-400 font-semibold"
                  : "hover:text-teal-300"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
