"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/99cb12525e242aadfab6c5c5815d4d264d69be45?width=54"
            alt="Sambandha logo"
            className="w-6 h-6"
          />
          <span className="font-semibold text-gray-900">Sambandha</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link
              href="/products"
              className="text-gray-800 hover:text-blue-500"
            >
              Products
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-gray-800 hover:text-blue-500">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-800 hover:text-blue-500">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/signin" className="text-gray-800 hover:text-blue-500">
              Sign In
            </Link>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-gray-800 hover:text-blue-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col gap-4 p-4">
            <li>
              <Link href="/products" onClick={() => setIsOpen(false)}>
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/signin" onClick={() => setIsOpen(false)}>
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
